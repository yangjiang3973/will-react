'use strict';

// import React from './src/react.js'
// import ReactDOM from './src/reactDOM.js'

var React = require('../src/react.js');
var ReactDOM = require('../src/reactDOM.js');

var MyCoolJSXQuoteComponent = function MyCoolJSXQuoteComponent(_ref) {
  var quote = _ref.quote,
      author = _ref.author;

  return React.createElement(
    'div',
    { className: 'quote-container' },
    React.createElement(
      'h4',
      { className: 'quote' },
      '"',
      quote,
      '"'
    ),
    React.createElement(
      'div',
      { className: 'author' },
      '- ',
      author
    )
  );
};

ReactDOM.render(React.createElement(MyCoolJSXQuoteComponent, {
  quote: 'The only source of knowledge is experience.',
  author: 'Albert Einstein' }), document.getElementById('root'));
