import React, { Component } from 'react';

class BioPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
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

  render() {
    let username="", avatar = "", email = "", created_at = "", full_date="";

    if (this.props.currentUser) {
      username = this.props.currentUser.username;
      avatar = "http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-business-bear.png";
      email = this.props.currentUser.email;
      created_at = new Date(this.props.currentUser.created_at);
      full_date = this.formatDate(created_at);
    }


    return (
      <div className="profile-box row">
        <div className="columns small-12 medium-2">
          <div className="columns small-12 medium 6">
            <h3>{username}</h3>
            <img src={avatar} />
          </div>
          <div className="columns small-12 medium 6">
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Created:</strong> {full_date}</p>
          </div>
        </div>
        <div className="columns small-12 medium-10">
        </div>
      </div>
    );
  }
}

export default BioPanel;
