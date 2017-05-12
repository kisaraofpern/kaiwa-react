import React, { Component } from 'react';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';
import customStyles from '../constants/chatModalStyle';
import ChatModal from './chatModal';

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatObject: null,
      isModalOpen: false,
      messages: [],
      message: ""
    };
    this.formatDate = this.formatDate.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChatButton = this.handleChatButton.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
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

  onMessageChange(event) {
    this.setState({ message: event.target.value });
  }

  handleMessageSubmit(event) {
    event.preventDefault();
    let payload = JSON.stringify({
      user_id: this.props.user_id,
      chat_id: this.state.chatObject.id,
      message: this.state.message
    });

    fetch("/api/v1/messagesapi.json", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json",
                 "Accept"      : "application/json"},
      body: payload
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        messages: responseData.messages,
        message: ""
      });
    });

    // this.setState message => ""
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
        messages: responseData.messages
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
          <ChatModal
            user_id={this.props.user_id}
            onMessageChange={this.onMessageChange}
            handleMessageSubmit={this.handleMessageSubmit}
            matched_user={this.props.matched_user}
            closeModal={this.closeModal}
            message={this.state.message}
            messages={this.state.messages}
            chatObject={this.state.chatObject}
          />
        </Modal>
      </div>
    )
  }
}

export default UserPanel;
