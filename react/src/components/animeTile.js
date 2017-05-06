import React, { Component } from 'react';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 120,
    left              : 120,
    right             : 120,
    bottom            : 120,
    borderRadius      : '10px',
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '0',
    left                       : '0',
    right                      : '0',
    bottom                     : '0',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '10px',
    outline                    : 'none',
    padding                    : '20px'

  }
};

class AnimeTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isModalOpen: false,
      toWatch: null,
      lovedIt: null,
      meh: null,
      hatedIt: null
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleToWatch = this.handleToWatch.bind(this);
    this.handleLovedIt = this.handleLovedIt.bind(this);
    this.handleMeh = this.handleMeh.bind(this);
    this.handleHatedIt = this.handleHatedIt.bind(this);
    this.handleAnimeTag = this.handleAnimeTag.bind(this);
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  setUpTile() {
    // fetch information about the current user.
    fetch("/api/v1/userapi", { credentials: 'same-origin' })
    .then(response => response.json())
    .then(responseData => {
      // responseData is the userObject.
      // if the userObject is null, then we should NOT fetch data for tags.
      // if the userObject is NOT null, then we should fetch data for tags.
      let userObject = responseData;
      if (userObject) {
        let proto_uri="/api/v1/animetagsapi?";
        proto_uri += `userid=${userObject.id}&`;
        proto_uri += `animeid=${this.props.animeObject.id}`;
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
            currentUser: userObject,
            toWatch: newToWatch,
            lovedIt: newLovedIt,
            meh: newMeh,
            hatedIt: newHatedIt
           });
        });
      }
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

  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount() {
    this.setUpTile();
  }

  handleToWatch() {
    let id = this.props.animeObject.id;
    let newToWatch = (this.state.toWatch === "confirmed") ? null : "confirmed";
    this.handleAnimeTag(id, 0);
    this.setState({ toWatch: newToWatch });
  }

  handleLovedIt() {
    let id = this.props.animeObject.id;
    let newLovedIt = (this.state.lovedIt === "confirmed") ? null : "confirmed";
    this.handleAnimeTag(id, 1);
    this.setState({ lovedIt: newLovedIt });
  }

  handleMeh() {
    let id = this.props.animeObject.id;
    let newMeh = (this.state.meh === "confirmed") ? null : "confirmed";
    this.handleAnimeTag(id, 2);
    this.setState({ meh: newMeh });
  }

  handleHatedIt() {
    let id = this.props.animeObject.id;
    let newHatedIt = (this.state.hatedIt === "confirmed") ? null : "confirmed";
    this.handleAnimeTag(id, 3);
    this.setState({ hatedIt: newHatedIt });
  }

  render() {
    let id = this.props.animeObject.id;
    let toWatchButton = `anime-tile-menu to-watch ${this.state.toWatch}`;
    let lovedItButton = `anime-tile-menu loved ${this.state.lovedIt}`;
    let mehButton     = `anime-tile-menu meh ${this.state.meh}`;
    let hatedItButton = `anime-tile-menu hated ${this.state.hatedIt}`;
    let toWatchDot = `dot to-watch ${this.state.toWatch}`;
    let lovedItDot = `dot loved ${this.state.lovedIt}`;
    let mehDot = `dot meh ${this.state.meh}`;
    let hatedItDot = `dot hated ${this.state.hatedIt}`;

    let animeTilePictureFragment = (
      <div className="modal-picture-div">
        <button onClick={this.openModal}>
          <img className="modal-button" src={this.props.animeObject.image_url_lge} />
        </button>
      </div>
    )

    let animeTileTagsFragment = <div></div>

    if (this.state.currentUser) {
      animeTileTagsFragment = (
        <ul className="menu anime-tile-menu-dots">
          <li onClick={this.handleToWatch}>
            <FontAwesome
              className={toWatchDot}
              size='2x'
              name='flag'
            />
          </li>
          <li onClick={this.handleLovedIt}>
            <FontAwesome
              className={lovedItDot}
              size='2x'
              name='smile-o'
            />
          </li>
          <li onClick={this.handleMeh}>
            <FontAwesome
              className={mehDot}
              size='2x'
              name='meh-o'
            />
          </li>
          <li onClick={this.handleHatedIt}>
            <FontAwesome
              className={hatedItDot}
              size='2x'
              name='frown-o'
            />
          </li>
        </ul>
      )
    }

    let animeModalTagsFragment = (
      <div>
        <ul className="menu anime-tile-menu-list">
          <li className="anime-tile-menu close">
            <button onClick={this.closeModal}>
            <FontAwesome
              className='closeModal'
              size='5x'
              name='window-close'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
            </button>
          </li>
        </ul>
        <br />
      </div>
    )

    if (this.state.currentUser) {
      animeModalTagsFragment = (
        <div>
          <ul className="menu anime-tile-menu-list">
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
            <li className="anime-tile-menu close">
              <button onClick={this.closeModal}>
              <FontAwesome
                className='closeModal'
                size='5x'
                name='window-close'
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
              />
              </button>
            </li>
          </ul>
          <br />
        </div>
      )
    }

    let animeModalContentsFragment = (
      <div>
        <img src={this.props.animeObject.image_url_banner} />
        <br />
        <p className="animeShowTileText">
          <strong>Title (Japanese): </strong>{this.props.animeObject.title_japanese}<br />
          <strong>Title (Romaji): </strong>{this.props.animeObject.title_romaji}<br />
          <strong>Title (English): </strong>{this.props.animeObject.title_english}<br />
          <strong>Description: </strong>{this.props.animeObject.description || <em>(not available)</em>}<br />
          <strong>Genres: </strong>{this.props.animeObject.genres.join(", ")}<br />
        </p>
      </div>
    )

    return (
      <div className="column column-block">
        {animeTilePictureFragment}
        {animeTileTagsFragment}
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {animeModalTagsFragment}
          {animeModalContentsFragment}
        </Modal>
      </div>
    )
  }
}

export default AnimeTile
