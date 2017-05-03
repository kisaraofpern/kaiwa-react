import React, {Component} from 'react';
import { Link } from 'react-router';
import { StickyContainer, Sticky } from 'react-sticky';
import SearchBar from './SearchBar';

class NavBar extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return(
      <StickyContainer>
        <Sticky>
          {
            ({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight }) => {
              return (
                <div className="row" id="nav-bar">
                  <div className="small-12 large-12 columns" id="nav-bar">
                    <div className="menu">
                      <ul className="menu align-left">
                        <li id="logo">
                          <Link to="/">
                            <span style={{font: "400 4.0em/100% 'Italianno', Helvetica, Sans-serif"}}>
                              Kaiwa
                            </span>
                          </Link>
                        </li>
                      </ul>
                      <ul className="menu align-right">
                        <li className="sign-up">
                        Sign Up
                        </li>
                        <li className="sign-in">
                        Sign In
                        </li>
                        <li>
                          <SearchBar
                            query = {this.props.query}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            }
          }
        </Sticky>
      </StickyContainer>
    )
  }
}

export default NavBar;
