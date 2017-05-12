import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import ChatModal from './components/chatModal';

$(function() {
  if (document.getElementById('app')) {
    ReactDOM.render(
      <Root />,
      document.getElementById('app')
    );
  }
});

// $(function() {
//   if (document.getElementById('chatModal')) {
//     ReactDOM.render(
//       <ChatModal />,
//       document.getElementById('app')
//     );
//   }
// });
