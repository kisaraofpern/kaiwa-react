import React, { Component } from 'react';
import BioPanel from '../components/bioPanel';
import AnimePanelContainer from './animePanelContainer';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let searchBar = document.getElementById("search-field");
    if (searchBar.className.includes("expand-search")) {
      let index = searchBar.className.indexOf("expand-search");
      let firstSlice = searchBar.className.slice(0, index-1);
      let lastSlice = searchBar.className.slice(index+13, -1);
      searchBar.className = firstSlice + lastSlice;
      this.props.emptySearchBar();
      this.fillGallery();
    } else {
      searchBar.className += " expand-search";
    }

    fetch("/api/v1/userapi", { credentials: 'same-origin' })
    .then(response => response.json())
    .then(responseData => {
      let currentUser = responseData;

      let payload = JSON.stringify({
        user_id: currentUser.id
      });

      fetch("/api/v1/matchesapi.json", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json",
                   "Accept": "application/json"},
        body:payload
      });

    });
  }

  render() {
    return (
      <div className="row profile-box">
        <div className="columns small-12 medium-3">
          <BioPanel/>
        </div>
        <div className="columns small-12 medium-9">
          <AnimePanelContainer/>
        </div>
      </div>
    );
  }
}

export default ProfileContainer;
