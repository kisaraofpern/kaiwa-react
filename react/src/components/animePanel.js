import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class AnimePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toWatch: null,
      lovedIt: null,
      meh: null,
      hatedIt: null
    };
    this.currentUserAnimeTags = this.currentUserAnimeTags.bind(this);
    this.handleToWatch = this.handleToWatch.bind(this);
    this.handleLovedIt = this.handleLovedIt.bind(this);
    this.handleMeh = this.handleMeh.bind(this);
    this.handleHatedIt = this.handleHatedIt.bind(this);
  }

  currentUserAnimeTags() {
    let proto_uri="/api/v1/animetagsapi?";
    proto_uri += `userid=${this.props.currentUser.id}&`;
    proto_uri += `animeid=${this.props.animeId}`;
    let uri=encodeURI(proto_uri);
    fetch(uri, { credentials: 'same-origin' })
    .then(response => response.json())
    .then(responseData => {
      let tagArray = responseData.map( (tagObject) => {
        return tagObject.tag_id;
      });
      let newToWatch = tagArray.includes(0) ? "confirmed" : null;
      let newLovedIt = tagArray.includes(1) ? "confirmed" : null;
      let newMeh     = tagArray.includes(2) ? "confirmed" : null;
      let newHatedIt = tagArray.includes(3) ? "confirmed" : null;
      this.setState({
        toWatch: newToWatch,
        lovedIt: newLovedIt,
        meh: newMeh,
        hatedIt: newHatedIt
      });
    });
  }

  componentDidMount() {
    this.currentUserAnimeTags();
  }

  handleToWatch() {
    let id = this.props.animeId;
    let newToWatch = (this.state.toWatch === "confirmed") ? null : "confirmed";
    this.props.handleAnimeTag(id, 0);
    this.setState({ toWatch: newToWatch });
  }

  handleLovedIt() {
    let id = this.props.animeId;
    let newLovedIt = (this.state.lovedIt === "confirmed") ? null : "confirmed";
    this.props.handleAnimeTag(id, 1);
    this.setState({ lovedIt: newLovedIt });
  }

  handleMeh() {
    let id = this.props.animeId;
    let newMeh = (this.state.meh === "confirmed") ? null : "confirmed";
    this.props.handleAnimeTag(id, 2);
    this.setState({ meh: newMeh });
  }

  handleHatedIt() {
    let id = this.props.animeId;
    let newHatedIt = (this.state.hatedIt === "confirmed") ? null : "confirmed";
    this.props.handleAnimeTag(id, 3);
    this.setState({ hatedIt: newHatedIt });
  }

  render() {
    debugger;
    let toWatchButton = `anime-tile-menu to-watch ${this.state.toWatch}`;
    let lovedItButton = `anime-tile-menu loved ${this.state.lovedIt}`;
    let mehButton     = `anime-tile-menu meh ${this.state.meh}`;
    let hatedItButton = `anime-tile-menu hated ${this.state.hatedIt}`;

    let animePanelFragment;

    if (!this.props.animeObject) {
      animePanelFragment = <div>Loading...</div>
    } else {
      animePanelFragment = (
        <div className="row">
          <div className="columns small-2">
            <img src={this.props.animeObject.image_url_med} />
          </div>
          <div className="columns small-8">
            <p className="animeShowTileText">
              <strong>Title (Japanese): </strong>
              {this.props.animeObject.title_japanese}<br />
              <strong>Title (Romaji): </strong>
              {this.props.animeObject.title_romaji}<br />
              <strong>Title (English): </strong>
              {this.props.animeObject.title_english}<br />
              <strong>Description: </strong>
              {this.props.animeObject.description}
              <strong>Genres: </strong>
              {this.props.animeObject.genres.join(", ")}<br />
            </p>
          </div>
          <div className="columns small-2">
            <ul className="menu vertical anime-tile-menu-list">
              <li className={toWatchButton}>
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
              <li className={lovedItButton}>
                <button className="loved" onClick={this.handleLovedIt}>
                  <FontAwesome
                    name='smile-o'
                    size='3x'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                  /><br /><br />
                  Loved It!
                </button>
              </li>
              <li className={mehButton}>
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
              <li className={hatedItButton}>
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
          </div>
        </div>
      )
    }

    return (
      <div>
        {animePanelFragment}
      </div>
    )
  }
}

export default AnimePanel;
