import React, { Component } from 'react';
import BioPanel from '../components/bioPanel';
import AnimePanelContainer from './animePanelContainer';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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
