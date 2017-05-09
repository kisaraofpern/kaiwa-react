import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class UserTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentUserMatches: []
    };
    this.formatDate = this.formatDate.bind(this);
  }

  formatDate(date) {
    let monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
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
      let created_at = new Date(match.created_at);
      let full_date = this.formatDate(created_at);

      return (
          <div className="row">
            <div className="user-panel">
              <div className="columns small-3 user-panel-content">
                <img className="anime-panel-img" src={match.user.avatar} />
              </div>

              <div className="columns small-6 user-panel-content user-panel-scroll">
                <p className="animeShowText">
                  <strong>Username: </strong>{match.user.username}<br />
                  <strong>Created At: </strong>{full_date}<br />
                </p>
              </div>
              <div className="columns small-3 user-panel-content tags">
                <h3>{match.quotient}</h3>
              </div>
            </div>
            <br />
          </div>
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
