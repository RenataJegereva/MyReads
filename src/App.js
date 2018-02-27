import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'
import * as BooksAPI from './utils/BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState({ books })
      })
  }

  changeShelf = (book, shelf) => {
      BooksAPI.update(book, shelf).then(() => {
          BooksAPI.getAll().then(books => this.setState({ books }))
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path='/' render={() => (
            <ListBooks books={this.state.books} onChangeShelf={this.changeShelf} />
          )}/>
          <Route path='/search' render={({ history }) => (
            <Search booksOnShelves={this.state.books} onUpdateSearch={this.updateSearch} onChangeShelf={this.changeShelf} />
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
