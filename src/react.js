import { isClass, isFunc, isEvent, isClassName} from './react-utils.js';

let rootDOMElement, rootReactElement;
const REACT_CLASS = 'REACT_CLASS';

let classCounter = 0;
const classMap = {};

class Vnode {
    constructor(type, props, key, ref) {
        this.type = type;
        this.props = props;
        this.key = key;
        this.ref = ref;
    }
}

class Component {
    constructor(props) {
        this.props = props;
        this.state = this.state || {}

        this.nextState = null
    }

    setState(partialState) {
        // TODO
    }

    render() {
        // TODO
    }
}

// use createElement() create Vnode, extract info from params to Vnode
function createElement(type, config, ...children) {
    let props = {},
        key = null,
        ref = null;
    props.children = children;  //children is always array

    // parse config
    if (config != null) {  // NOTE: undefined == null, return true, so check both undefined and null
        key = config.key === undefined ? null : '' + config.key; // convert key to string
        ref = config.ref === undefined ? null : config.ref;
        // then parse config to props
        for (let propName in config) {
            // no key or ref in props
            if (propName === 'key' || propName === 'ref')
                continue;
            if (config.hasOwnProperty(propName)) {
                props[propName] = config[propName]
            }
        }
    }

    return new Vnode(type, props, key, ref);
}













/* NOTE: replace with virtual node*/
// function createElement(el, props, ...children) {
//     return anElement(el, props, children);
// }

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

export default {
    createElement,
    Component,
}
