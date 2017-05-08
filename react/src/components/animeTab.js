import React, { Component } from 'react';
import update from 'immutability-helper';

class AnimeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      animeObjectsList: []
    };
  }

  componentWillMount() {
    //determine the currentUser & set Tags
    let thisPage = window.location.href;
    let userid = thisPage.slice(28, thisPage.length);

    fetch(`/api/v1/userapi?userid=${userid}`, { credentials: 'same-origin' })
    .then(response => response.json())
    .then(responseData => {
      let newCurrentUser = responseData.user;
      let currentUserTagData = responseData.tags;
      let animeArray = [];
      switch(this.props.filter) {
        case "allTitles":
          animeArray = responseData.allAnime;
          break;
        case "toWatch":
          animeArray = responseData.toWatch;
          break;
        case "lovedIt":
          animeArray = responseData.lovedIt;
          break;
        case "meh":
          animeArray = responseData.meh;
          break;
        case "hatedIt":
          animeArray = responseData.hatedIt;
          break;
      }
      this.setState({
        currentUser: newCurrentUser,
        animeObjectsList: animeArray
      });
    });
  }

  handleAnimeTag(id, preference) {
    let payload = JSON.stringify({
      user: this.state.currentUser,
      anilist_id: id,
      tag_id: preference
    });

    fetch("/api/v1/animetagsapi.json", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json",
                 "Accept": "application/json" },
      body: payload
    });
  }

  render() {
    let animePanelFragment = this.state.animeObjectsList.map( (anime) => {
      


      return (
          <div className="row">
            <div className="anime-panel">
              <div className="columns small-2 anime-panel-content">
                <img className="anime-panel-img" src={anime.object.image_url_med} />
              </div>

              <div className="columns small-7 anime-panel-content anime-panel-scroll">
                <p className="animeShowText">
                  <strong>Title (Japanese): </strong>{anime.object.title_japanese}<br />
                  <strong>Title (Romaji): </strong>{anime.object.title_romaji}<br />
                  <strong>Title (English): </strong>{anime.object.title_english}<br />
                  <strong>Description: </strong>{anime.object.description || <em>(not available)</em>}<br />
                  <strong>Genres: </strong>{anime.object.genres.join(", ")}<br />
                </p>
              </div>
              <div className="columns small-3 anime-panel-content">
                Tags.
              </div>
            </div>
            <br />
          </div>
        )
      });

    return (
      <div>
        {animePanelFragment}
      </div>
    )
  }
}

export default AnimeTab;
