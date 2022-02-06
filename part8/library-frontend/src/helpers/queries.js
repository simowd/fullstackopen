import { gql } from "@apollo/client"

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        author{
            name
            id
            born
        }
        id
        genres
    }
`

export const ALL_AUTHORS = gql`
    query{
        allAuthors {
            name
            id
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query Books($genre: String){
        allBooks (genre: $genre){
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
    mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!){
        addBook(
            title: $title
            published: $published
            authorName: $author
            genres: $genres
        ) {
            title
            published
            author{
                name
                id
                born
            }
            genres
        }
    }
`

export const UPDATE_AUTHOR = gql`
    mutation updateAuthor($name: String!, $born: Int!){
        editAuthor(
            name: $name
            setBornTo: $born
        ) {
            name
            id
            born
            bookCount
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password)  {
        value
        }
    }
`

export const GET_USER = gql`
    query {
        me {
            username,
            favoriteGenre
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`