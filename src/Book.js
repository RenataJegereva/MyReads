import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  }

  changeShelf = (book, shelf) => {
      BooksAPI.update(book, shelf).then(() => {
          BooksAPI.getAll().then(books => this.setState({ books }))
      })
      console.log('Book.js on change shelf: ' + book.title, shelf);
  }

  render() {
    const { book } = this.props
    const { shelf } = this.props.book.shelf

    // console.log('Book.js book from this.props: ' + book.shelf);

    return (
      <div className="book">
        <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
        <div className="book-shelf-changer">
          <select value={ shelf } onChange={(event) => this.changeShelf(book, event.target.value)}>
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
    )
  }
}

export default Book;