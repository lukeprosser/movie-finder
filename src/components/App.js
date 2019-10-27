import React, { Component } from 'react';

import Nav from './Nav';
import SearchArea from './SearchArea';
import MovieList from './MovieList';
import Pagination from './Pagination';

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      searchTerm: '',
      totalResults: 0,
      currentPage: 1
    }
    this.apiKey = process.env.REACT_APP_API
  }

  handleSubmit = (e) => {
    e.preventDefault()

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      this.setState({ movies: [...data.results], totalResults: data.total_results })
    })
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  nextPage = (pageNumber) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&page=${pageNumber}`)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      this.setState({ movies: [...data.results], currentPage: pageNumber })
    })
  }

  render() {
    const numPages = Math.floor(this.state.totalResults / 20);

    return (
      <div className="App">
        <Nav />
        <SearchArea 
          handleSubmit={this.handleSubmit} 
          handleChange={this.handleChange} 
        />
        <MovieList movies={this.state.movies} />
        {
          this.state.totalResults > 20 ? 
            <Pagination 
              pages={numPages} 
              nextPage={this.nextPage} 
              currentPage={this.state.currentPage} 
            /> : ''
        }
      </div>
    );
  }
}

export default App;
