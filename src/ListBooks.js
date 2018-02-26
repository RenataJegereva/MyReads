import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './utils/BooksAPI'

class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    }

    changeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            BooksAPI.getAll().then(books => this.setState({ books }))
        })
        // console.log('listbooks.js on change shelf: ' + book.title, shelf);
    }

    state = {
        books: this.props.books
    }

    render() {
        const { books } = this.props
        // console.log('changeshelf in ListBooks is ' + this.changeShelf);

        let showingBooks
        showingBooks = books

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
                            {showingBooks.filter(book => book.shelf === 'currentlyReading').map((book) => (
                                <li key={book.id}>
                                    <Book book={ book } onChangeShelf={ this.changeShelf }  />
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
                                    <Book book={ book }  onChangeShelf={ this.changeShelf }  />
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
                                    <Book book={ book }  onChangeShelf={ this.changeShelf }  />
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
}

export default ListBooks;