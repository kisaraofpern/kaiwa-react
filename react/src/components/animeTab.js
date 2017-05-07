import React, { Component } from 'react';
import AnimePanel from './animePanel';

class AnimeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animelist:[]
    };
  }

  getAnimeObjects() {
    let thisPage = window.location.href;
    let userid = thisPage.slice(28, thisPage.length);

    let uri=`/api/v1/userapi?userid=${userid}`;
    fetch(uri, { credentials: 'same-origin' })
    .then(response => response.json())
    .then(responseData => {
      let newProfiledUser = responseData;

      let proto_uri="/api/v1/animetagsapi?";
      proto_uri += `userid=${userid}`;

      let uri=encodeURI(proto_uri);

      fetch(uri, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        let animeArray = [];
        responseData.forEach( (animeTagObject) => {
          switch(this.props.filter) {
            case "allTitles":
              if (!animeArray.includes(animeTagObject.anilist_id)) {
                animeArray.push(animeTagObject.anilist_id);
              }
              break;
            case "toWatch":
              if (animeTagObject.tag_id === 0) {
                animeArray.push(animeTagObject.anilist_id);
              }
              break;
            case "lovedIt":
              if (animeTagObject.tag_id === 1) {
                animeArray.push(animeTagObject.anilist_id);
              }
              break;
            case "meh":
              if (animeTagObject.tag_id === 2) {
                animeArray.push(animeTagObject.anilist_id);
              }
              break;
            case "hatedIt":
              if (animeTagObject.tag_id === 3) {
                animeArray.push(animeTagObject.anilist_id);
              }
              break;
          }
          this.setState({ animelist: animeArray });
        });

        // let allAnime = animeArray.map( (animeId) => {
        //   let query=JSON.stringify({query: `anime/${animeId}`});
        //   let animeObject = null;
        //
        //   fetch("/api/v1/anilistapi.json", {
        //     method: "POST",
        //     credentials: "same-origin",
        //     headers: {"Content-Type": "application/json", Accept: "application.json"},
        //     body: query
        //   })
        //   .then(response => response.json())
        //   .then(responseData => {
        //     animeObject = responseData[0]
        //   });
        //   return animeObject;
        // });
        // this.setState({animeObjects: allAnime});
      });
    });
  }

  componentDidMount() {
    this.getAnimeObjects();
  }

  render() {
    let animeFragments = this.state.animelist.map( (animeId) => {
      return (
        < AnimePanel
          key = {animeId}
          animeId = {animeId}
        />
      )
    })

    return (
      <div className="row">
        {animeFragments}
      </div>
    )
  }
}

export default AnimeTab;
