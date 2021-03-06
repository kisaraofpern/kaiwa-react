import React, {Component} from 'react';
import { Link } from 'react-router';
import { StickyContainer, Sticky } from 'react-sticky';
import NavBarRight from './navBarRight';

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
                          <a href = "/">
                            <span style={{font: "400 4.0em/100% 'Italianno', Helvetica, Sans-serif"}}>
                              Kaiwa
                            </span>
                          </a>
                        </li>
                      </ul>
                      <NavBarRight
                        query = {this.props.query}
                        onSearchQuery = {this.props.onSearchQuery}
                        handleSearchButton = {this.props.handleSearchButton}
                        current_user = {this.props.current_user}
                      />
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
