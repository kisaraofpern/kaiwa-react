import React, {Component} from 'react';
import { Link } from 'react-router';
import SearchBar from './SearchBar';

class NavBarRight extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    fetch("/api/v1/userapi", { credentials: 'same-origin' })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ currentUser: responseData });
    });
  }

  render() {
    let userSessionOptions;

    if (this.state.currentUser) {
      let userPath = `/users/${this.state.currentUser.id}`;
      userSessionOptions = (
        <ul className="menu align-right">
          <li className="sign-out">
            <a href="/sign_out">Sign Out</a>
          </li>
          <li className="user-profile">
          <Link to={userPath}>Signed In As <strong>{this.state.currentUser.username}</strong></Link>
          </li>
          <li className="searchBar">
            <SearchBar
              query = {this.props.query}
              onChange = {this.props.onSearchQuery}
              handleSearchButton = {this.props.handleSearchButton}
            />
          </li>
        </ul>
      )
    } else {
      userSessionOptions = (
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
        </ul>
      )
    }

    return(
      <div>
        {userSessionOptions}
      </div>    )
  }
}

export default NavBarRight;
