import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

class SearchBar extends Component {
  constructor (props) {
    super(props);

    this.handleEnterInput = this.handleEnterInput.bind(this);
  }

  handleEnterInput(event) {
    let keynum;

    if(event.keyCode === 0) {
      keynum = event.which;
    } else {
      keynum = event.keyCode;
    }

    let currentLocation = window.location.pathname;
    if (currentLocation === "/") {
      return false;
    } else {
      browserHistory.push('/');
    }
  }

  render() {
    return(
      <div className="input-group input-group-rounded">
        <form>
          <div className="input-group input-group-rounded">
            <input
              className="search-field"
              id="search-field"
              name="search"
              type="text"
              onKeyPress={this.handleEnterInput}
              onChange={this.props.onChange}
              value={this.props.query} placeholder= 'title'
            />
            <div className="input-group-button">
              <input
                type="submit"
                className="button secondary search"
                value="Search"
                onClick={this.props.handleSearchButton}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
