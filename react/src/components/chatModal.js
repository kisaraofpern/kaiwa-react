import React, { Component } from 'react';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';
import { StickyContainer, Sticky } from 'react-sticky';
import MessagesForm from './messagesForm';

class ChatModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let chatHeaderFragment =
      <Sticky className="chatModalHeader">
        {
          ( {distanceFromTop=0} ) => {
            return (
              <div className="menu chatModal">
                <ul className="menu align-left">
                  <h4>Chat with {this.props.matched_user.username}</h4>
                </ul>
                <ul className="menu align-right">
                  <button onClick={this.props.closeModal}>
                    <FontAwesome
                      className='closeModal'
                      name='window-close'
                      size="2x"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                  </button>
                </ul>
              </div>
            )
          }
        }
      </Sticky>

    let chatFooterFragment =
      <Sticky className="chatModalFooter">
        {
          ( {distanceFromBottom=0} ) => {
            return (
              <MessagesForm
                onChange={this.props.onChange}
                message={this.props.message}
                handleMessageSubmit={this.props.handleMessageSubmit}
              />
            )
          }
        }
      </Sticky>

    return (
        <StickyContainer className="modalSticky">
          {chatHeaderFragment}
          <div className="chatModalMessages">
            <div className="chatModalMessagesContent">
              I am the content for a modal.<br/>
              I am the content for a modal.<br/>
              I am the content for a modal.<br/>
              I am the content for a modal.<br/>
              I am the content for a modal.<br/>
              I am the content for a modal.<br/>
              I am the content for a modal.<br/>
              I am the content for a modal.<br/>
              I am the content for a modal.<br/>
              I am the content for a modal.<br/>
              I am the content for a modal.<br/>
              I am the content for a modal.<br/>
              I am the content for a modal.<br/>
              I am the content for a modal.<br/>
              I am the content for a modal.<br/>
            </div>
          </div>
          {chatFooterFragment}
        </StickyContainer>
    )
  }
}

export default ChatModal
