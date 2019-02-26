import { isClass, isFunc, isEvent, isClassName} from './react-utils.js';
import ReactDOM from './reactDOM.js'


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

    checkStatus() {
        console.log(this);
    }

    setState(partialState, callback) {
        const preState = this.state; // store old state
        this.nextState = {...this.state, ...partialState}; // store latest state
        this.state = this.nextState; //update state
        this.updateComponent();
    }

    updateComponent() {
        // console.log(this.Vnode);
        const oldVnode = this.Vnode;
        const newVnode = this.render();   // why new node's C class node has an instance
        // console.log(newVnode);
        newVnode._hostNode = oldVnode._hostNode;
        this.Vnode = newVnode;
         this.nextState = null
        update(oldVnode, newVnode);
    }

    render() {
        // TODO
    }
}

// NOTE: update the DOM based on the changes made in the vDOM. This process is also called patching
// we're aiming to update the DOM only where it has changed.
function update(oldVnode, newVnode) {
    if (oldVnode.type === newVnode.type) {
        if (typeof oldVnode.type === 'string') {
            updateDOMElement(oldVnode, newVnode);
        }
        else if (typeof oldVnode.type === 'function') {
            updateComponentElement(oldVnode, newVnode);
        }
    }
    else {
        console.log('diff types, remove and mount a new one!');
        // 2 cases, new type is native dom or Component
        if (typeof newVnode.type === 'string') {
            // TODO
            const parentElem = oldVnode._hostNode.parentNode;
            ReactDOM.render(newVnode, parentElem, true);
        }
        else if (typeof newVnode.type === 'function') {

        }
        else {
            console.error('wrong type of Vnode');
        }
    }
}

function updateText(oldText, newText, parentDOM) {
    parentDOM.innerHTML = newText;
}

function updateDOMElement(oldVnode, newVnode) {
    let domNode = oldVnode._hostNode;

    if (newVnode.props.children.length > 0) {
        updateChildren(oldVnode.props.children, newVnode.props.children, domNode);
    }
    // patching the dom elem here
    if (newVnode.props['style']) {
        let style = newVnode.props['style'];
        Object.keys(style).forEach((styleName) => {
            domNode.style[styleName] = style[styleName];
        });
    }
    newVnode._hostNode = domNode;
}

function updateComponentElement(oldVnode, newVnode) {
    const oldInstance = oldVnode._instance;
    const newProps = newVnode.props;
    // right now, these two nodes are wrapped node
    oldInstance.props = newProps;
    const newTopNode = oldInstance.render();  // render with now props

    newVnode._instance = oldInstance;   // Note: !!!problem here!  make a deep copy?
    newTopNode._hostNode = oldInstance.Vnode._hostNode;
    newVnode._instance.Vnode = newTopNode;

    // shouldComponentUpdate() need to check first
    update(oldInstance.Vnode, newTopNode, oldInstance.parentNode);
}

function updateChildren(oldVnodeChildren, newVnodeChildren, parentNode) {
    // TODO: assume old and new children has the same childrenLength
    const l = oldVnodeChildren.length;
    for (let i=0; i<l; i++) {
        // children may be not Vnode, text actually
        if (typeof newVnodeChildren[i] === 'string') {
            updateText(oldVnodeChildren[i], newVnodeChildren[i], parentNode);
        }
        else
            update(oldVnodeChildren[i], newVnodeChildren[i]);
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
