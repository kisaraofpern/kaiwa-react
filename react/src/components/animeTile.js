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
      isModalOpen: false,
      toWatch: null,
      lovedIt: null,
      meh: null,
      hatedIt: null,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getTags = this.getTags.bind(this);
    this.handleToWatch = this.handleToWatch.bind(this);
    this.handleLovedIt = this.handleLovedIt.bind(this);
    this.handleMeh = this.handleMeh.bind(this);
    this.handleHatedIt = this.handleHatedIt.bind(this);
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  getTags() {
    let proto_uri="/api/v1/animetagsapi?";
    proto_uri += `userid=${this.props.currentUser.id}&`;
    proto_uri += `animeid=${this.props.animeObject.id}`;

    let uri=encodeURI(proto_uri);
    let myHeader = new Headers({
      'Content-Type':'application/json'
    });
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

  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount() {
    this.getTags();
  }

  handleToWatch() {
    let id = this.props.animeObject.id;
    let newToWatch = (this.state.toWatch === "confirmed") ? null : "confirmed";
    this.props.handleAnimeTag(id, 0);
    this.setState({ toWatch: newToWatch });
  }

  handleLovedIt() {
    let id = this.props.animeObject.id;
    let newLovedIt = (this.state.lovedIt === "confirmed") ? null : "confirmed";
    this.props.handleAnimeTag(id, 1);
    this.setState({ lovedIt: newLovedIt });
  }

  handleMeh() {
    let id = this.props.animeObject.id;
    let newMeh = (this.state.meh === "confirmed") ? null : "confirmed";
    this.props.handleAnimeTag(id, 2);
    this.setState({ meh: newMeh });
  }

  handleHatedIt() {
    let id = this.props.animeObject.id;
    let newHatedIt = (this.state.hatedIt === "confirmed") ? null : "confirmed";
    this.props.handleAnimeTag(id, 3);
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

    let animeTileComponent = (
      <div>
        <button onClick={this.openModal}>
          <img className="modal-button" src={this.props.animeObject.image_url_lge} />
        </button>
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

        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
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
        </Modal>
      </div>
    )

    return (
      <div className="column column-block">
        {animeTileComponent}
      </div>
    )
  }


}

export default AnimeTile
