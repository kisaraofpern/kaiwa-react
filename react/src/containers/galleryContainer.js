import React, { Component } from 'react';
import AnimeTile from '../components/animeTile';

class GalleryContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let tiles = this.props.filtered_data.map(animeObject => {
      return(
        < AnimeTile
          key = {animeObject.id}
          id = {animeObject.id}
          animeObject = {animeObject}
        />
      )
    })

    return (
      <div className="gallery-box row small-up-3 medium-up-4 large-up-6">
        {tiles}
      </div>
    );
  }
}

export default GalleryContainer;
