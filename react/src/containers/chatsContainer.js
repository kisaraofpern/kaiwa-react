import React, { Component } from 'react';
import BioPanel from '../components/bioPanel';
import ChatShowContainer from './chatShowContainer';


class ChatContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row profile-box">
        <div className="columns small-12 medium-3">
          <BioPanel/>
        </div>
        <div className="columns small-12 medium-9">
          <ChatShowContainer/>
        </div>
      </div>
    );
  }
}

export default ChatContainer;
