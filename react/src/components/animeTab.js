import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class AnimeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      animeObjectsList: []
    };
    this.handleAnimeTag = this.handleAnimeTag.bind(this);
  }

  componentWillMount() {
    //determine the currentUser & set Tags
    let thisPage = window.location.href;
    let lastSlash = thisPage.lastIndexOf("/");
    let userid = thisPage.slice(lastSlash+1, thisPage.length);

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
    })
    .then(() => {
      fetch(`/api/v1/userapi?userid=${this.state.currentUser.id}`, { credentials: 'same-origin' })
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
    });
  }

  render() {
    let animePanelFragment = this.state.animeObjectsList.map( (anime) => {
      let toWatchConfirm = anime.animeTags.includes(0) ? "confirmed" : null;
      let lovedItConfirm = anime.animeTags.includes(1) ? "confirmed" : null;
      let mehConfirm = anime.animeTags.includes(2) ? "confirmed" : null;
      let hatedItConfirm = anime.animeTags.includes(3) ? "confirmed" : null;

      let toWatchDot = `dot to-watch ${toWatchConfirm}`;
      let lovedItDot = `dot loved ${lovedItConfirm}`;
      let mehDot     = `dot meh ${mehConfirm}`;
      let hatedItDot = `dot hated ${hatedItConfirm}`;

      let handleToWatch = () => {
        this.handleAnimeTag(anime.object.id, 0);
      };
      let handleLovedIt = () => {
        this.handleAnimeTag(anime.object.id, 1);
      };
      let handleMeh = () => {
        this.handleAnimeTag(anime.object.id, 2);
      };
      let handleHatedIt = () => {
        this.handleAnimeTag(anime.object.id, 3);
      };

      return (
          <div className="row">
            <div className="anime-panel">
              <div className="columns small-2 anime-panel-content">
                <img className="anime-panel-img" src={anime.object.image_url_med} />
              </div>

              <div className="columns small-9 anime-panel-content anime-panel-scroll">
                <p className="animeShowText">
                  <strong>Title (Japanese): </strong>{anime.object.title_japanese}<br />
                  <strong>Title (Romaji): </strong>{anime.object.title_romaji}<br />
                  <strong>Title (English): </strong>{anime.object.title_english}<br />
                  <strong>Description: </strong>{anime.object.description || <em>(not available)</em>}<br />
                </p>
              </div>
              <div className="columns small-1 anime-panel-content tags">
                <ul className="menu anime-tile-menu-list vertical">
                  <li onClick={handleToWatch}>
                    <FontAwesome
                      className={toWatchDot}
                      name='flag'
                      size='2x'
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                  </li>
                  <li onClick={handleLovedIt}>
                    <FontAwesome
                      className={lovedItDot}
                      name='smile-o'
                      size='2x'
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                  </li>
                  <li onClick={handleMeh}>
                    <FontAwesome
                      className={mehDot}
                      name='meh-o'
                      size='2x'
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                  </li>
                  <li onClick={handleHatedIt}>
                    <FontAwesome
                    className={hatedItDot}
                    size='2x'
                    name='frown-o'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                  </li>
                </ul>
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
