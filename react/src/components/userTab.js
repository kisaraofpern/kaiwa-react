import React, { Component } from 'react';
import UserPanel from './UserPanel';

class UserTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentUserMatches: []
    };
  }

  componentDidMount() {
    //determine the currentUser & set Tags
    let thisPage = window.location.href;
    let lastSlash = thisPage.lastIndexOf("/");
    let userid = thisPage.slice(lastSlash+1, thisPage.length);

    fetch(`/api/v1/userapi?userid=${userid}`, { credentials: 'same-origin' })
    .then(response => response.json())
    .then(responseData => {
      let newCurrentUser = responseData.user;
      let newCurrentUserMatches = responseData.matches;
      this.setState({
        currentUser: newCurrentUser,
        currentUserMatches: newCurrentUserMatches
      });
    });
  }

  render() {
    let matchesPanelFragment = this.state.currentUserMatches.map( (match) => {
      return (
        <UserPanel
          key={match.user.id}
          user_id = {this.state.currentUser.id}
          matched_user = {match.user}
          match_quotient = {match.quotient}
        />
      )
    });

    return (
      <div>
        {matchesPanelFragment}
      </div>
    )
  }
}

export default UserTab;
