import React, { Component } from 'react';
import NavBar from '../components/navBar';
import GalleryContainer from './galleryContainer';

class MasterContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      current_user: null,
      filtered_data: [],
      query: ''
    };
    this.onSearchQuery = this.onSearchQuery.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
    this.fillGallery = this.fillGallery.bind(this);
    this.current_user = this.current_user.bind(this);
  }

  componentDidMount() {
    this.current_user();
    let currentLocation = this.props.location.pathname;
    if (currentLocation === "/") {
      this.fillGallery();
    }
  }

  current_user() {
    fetch("/api/v1/userapi", { credentials: 'same-origin' })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ current_user: responseData });
    });
  }

  fillGallery() {
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
      this.setState({ filtered_data: responseData });
    });
  }

  onSearchQuery(event) {
    this.setState({ query: event.target.value });
    if (this.state.query !== "") {
      this.getSearchResults();
    } else {
      this.fillGallery();
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
      this.setState({ query: "" });
      this.fillGallery();
    } else {
      searchBar.className += " expand-search";
    }
  }

  render() {
    let childrenWithProps = React.cloneElement(
      this.props.children,
      {
        filtered_data: this.state.filtered_data,
        current_user: this.state.current_user
      });

    return(
      <div>
        <NavBar
          query = {this.state.query}
          onSearchQuery = {this.onSearchQuery}
          handleSearchButton = {this.handleSearchButton}
          current_user = {this.state.current_user}
        />
        <br />
        <br />
        {childrenWithProps}
      </div>
    )
  }
}
export default MasterContainer;
