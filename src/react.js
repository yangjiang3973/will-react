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
        const preState = this.state; // store old state
        this.nextState = {...this.state, ...partialState}; // store latest state
        this.state = this.nextState; //update state

        const oldVnode = this.Vnode;
        const newVnode = this.render();
        updateComponent(this, oldVnode, newVnode);
    }

    render() {
        // TODO
    }
}

// Note: should move mapProps to utils???
function updateComponent(instance, oldVnode, newVnode){
    if (oldVnode.type === newVnode.type) {
        mapProps(oldVnode._hostNode, newVnode.props); // update node
    }
    else {
        // remove because of differernt types
    }
}

function mapProps(domNode, props){
    for (let propsName in props){
        if (propsName === 'children')
            continue;
        if (propsName === 'style') {
            let style = props['style']
            console.log(domNode);    // domNode is undefined!!!!
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
    return new Vnode(type, props, key, ref);
}

export default {
    createElement,
    Component,
}
