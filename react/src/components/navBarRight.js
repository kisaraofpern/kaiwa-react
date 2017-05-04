import React, {Component} from 'react';
import { Link } from 'react-router';
import SearchBar from './SearchBar';

class NavBarRight extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return(
      <ul className="menu align-right">
        <li className="sign-in">
          <a href="/users/sign_in">Sign In</a>
        </li>
        <li className="sign-up">
        <a href="/users/sign_up">Sign Up</a>
        </li>
        <li className="searchBar">
          <SearchBar
            query = {this.props.query}
            onChange = {this.props.onSearchQuery}
            handleSearchButton = {this.props.handleSearchButton}
          />
        </li>
      </ul>    )
  }
}

export default NavBarRight;
