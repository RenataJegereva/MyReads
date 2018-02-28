import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'

class Search extends Component {
  static propTypes = {
    booksOnShelves: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    books: [],
    query:''
  }

  updateSearch = (query) => {
    this.setState({query: query})
    if (query ==='') {
        this.setState({results: []})
        return
    }
    BooksAPI.search(query).then((results) => {
        if(this.state.query === query && results ) {
            this.setState({books: results})
        }
    })
  }

 getExistingShelf = (booksOnShelves, book) => {
    // console.log( books);
    booksOnShelves.map((bookOnShelf) => {
      return bookOnShelf.id === book.id ? bookOnShelf.shelf : 'none'
    });
  }


  render() {
    const {books, query} = this.state
    const {booksOnShelves, onChangeShelf} =  this.props

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
          <input type="text" value={query} placeholder="Search by title or author" onChange={(event) => (this.updateSearch(event.target.value))}  />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                  <div className="book-shelf-changer">
                    <select

                      value={this.getExistingShelf(booksOnShelves, book)}
                      onChange={(event) => onChangeShelf(book, event.target.value)} >
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                  </div>
                  <div className="book-title">{book.title }</div>
                  <div className="book-authors">{book.authors ? book.authors.join(', ') : "" }</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search