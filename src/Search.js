import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'
import Book from './Book'

class Search extends Component {
  static propTypes = {
    booksOnShelves: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    books: [],
    query:'',
    message: ''
  }

  // event listener invokes this function on every onChange event
  // when a non-empty query string is received, promise returns results
  // these results are merged in the new state, which triggers component's internal state update and so rerenders DOM
  updateSearch = (query) => {
    this.setState({query: query})

    if (query.trim() !== ''){
      BooksAPI.search(query).then((results) => {
        if(results.length > 0){
          this.setState({books: results, message: ''})
        } else {
          this.setState({books: [], message: 'Sorry, your search returns no results'})
        }
      })
    } else {
      this.setState({books: [], message: ''})
    }
  }

  // function sets current shelf value as active on the dropdown if the book has one already
  // it matches books from the shelves (received via props) to the books from the search results
  // a shelf name is returned for the matching books, otherwise the shelf is set to 'none'
 getExistingShelf = (book) => {
   const searchBookID = book.id
   const shelf = this.props.booksOnShelves.find(book => book.id === searchBookID )
   return shelf !== undefined ? shelf.shelf : 'none'
  }

  render() {
    const {books, query, message} = this.state
    const {onChangeShelf} =  this.props

    return(
      <div className="search-books">

        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
          {/* input has event listener to take in the value of input and passed it to updateSearch function above */}
          <input type="text"
            value={ query }
            placeholder="Search by title or author"
            onChange={
              (event) => (this.updateSearch(event.target.value))
            }/>
          </div>
        </div>

        {/* a bit of code reused from Book component */}
        <div className="search-books-results">
          <h2>{message}</h2>
          <ol className="books-grid">
            {books.map((book) => (
              <li key={ book.id }>
                <Book book={ book } getExistingShelf={ this.getExistingShelf } onChangeShelf={ onChangeShelf }  />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search