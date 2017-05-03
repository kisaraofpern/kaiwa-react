import React, { Component } from 'react';
import AnimePresentationTile from '../components/animePresentationTile';

class AnimeShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animeObject: null,
      activeTile: null
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    fetch('api/v1/anilistapi/')
    .then(anilistResponse => anilistResponse.json())
    .then(anilistData => {
      this.setState({ animeObject: anilistData });
    });
  }

  onClick(event) {
    event.preventDefault();
    let newActiveTile = null;
    if (this.state.activeTile !== event.target.id) {
      newActiveTile = event.target.id;
    }
    this.setState(
      { activeTile: newActiveTile }
    );
  }

  render() {
    return (
      < AnimePresentationTile
        id = "1"
        animeObject = {this.state.animeObject}
        clickEvent = {this.onClick}
        activeTile = {this.state.activeTile}
      />
    );
  }
}

export default AnimeShowContainer;
