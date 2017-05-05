import React, { Component } from 'react';
import BioPanel from '../components/bioPanel';
import AnimePanelContainer from './animePanelContainer';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row profile-box">
        <div className="columns small-12 medium-2">
          <BioPanel
            currentUser = {this.props.current_user}
          />
        </div>
        <div className="columns small-12 medium-10">
          <AnimePanelContainer
            currentUser = {this.props.current_user}
            handleAnimeTag = {this.props.handleAnimeTag}
          />
        </div>
      </div>
    );
  }
}

export default ProfileContainer;
