import React, {Component} from 'react';
import { Link } from 'react-router';
import SearchBar from './SearchBar';

class NavBarRight extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    let userSessionOptions;

    if (this.props.current_user) {
      let userPath = `/users/${this.props.current_user.id}`;
      userSessionOptions = (
        <ul className="menu align-right">
          <li className="sign-out">
            <form action="/users/sign_out" method="delete">
              <input type="submit" value="Sign Out" />
            </form>
          </li>
          <li className="user-profile">
          <Link to={userPath}>Signed In As <strong>{this.props.current_user.username}</strong></Link>
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
