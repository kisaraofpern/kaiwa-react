import React, { Component } from 'react';

class BioPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      profiledUser: null
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

    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  componentDidMount() {
    let thisPage = window.location.href;
    let lastSlash = thisPage.lastIndexOf("/");
    let userid = thisPage.slice(lastSlash+1, thisPage.length);

    let uri=`/api/v1/userapi?userid=${userid}`;
    fetch(uri, { credentials: 'same-origin' })
    .then(response => response.json())
    .then(responseData => {
      let newProfiledUser = responseData.user;

      fetch("/api/v1/userapi", { credentials: 'same-origin' })
      .then(response => response.json())
      .then(otherResponseData => {
        this.setState({
          currentUser: otherResponseData.user,
          profiledUser: newProfiledUser
        });
      });
    });
  }

  render() {
    let username="", avatar = "", email = "", created_at = "", full_date="";
    if (this.state.profiledUser) {
      username = this.state.profiledUser.username;
      avatar = this.state.profiledUser.avatar.medium.url || "http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-business-bear.png";
      email = this.state.profiledUser.email;
      created_at = new Date(this.state.profiledUser.created_at);
      full_date = this.formatDate(created_at);
    }

    return (
      <div>
        <h3>{username}</h3>
        <img src={avatar} />
        <p><strong>Created:</strong> {full_date}</p>
        <strong><a className="edit-profile" href="/users/edit">Edit Profile</a></strong>
      </div>
    );
  }
}

export default BioPanel;
