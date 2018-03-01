import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'

// ListBooks is a functional component and not a class
class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  shelfTitle(shelfName) {
    switch(shelfName) {
      case 'currentlyReading':
        return 'Currently Reading';
      case 'wantToRead':
        return 'Want to read';
      case 'read':
        return 'Read';
      default:
        return 'none';
    }
  }

  render() {
    const {books, onChangeShelf} =  this.props
    const shelfNames = ['currentlyReading', 'wantToRead', 'read']

    return(
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              {shelfNames.map((shelfName, i) => (
                <div className="bookshelf" key={i}>
                    <h2 className="bookshelf-title">
                      { this.shelfTitle(shelfName) }
                    </h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {/* books array received via props from the parent component is filtered to get a new array
                        that contains only the books that have shelf value set to currentlyReading,
                        then map function takes in those books to iterate through them to output each of the books
                        as a list item that displays individual book's data;
                        Book component is passed down via props a function to change shelf;
                        this function in its own turn is also received via props by ListBooks component from parent App.js; */}
                        {books.filter(book => book.shelf === shelfName).map((book) => (
                            <li key={ book.id }>
                                <Book book={ book } onChangeShelf={ onChangeShelf }  />
                            </li>
                        ))}
                    </ol>
                    </div>
                </div>
              ))}
            </div>

            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div>
    )
  }
}

export default ListBooks;