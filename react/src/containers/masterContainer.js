import React, { Component } from 'react';
import AnimeShowContainer from './animeShowContainer';
import NavBar from '../components/navBar'

class MasterContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      query: null
    };
  }

  render() {
    return(
      <NavBar
        query = {this.state.query}
      />
    )
  }
}
export default MasterContainer;
