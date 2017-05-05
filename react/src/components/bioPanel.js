import React, { Component } from 'react';

class BioPanel extends Component {
  constructor(props) {
    super(props);
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
      <div>
        <h3>{username}</h3>
        <img src={avatar} />
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Created:</strong> {full_date}</p>
      </div>
    );
  }
}

export default BioPanel;
