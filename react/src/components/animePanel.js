import React, { Component } from 'react';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';

class AnimePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animeObject: null,
      profiledUser: null,
      currentUser: null,
      profiledToWatch: null,
      profiledLovedIt: null,
      profiledMeh: null,
      profiledHatedIt: null,
      currentToWatch: null,
      currentLovedIt: null,
      currentMeh: null,
      currentHatedIt: null
    };
    this.handleAnimeTag = this.handleAnimeTag.bind(this);
    this.handleToWatch = this.handleToWatch.bind(this);
    this.handleLovedIt = this.handleLovedIt.bind(this);
    this.handleMeh = this.handleMeh.bind(this);
    this.handleHatedIt = this.handleHatedIt.bind(this);
  }

  componentDidMount() {
    console.log("Component Did Mount");
    console.log(this.props.animeId);
    // determine the currentUser & the profiledUser
    let thisPage = window.location.href;
    let userid = thisPage.slice(28, thisPage.length);

    let uri=`/api/v1/userapi?userid=${userid}`;
    fetch(uri, { credentials: 'same-origin' })
    .then(response => response.json())
    .then(responseData => {
      let newProfiledUser = responseData;

      fetch("/api/v1/userapi", { credentials: 'same-origin' })
      .then(response => response.json())
      .then(otherResponseData => {
        let newCurrentUser = otherResponseData;

        // get animeTags for profiledUser
        let uri="/api/v1/animetagsapi?";
        uri += `userid=${newProfiledUser.id}&`;
        uri += `animeid=${this.props.animeId}`;
        fetch(uri, { credentials: 'same-origin' })
        .then(response => response.json())
        .then(responseData => {
          let tagArray = responseData.map( (tagObject) => {
            return tagObject.tag_id;
          });
          let newProfiledToWatch = tagArray.includes(0) ? "confirmed" : null;
          let newProfiledLovedIt = tagArray.includes(1) ? "confirmed" : null;
          let newProfiledMeh     = tagArray.includes(2) ? "confirmed" : null;
          let newProfiledHatedIt = tagArray.includes(3) ? "confirmed" : null;

          let newCurrentToWatch = null;
          let newCurrentLovedIt = null;
          let newCurrentMeh = null;
          let newCurrentHatedIt = null;

          // get animeTags for CurrentUser
          let uri="/api/v1/animetagsapi?";
          uri += `userid=${newCurrentUser.id}&`;
          uri += `animeid=${this.props.animeId}`;
          fetch(uri, { credentials: 'same-origin' })
          .then(response => response.json())
          .then(responseData => {
            let tagArray = responseData.map( (tagObject) => {
              return tagObject.tag_id;
            });
            let newCurrentToWatch = tagArray.includes(0) ? "confirmed" : null;
            let newCurrentLovedIt = tagArray.includes(1) ? "confirmed" : null;
            let newCurrentMeh     = tagArray.includes(2) ? "confirmed" : null;
            let newCurrentHatedIt = tagArray.includes(3) ? "confirmed" : null;

            let animeObject = null;
            let query = JSON.stringify({query: `anime/${this.props.animeId}`});
            fetch("/api/v1/anilistapi.json", {
              method: "POST",
              credentials: "same-origin",
              headers: {"Content-Type": "application/json", Accept: "application.json"},
              body: query
            })
            .then(response => response.json())
            .then(responseData => {
              animeObject = responseData[0];

              this.setState = {
                animeObject: animeObject,
                profiledUser: newProfiledUser,
                currentUser: newCurrentUser,
                profiledToWatch: newProfiledToWatch,
                profiledLovedIt: newProfiledLovedIt,
                profiledMeh: newProfiledMeh,
                profiledHatedIt: newProfiledHatedIt,
                currentToWatch: newCurrentToWatch,
                currentLovedIt: newCurrentLovedIt,
                currentMeh: newCurrentMeh,
                currentHatedIt: newCurrentHatedIt
              };
            });
          });
        });
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

  handleToWatch() {
    let id = this.props.animeId;
    let newToWatch = (this.state.currentToWatch === "confirmed") ? null : "confirmed";
    this.props.handleAnimeTag(id, 0);
    this.setState({ toWatch: newToWatch });
  }

  handleLovedIt() {
    let id = this.props.animeId;
    let newLovedIt = (this.state.currentLovedIt === "confirmed") ? null : "confirmed";
    this.props.handleAnimeTag(id, 1);
    this.setState({ lovedIt: newLovedIt });
  }

  handleMeh() {
    let id = this.props.animeId;
    let newMeh = (this.state.currentMeh === "confirmed") ? null : "confirmed";
    this.props.handleAnimeTag(id, 2);
    this.setState({ meh: newMeh });
  }

  handleHatedIt() {
    let id = this.props.animeId;
    let newHatedIt = (this.state.currentHatedIt === "confirmed") ? null : "confirmed";
    this.props.handleAnimeTag(id, 3);
    this.setState({ hatedIt: newHatedIt });
  }

  render() {
    debugger;
    let animeContentFragment = <div>"Loading..."</div>
    if (this.state.animeObject) {
        animeContentFragment = (
        <div>
          <div className="columns small-2 anime-panel-content">
            <img className="anime-panel-img" src={this.state.animeObject.image_url_sml} />
          </div>

          <div className="columns small-7 anime-panel-content">
            <p className="animeShowText">
              <strong>Title (Japanese): </strong>{this.state.animeObject.title_japanese}<br />
              <strong>Title (Romaji): </strong>{this.state.animeObject.title_romaji}<br />
              <strong>Title (English): </strong>{this.state.animeObject.title_english}<br />
              <strong>Description: </strong>{this.state.animeObject.description || <em>(not available)</em>}<br />
              <strong>Genres: </strong>{this.state.animeObject.genres.join(", ")}<br />
            </p>
          </div>
        </div>
      )
    }

    let profiledToWatch = `anime-tile-menu to-watch ${this.state.profiledToWatch}`;
    let profiledLovedIt = `anime-tile-menu loved ${this.state.profiledLovedIt}`;
    let profiledMeh     = `anime-tile-menu meh ${this.state.profiledMeh}`;
    let profiledHatedIt = `anime-tile-menu hated ${this.state.profiledHatedIt}`;

    let currentToWatch = `anime-tile-menu to-watch ${this.state.currentToWatch}`;
    let currentLovedIt = `anime-tile-menu loved ${this.state.currentLovedIt}`;
    let currentMeh     = `anime-tile-menu meh ${this.state.currentMeh}`;
    let currentHatedIt = `anime-tile-menu hated ${this.state.currentHatedIt}`;

    let profiledTagsFragment = (
      <ul className="menu anime-tile-menu-list">
        <li className={profiledToWatch}>
          <button className="to-watch">
            <FontAwesome
              className='to-watch'
              name='flag'
              size='3x'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </button>
        </li>
        <li className={profiledLovedIt}>
          <button className="loved">
            <FontAwesome
              name='smile-o'
              size='3x'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </button>
        </li>
        <li className={profiledMeh}>
          <button className="meh">
            <FontAwesome
              className='meh'
              name='meh-o'
              size='3x'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </button>
        </li>
        <li className={profiledHatedIt}>
          <button className="hated">
            <FontAwesome
            className='hated'
            size='3x'
            name='frown-o'
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </button>
        </li>
      </ul>
    )

    let currentTagsFragment = (
      <ul className="menu anime-tile-menu-list">
        <li className={currentToWatch}>
          <button className="to-watch" onClick={this.handleToWatch}>
            <FontAwesome
              className='to-watch'
              name='flag'
              size='3x'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            /><br /><br />
            To Watch
          </button>
        </li>
        <li className={currentLovedIt}>
          <button className="loved" onClick={this.handleLovedIt}>
            <FontAwesome
              name='smile-o'
              size='3x'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            /><br /><br />
            Loved It!
          </button>
        </li>
        <li className={currentMeh}>
          <button className="meh" onClick={this.handleMeh}>
            <FontAwesome
              className='meh'
              name='meh-o'
              size='3x'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            /><br /><br />
            Meh.
          </button>
        </li>
        <li className={currentHatedIt}>
          <button className="hated" onClick={this.handleHatedIt}>
            <FontAwesome
            className='hated'
            size='3x'
            name='frown-o'
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            /><br /><br />
            Hated It!
          </button>
        </li>
      </ul>
    )

    let tagsFragment = <div>"Loading..."</div>

    if (this.state.currentUser && this.state.currentUser.id !== this.state.profiledUser.id) {
      tagsFragment = (
      <div className="columns small-3 anime-panel-content">
        {this.state.profiledUser.username}
        {profiledTagsFragment}
        {this.state.currentUser.username}
        {currentTagsFragment}
      </div>
      )
    } else if(this.state.currentUser && this.state.currentUser.id === this.state.profiledUser.id) {
      tagsFragment = (
        <div className="columns small-3 anime-panel-content">
          {this.state.currentUser.username}
          {currentTagsFragment}
        </div>
      )
    }

    return (
      <div className="row">
        {animeContentFragment}
        {tagsFragment}
      </div>
    )
  }
}

export default AnimePanel;
