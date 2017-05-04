import React, { Component } from 'react';
import NavBar from '../components/navBar';
import GalleryContainer from './galleryContainer';

class MasterContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      query: '',
      filtered_data: []
    };
    this.onSearchQuery = this.onSearchQuery.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  componentDidMount() {
    let query = JSON.stringify({ query: "browse/anime" });
    fetch("/api/v1/anilistapi.json", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json",
                 "Accept": "application/json" },
      body: query
    })
    .then(response => response.json())
    .then(responseData => {
      debugger;
      this.setState({ filtered_data: responseData });
    });
  }


  onSearchQuery(event) {
    this.setState({ query: event.target.value });
    if (this.state.query !== "") {
      this.getSearchResults();
    }
  }

  getSearchResults() {
    let query = JSON.stringify({ query: "anime/search/"+this.state.query });
    fetch("/api/v1/anilistapi.json", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json",
                 "Accept": "application/json" },
      body: query
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ filtered_data: responseData });
    });
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
        <GalleryContainer
          filtered_data = {this.state.filtered_data}
        />
      </div>
    )
  }
}
export default MasterContainer;
