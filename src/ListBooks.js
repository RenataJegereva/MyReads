import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    }


    render() {
        const { books } = this.props

        let showingBooks
        showingBooks = books

        return(
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {showingBooks.filter(book => book.shelf === 'currentlyReading').map((book) => (
                            <li key={book.id}>
                                <Book book={ book }  />
                            </li>
                        ))}
                    </ol>
                    </div>
                </div>

                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {showingBooks.filter(book => book.shelf === 'wantToRead').map((book) => (
                            <li key={book.id}>
                                <Book book={ book } />
                            </li>
                        ))}
                    </ol>
                    </div>
                </div>

                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {showingBooks.filter(book => book.shelf === 'read').map((book) => (
                            <li key={book.id}>
                                <Book book={ book } />
                            </li>
                        ))}
                    </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListBooks;