const { ApolloServer, gql } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground, UserInputError } = require('apollo-server-core')
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book');
const User = require('./models/User');
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'SUPERSECRETHASH'

//Mongoose initilization

const MONGODB_URI = 'mongodb+srv://user:user@cluster0.31ala.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI).then(() => {
  console.log('connected to database')
}).catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks (author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
`

const resolvers = {
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
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author')
      return books.reduce((sum, book) => book.author.name === root.name ? sum + 1 : sum, 0)
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
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
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
      const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})
      try{
        await user.save()
      }
      catch(error){ 
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
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

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
