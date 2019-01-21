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

class Component {  // in Luy, this is called ReactClass in version 0.0.1
    constructor(props) {
        this.props = props;
        this.state = this.state || {}

        this.nextState = null
    }

    setState(partialState, callback) {
        const preState = this.state; // store old state
        this.nextState = {...this.state, ...partialState}; // store latest state
        this.state = this.nextState; //update state

        const oldVnode = this.Vnode.props.children[0];    // should check all , not use index!!
        const newVnode = this.render().props.children[0];
        // console.log(oldVnode);
        // console.log(newVnode);
        updateComponent(this, oldVnode, newVnode);
    }

    render() {
        // TODO
    }
}

// Note: should move mapProps to utils???
// why not call render() again from its parent dom node: render(oldVnode, parentDOMNode)
// not efficient!

// NOTE: update the DOM based on the changes made in the vDOM. This process is also called patching
// we're aiming to update the DOM only where it has changed.

function updateComponent(instance, oldVnode, newVnode){
    if (oldVnode.type === newVnode.type) {
        mapProps(oldVnode._hostNode, newVnode.props); // update node

    }
    else {
        // remove because of differernt types
        // remove completely and render again
        // container.removeChild(), container.appendChild(domNode)
    }
}

function mapProps(domNode, props){
    for (let propsName in props){
        if (propsName === 'children')
            continue;
        else if(isEvent(propsName)){
            domNode.addEventListener(propsName.substring(2).toLowerCase(), props[propsName]);
        }
        else if (propsName === 'style') {
            let style = props['style']
            Object.keys(style).forEach((styleName) => {
                domNode.style[styleName] = style[styleName];
            });
            continue
        }
        domNode[propsName] = props[propsName];
    }
}

// use createElement() create Vnode, extract info from params to Vnode, and build the Vtree
function createElement(type, config, ...children) {
    let props = {},
        key = null,
        ref = null;
    // component wrapper may make children become nested array
    if (children.length === 1 && Array.isArray(children[0])){
        props.children = children[0]
    }
    else {
        props.children = children
    }

    // parse config
    if (config != null) {  // NOTE: undefined == null, return true, so check both undefined and null
        key = config.key === undefined ? null : '' + config.key; // convert key to string or null
        ref = config.ref === undefined ? null : config.ref;
        // then parse config to props
        for (let propName in config) {
            // make sure no key or ref in props
            if (propName === 'key' || propName === 'ref')
                continue;
            if (config.hasOwnProperty(propName)) {
                props[propName] = config[propName]
            }
        }
    }

    // copy default props from component
    if (typeof type === 'function') {
        let defaultProps = type.defaultProps;
        if (defaultProps) {
            for (let prop in defaultProps) {
                if (props[propName] === 'undefined') {
                    props[propName] = defaultProps[propName];
                }
            }
        }
    }

    return new Vnode(type, props, key, ref);
}

export default {
    createElement,
    Component,
}
