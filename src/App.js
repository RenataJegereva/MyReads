import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'

class BooksApp extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path='/' render={() => (
            <ListBooks />
          )}/>
          <Route path='/search' render={({ history }) => (
            <Search />
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
