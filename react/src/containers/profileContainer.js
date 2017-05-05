import React, { Component } from 'react';
import BioPanel from '../components/bioPanel';
import AnimePanelContainer from './animePanelContainer';

class ProfileContainer extends Component {
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

  currentUser() {
    fetch("/api/v1/userapi", { credentials: 'same-origin' })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ currentUser: responseData });
    });
  }

  render() {
    debugger;
    return (
      <div className="row profile-box">
        <BioPanel
          currentUser = {this.state.currentUser}
        />
      </div>
    );
  }
}

export default ProfileContainer;
