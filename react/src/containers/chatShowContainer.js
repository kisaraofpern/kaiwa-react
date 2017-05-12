import React, { Component } from 'react';

class ChatShowContainer extends Component {
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

export default ChatShowContainer;
