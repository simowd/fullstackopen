import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, GET_USER } from "../helpers/queries";

const Recommendation = (props) => {
    const userQuery = useQuery(GET_USER)
    const booksQuery = useQuery(ALL_BOOKS)

    if (userQuery.loading || booksQuery.loading) {
        return <div>loading...</div>
    }

    if (!props.show) {
        return null
    }

    if (!props.token) {
        return null
    }
    
    booksQuery.refetch({genre: userQuery.data.me.favoriteGenre})
    return (
        <div>
            <h2>recommendations</h2>
            books in your favorite genre {userQuery.data.me.favoriteGenre}
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
                        </th>
                        <th>
                            published
                        </th>
                    </tr>
                    {booksQuery.data.allBooks.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>)
                        }
                </tbody>
            </table>
        </div>
    )
}

export default Recommendation