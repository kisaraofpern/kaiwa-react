import React, { Component } from 'react';
import AnimePanel from './animePanel';

class AnimeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animeObjects: []
    };
    this.getAnimeObjects = this.getAnimeObjects.bind(this);
  }

  getAnimeObjects() {
    debugger;
    let allAnime = this.props.filtered_anime_tags.map( (animeId) => {
      let proto_uri="/api/v1/anilistapi?";
      proto_uri += `animeId=${animeId}`;

      let uri=encodeURI(proto_uri);
      let animeObject = null;

      fetch(uri, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        return responseData;
      });
    });
    this.setState({animeObjects: allAnime});
  }

  componentDidMount() {
    this.getAnimeObjects();
  }

  render() {
    debugger;
    let animeFragments = this.state.animeObjects.map( (animeObject) => {
      return (
        < AnimePanel
          key = {animeObject.id}
          anim  eId = {animeObject.id}
          animeObject = {animeObject}
          currentUser = {this.props.currentUser}
          handleAnimeTag = {this.props.handleAnimeTag}
        />
      )
    })

    return (
      <div>
        {animeFragments}
      </div>
    )
  }
}

export default AnimeTab;
