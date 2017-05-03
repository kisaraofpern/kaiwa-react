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

class AnimePresentationTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  render() {
    let animeTileComponent;

    if (this.props.animeObject === null) {
      animeTileComponent = <div>Loading...</div>
    } else {
      animeTileComponent =
      <div>
        <button onClick={this.openModal}>
          <img className="modal-button" src={this.props.animeObject.image_url_lge} />
        </button>

        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <ul className="menu anime-tile-menu-list">
              <li className="anime-tile-menu to-watch">
                <button className="to-watch">
                  <FontAwesome
                    className='to-watch'
                    name='flag'
                    size='3x'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                  /><br /><br />
                  To Watch
                </button>
              </li>
              <li className="anime-tile-menu loved">
                <button className="loved">
                  <FontAwesome
                    name='smile-o'
                    size='3x'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                  /><br /><br />
                  Loved It!
                </button>
              </li>
              <li className="anime-tile-menu meh">
                <button>
                  <FontAwesome
                    className='meh'
                    name='meh-o'
                    size='3x'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                  /><br /><br />
                  Meh.
                </button>
              </li>
              <li className="anime-tile-menu hated">
                <button>
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
              <strong>Description: </strong>{this.props.animeObject.description}<br />
              <strong>Genres: </strong>{this.props.animeObject.genres.join(", ")}<br />
            </p>
          </div>
        </Modal>
      </div>
      }

    return (
      <div className="anime-tile-container">
        {animeTileComponent}
      </div>
    )
  }


}

export default AnimePresentationTile
