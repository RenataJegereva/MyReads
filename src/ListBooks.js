import React, { Component } from 'react'
import * as BooksAPI from './utils/BooksAPI'
import PropTypes from 'prop-types'
import Book from './Book'

class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    }

    changeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            BooksAPI.getAll().then(books => this.setState({ books }))
        })
        console.log('ON CHANGE SHELF: ' + book, shelf);
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
                            <Book />
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
                                <div className="book">
                                    <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select value="{ shelf }" onChange={(event) => this.changeShelf(book, event.target.value)}>
                                            <option value="none" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                    </div>
                                    <div className="book-title">{ book.title }</div>
                                    <div className="book-authors">{ book.authors ? book.authors.join(', ') : "" }</div>
                                </div>
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
                                <div className="book">
                                    <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select value="{ shelf }" onChange={(event) => this.changeShelf(book, event.target.value)}>
                                            <option value="none" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                    </div>
                                    <div className="book-title">{ book.title }</div>
                                    <div className="book-authors">{ book.authors ? book.authors.join(', ') : "" }</div>
                                </div>
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