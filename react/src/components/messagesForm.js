import React, { Component } from 'react';
import { broswerHistory, Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

class MessagesForm extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    return(
      <div className="input-group input-group-rounded">
        <form>
          <div className="input-group input-group-rounded">
            <input
              className="message-field"
              id="message-field"
              name="message"
              type="text"
              onChange={this.props.onChange}
              value={this.props.message} placeholder= 'your message'
            />
            <div className="input-group-button">
              <input
                type="submit"
                className="button secondary message"
                value="Enter"
                onClick={this.props.handleMessageSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default MessagesForm;
