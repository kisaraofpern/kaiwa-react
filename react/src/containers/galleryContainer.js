import React, { Component } from 'react';
import AnimePresentationTile from '../components/animePresentationTile';

class GalleryContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let tiles = this.props.filtered_data.map( (tile) => {
      return(
        < AnimePresentationTile
          key = {tile.id}
          id = {tile.id}
          animeObject = {tile}
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
