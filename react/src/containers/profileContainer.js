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
        <div className="columns small-12 medium-3">
          <BioPanel/>
        </div>
        <div className="columns small-12 medium-9">
          <AnimePanelContainer/>
        </div>
      </div>
    );
  }
}

export default ProfileContainer;
