import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import MasterContainer from './containers/masterContainer';

const Root = () => {
  return(
      <Router history={browserHistory}>
        <Route path="/" component={MasterContainer}>
        </Route>
      </Router>
    )
  }
  
export default Root;
