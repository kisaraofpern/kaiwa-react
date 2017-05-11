import React, { Component } from 'react';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';
import customStyles from '../constants/chatModalStyle';

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatObject: null,
      isModalOpen: false,
    };
    this.formatDate = this.formatDate.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChatButton = this.handleChatButton.bind(this);
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

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  handleChatButton(chatPartnerId) {
    let payload = JSON.stringify({
      user_id: this.props.user_id,
      chat_partner_id: this.props.matched_user.id,
      chat_starter_id: this.props.user_id
    });

    fetch("/api/v1/chatapi.json", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json",
                 "Accept": "application/json" },
      body: payload
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        chatObject: responseData.chat,
      });
    })
    .then( () =>  {
      this.openModal();
    });
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  render() {
    let created_at = new Date(this.props.matched_user.created_at);
    let full_date = this.formatDate(created_at);

    let userPanelFragment =
      <div className="row">
        <div className="user-panel">
          <div className="columns small-3 user-panel-content">
            <img className="anime-panel-img" src={this.props.matched_user.avatar} />
          </div>

          <div className="columns small-5 user-panel-content user-panel-scroll">
            <p className="animeShowText">
              <strong>Username: </strong>{this.props.matched_user.username}<br />
              <strong>Created At: </strong>{full_date}<br />
            </p>
          </div>
          <div className="columns small-4 user-panel-content tags">
            <FontAwesome
              className='openModal user-panel-heart'
              size='2x'
              name='heart'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
            <h3 className="user-panel-quotient">
              {this.props.match_quotient}
            </h3>
            <button className="user-panel-chat-button" onClick={this.handleChatButton}>
            <FontAwesome
              className='openModal'
              size='2x'
              name='pencil-square-o'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
            </button>
          </div>
        </div>
        <br />
      </div>

    return (
      <div>
        {userPanelFragment}
        <Modal className="chatModal"
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Chat Modal"
        >
          <h4>Chat with {this.props.matched_user.username}</h4>
          <button onClick={this.closeModal}>close</button>
          <div id="">I am a modal</div>
        </Modal>
      </div>
    )
  }
}

export default UserPanel;
