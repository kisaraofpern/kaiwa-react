import React, { Component } from 'react';
import { broswerHistory, Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

class SearchBar extends Component {
  constructor (props) {
    super(props);
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
