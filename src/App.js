import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'
import * as BooksAPI from './utils/BooksAPI'

class BooksApp extends React.Component {
  //App.js owns the state for books
  state = {
    books: []
  }

  // get array of books from API;
  // when the promise response is fulfilled, store the books in the App component's state
  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState({ books })
      })
  }

  // function to change book shelf - envoked from Book and Search components
  // first API is updated with the change
  // after that, when the promise is fulfilled, a new request is made from API
  // the component's state is set to the new udated data from API, which forses auto-rerender of DOM to reflect updates
  changeShelf = (book, shelf) => {
      BooksAPI.update(book, shelf).then(() => {
          BooksAPI.getAll().then(books => this.setState({ books }))
      })
  }

  render() {
    return (
      // bookmarkable route paths for application navigation
      <BrowserRouter>
        <div className="app">
          <Route exact path='/' render={() => (
            // ListBooks component get the following from parent App.js passed down to it as props:
            // the books array from App.js state
            // the function to change shelf
            <ListBooks
              books={ this.state.books }
              onChangeShelf={ this.changeShelf } />
          )}/>
          <Route path='/search' render={() => (
            // Search component gets the following from parent App.js passed down to it as props:
            // the books array from App.js state
            // the function to change shelf
            <Search
              booksOnShelves={ this.state.books }
              onChangeShelf={ this.changeShelf } />
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp