// import React from './src/react.js'
// import ReactDOM from './src/reactDOM.js'

let React = require('../src/react.js');
let ReactDOM = require('../src/reactDOM.js')

const MyCoolJSXQuoteComponent = ({quote, author}) => {
  return (
    <div className="quote-container">
      <h4 className="quote">"{quote}"</h4>
      <div className="author">- {author}</div>
    </div>
  );
};


ReactDOM.render(
  <MyCoolJSXQuoteComponent
    quote="The only source of knowledge is experience."
    author="Albert Einstein"/>,
  document.getElementById('root'));
