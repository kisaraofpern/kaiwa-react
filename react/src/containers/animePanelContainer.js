import React, { Component } from 'react';
import AnimePanel from '../components/animePanel';

class AnimePanelContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
    this.currentUser = this.currentUser.bind(this);
  }

  componentDidMount() {
    this.currentUser();
  }

  currentUserAnimeTags() {
    fetch("/api/v1/userapi", { credentials: 'same-origin' })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ currentUser: responseData });
    });
  }

  render() {
    return (
      <div className="row profile-box">
        <BioPanel
          currentUser = {this.state.currentUser}
        />
      </div>
    );
  }
}

export default AnimePanelContainer;
