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

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.state = {
      inputField: ''
    };
  }

  submitHandler(evt) {
    evt.preventDefault();
    // pass the input field value to the event handler passed
    // as a prop by the parent (App)
    this.props.handlerFromParant(this.state.inputField);

    this.setState({
      inputField: ''
    });
  }

  handleChange(event) {
    this.setState({
      inputField: event.target.value
    });
  }

  render() {
    const { book } = this.props
    const { shelf } = this.props.book.shelf

    console.log('Book.js book from this.props: ' + book.shelf);

    return (
      <div className="book">



        <form onSubmit={this.submitHandler}>
          <input type="text"
                 id="theInput"
                 value={this.state.inputField}
                 onChange={this.handleChange} />
          <input type="submit" />
        </form>
        <h5>Visible in child Book.js:<br />{this.state.inputField}</h5>



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