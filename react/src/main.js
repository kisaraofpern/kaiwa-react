import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';

$(function() {
  ReactDOM.render(
    <Root />,
    document.getElementById('app')
  );
});
