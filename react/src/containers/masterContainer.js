import React, { Component } from 'react';
import AnimeShowContainer from './animeShowContainer';
import NavBar from '../components/navBar';

class MasterContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      query: ''
    };
    this.onSearchQuery = this.onSearchQuery.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
  }

  onSearchQuery(event) {
    this.setState( { query: event.target.value });
  }

  handleSearchButton(event) {
    event.preventDefault();
    let searchBar = document.getElementById("search-field");
    if (searchBar.className.includes("expand-search")) {
      let index = searchBar.className.indexOf("expand-search");
      let firstSlice = searchBar.className.slice(0, index-1);
      let lastSlice = searchBar.className.slice(index+13, -1);
      searchBar.className = firstSlice + lastSlice;
    } else {
      searchBar.className += " expand-search";
    }
  }

  render() {
    return(
      <div>
        <NavBar
          query = {this.state.query}
          onSearchQuery = {this.onSearchQuery}
          handleSearchButton = {this.handleSearchButton}
        />
        <br />
        <br />
        <AnimeShowContainer />
      </div>
    )
  }
}
export default MasterContainer;
