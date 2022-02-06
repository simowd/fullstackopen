const express = require('express')
const http = require('http')
const { ApolloServer, gql } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground, UserInputError } = require('apollo-server-core')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()
const JWT_SECRET = 'SUPERSECRETHASH'

//Mongoose initilization

const MONGODB_URI = 'mongodb+srv://user:user@cluster0.31ala.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI).then(() => {
  console.log('connected to database')
}).catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})

mongoose.set('debug', true);

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: String
    bookCount: Int!
  }

  type Book {
    title: String!
    published: String!
    author: Author
    id: ID!
    genres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      authorName: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks (author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
`

const resolvers = {
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
  Query: {
    bookCount: async () => await Book.find({}).length(),
    authorCount: async () => await Author.find({}).length(),
    allBooks: async (root, args) => {
      let filteredBooks = await Book.find({}).populate('author')

      if (args.author !== undefined) {
        filteredBooks = filteredBooks.filter((book) => {
          if (book.author.name === args.author)
            return book
        })
      }

      if (args.genre !== undefined) {
        filteredBooks = filteredBooks.filter((book) => {
          for (const genre of book.genres) {
            if (genre === args.genre)
              return book
          }
        })
      }
      return filteredBooks
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root) => {
      return root.books.length
    }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let authorExists = await Author.findOne({ name: args.authorName })
      if (authorExists === null) {
        const newAuthor = new Author({
          name: args.authorName,
          born: null
        })
        try {
          authorExists = await newAuthor.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const newBook = new Book({
        title: args.title,
        published: args.published,
        author: authorExists,
        genres: args.genres
      })

      try {
        await newBook.save()
        await Author.findByIdAndUpdate(authorExists._id, {books: authorExists.books.concat(newBook)})
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }
      console.log(author)
      const updatedAuthor = await Author.findByIdAndUpdate(author._id, { born: args.setBornTo })
      return updatedAuthor
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      try {
        await user.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

async function startApolloServer(typeDefs, resolvers) {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id).populate('friends')
        return { currentUser }
      }
    }
  })

  await server.start()
  server.applyMiddleware({
    app,
    path: '/'
  })

  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe
  }, {
    server: httpServer,
    path: server.graphqlPath
  })



  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)

}

startApolloServer(typeDefs, resolvers)