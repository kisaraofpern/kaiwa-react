import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import MasterContainer from './containers/masterContainer';
import GalleryContainer from './containers/galleryContainer';

const Root = () => {
  return(
      <Router history={browserHistory}>
        <Route path="/" component={MasterContainer}>
          <IndexRoute component={GalleryContainer} />
        </Route>
      </Router>
    )
  }

export default Root;
