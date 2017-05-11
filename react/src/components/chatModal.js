import React, { Component } from 'react';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';

class ChatModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>I am the content for a modal.</p>
      </div>
    )
  }
}

export default ChatModal
