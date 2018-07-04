(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"../src/react.js":3,"../src/reactDOM.js":4}],2:[function(require,module,exports){
function isClass(func) {
    // a hack way to check weather it is class or not
    return typeof func === 'function'
        && /^class\s/.test(Function.prototype.toString.call(func));
}

function isFunc(func) {
    return typeof func === 'function'
        && !isClass(func);
}

function isEvent(name) {
    return name.substring(0, 2) === 'on' ? true : false;
}

function isClassName(name) {
    return name === 'className';
}

module.exports = {
    isClass: isClass,
    isFunc: isFunc,
    isEvent: isEvent,
    isClassName: isClassName,
}

},{}],3:[function(require,module,exports){
const { isClass, isFunc, isEvent, isClassName} = require('./react-utils.js');

let rootDOMElement, rootReactElement;
const REACT_CLASS = 'REACT_CLASS';

let classCounter = 0;
const classMap = {};

function createElement(el, props, ...children) {
    return anElement(el, props, children);
}

function anElement(element, props, children) {
    if (isClass(element)) {
        return handleClass(element, props, children);
    }
    else if (isFunc(element)) {
        return element(props);
    }
    else {
        return handleDOMNode(element, props, children);
    }
}

function handleClass(clazz, props, children) {
    classCounter ++;
    if(classMap[classCounter]) {
        return classMap[classCounter];
    }

    const reactElem = new clazz(props);
    reactElem.children = children;
    reactElem.type = REACT_CLASS;
    classMap[classCounter] = reactElem;
    // NOTE: return the obj instead of calling render() here
    return reactElem;
}

function handleDOMNode(element, props, children) {
    const anElement = document.createElement(element);

    if ( children !== null ) {
        children.map((c) => {
            appendChild(anElement, c);
        });
    }
    // add event listeners or attributes from props
    for (let propName in props) {
        appendProp(anElement, propName, props[propName]);
    }
    return anElement;
}

function appendChild(element, child) {
    if (child.type === 'REACT_CLASS') {
        appendChild(element, child.render());
    }
    else if(Array.isArray(child)) {
        child.map(ch => {element.appendChild(ch)});
    }
    else if(typeof(child) === 'object'){
        element.appendChild(child);
    }
    else {
        element.innerHTML += child;
    }
}

function appendProp(element, propName, propVal) {
    if (isEvent(propName)) {
        element.addEventListener(propName.substring(2).toLowerCase(), propVal);
    }
    else if (isClassName(propName)) {
        propName = 'class';
        element.setAttribute(propName, propVal);
    }
    else {
        element.setAttribute(propName, propVal);
    }
}

class Component {
    constructor(props) {
        this.props = props;
    }
    setState (state) {
        this.state = Object.assign({}, this.state, state);
        reRender();
    }
}

function reRender() {
    // delete old dom tree
    while(rootDOMElement.hasChildNodes()) {
        rootDOMElement.removeChild(rootDOMElement.lastChild);
    }
    // render again
    classCounter = 1; // skip the root
    ReactDOM.render(rootReactElement, rootDOMElement);
}

module.exports = {
    createElement: createElement,
    Component: Component,
}

},{"./react-utils.js":2}],4:[function(require,module,exports){
const REACT_CLASS = 'REACT_CLASS';

function render(el, domEl) {
    rootDOMElement = domEl;
    rootReactElement = el;
    let currentDOM;
    if (rootReactElement.type === REACT_CLASS) {
        currentDOM = rootReactElement.render();
    }
    else {
        currentDOM = rootReactElement;
    }
    domEl.appendChild(currentDOM);
}

module.exports = {
    render: render,
}

},{}]},{},[1]);
