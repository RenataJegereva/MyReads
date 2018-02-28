import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

// ListBooks is a functional component and not a class
function ListBooks(props) {
    return(
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {/* books array received via props from the parent component is filtered to get a new array
                        that contains only the books that have shelf value set to currentlyReading,
                        then map function takes in those books to iterate through them to output each of the books
                        as a list item that displays individual book's data;
                        Book component is passed down via props a function to change shelf;
                        this function in its own turn is also received via props by ListBooks component from parent App.js; */}
                        {props.books.filter(book => book.shelf === 'currentlyReading').map((book) => (
                            <li key={ book.id }>
                                <Book book={ book } onChangeShelf={ props.onChangeShelf }  />
                            </li>
                        ))}
                    </ol>
                    </div>
                </div>

                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {props.books.filter(book => book.shelf === 'wantToRead').map((book) => (
                            <li key={ book.id }>
                                <Book book={ book } onChangeShelf={ props.onChangeShelf } />
                            </li>
                        ))}
                    </ol>
                    </div>
                </div>

                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {props.books.filter(book => book.shelf === 'read').map((book) => (
                            <li key={ book.id }>
                                <Book book={ book } onChangeShelf={ props.onChangeShelf } />
                            </li>
                        ))}
                    </ol>
                    </div>
                </div>
            </div>

            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div>
    )
}

export default ListBooks;