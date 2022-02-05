import { gql } from "@apollo/client"

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
    query {
        allBooks {
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
    }
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