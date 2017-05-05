import React, { Component } from 'react';
import AnimeTile from '../components/animeTile';

class GalleryContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let tiles = this.props.filtered_data.map( (tile) => {
      return(
        < AnimeTile
          key = {tile.id}
          id = {tile.id}
          animeObject = {tile}
          handleAnimeTag = {this.props.handleAnimeTag}
          currentUser = {this.props.current_user}
        />
      )
    })

    return (
      <div className="gallery-box row small-up-3 medium-up-4 large-up-5">
        {tiles}
      </div>
    );
  }
}

export default GalleryContainer;
