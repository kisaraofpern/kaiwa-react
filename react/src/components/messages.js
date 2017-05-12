import React, { Component } from 'react';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages
    };
    this.handleChatReceipt = this.handleChatReceipt.bind(this);
  }

  componentDidMount() {
    let chat_id = this.props.chatObject.id;
    let viewer = document.getElementById('viewer');
    viewer.scrollIntoView({behavior:"smooth"});
    App.room = App.cable.subscriptions.create ({channel: "MessagesChannel", id: chat_id}, {
      received: function(data) {
        this.handleChatReceipt(data);
      },
      handleChatReceipt: this.handleChatReceipt
    });
  }

  handleChatReceipt(chat) {
    let foo = this.state.messages.concat(chat);
    this.setState({ messages: foo });
    let viewer = document.getElementById('viewer');
    viewer.scrollIntoView({behavior:"smooth"});
  }

  render() {
    let messagesFragment = this.state.messages.map( (message) => {
      let rawMessageTime = new Date(message.created_at);
      let fullMessageTime = rawMessageTime.toLocaleString();
      let halfMessageTime = rawMessageTime.toLocaleTimeString();

      let todaysDate = new Date();
      let messageTime =
        rawMessageTime.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0) ?
        halfMessageTime : fullMessageTime;

      let displayName = message.user_id === this.props.user_id ?
        "You" : `${this.props.matched_username}`;

      let fragment = (
        <div>
          <strong>{displayName}</strong> (@{messageTime}): {message.message}<br/>
        </div>
      )

      return fragment;
    });
  return(
      <div>
        {messagesFragment}
        <div id="viewer"></div>
      </div>
    )
  }
}

export default Messages;
