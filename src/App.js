import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      // console.log(books);
    })
  }


  render() {
    let books = this.state.books

    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path='/' render={() => (
            <ListBooks books={ books }/>
          )}/>
          <Route path='/search' render={({ history }) => (
            <Search onAddBook />
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
