// const REACT_CLASS = 'REACT_CLASS';

// TODO: refactor for Component wrapper

function render(Vnode, container) {  // NOTE: 2 kinds of Vnode
    if (!Vnode) return;
    let { type, props } = Vnode;
    if (!type) return;
    let { children } = props; // children is always an array, even []

    const VnodeType = typeof type;
    let domNode;

    if(VnodeType === 'function') {
        const VnodeRoot = renderComponent(Vnode);
        type = VnodeRoot.type;
        props = VnodeRoot.props;
        children = props.children;
        domNode = document.createElement(type);
    }
    else if(VnodeType === 'string') {
        domNode = document.createElement(type);
    }

    for(let i=0; i<children.length; i++){
        mountChildren(children[i], domNode);  // NOTE: recusion!
    }
    mapProps(domNode, props);

    container.appendChild(domNode);
}

function renderComponent(VnodeWrapper) {  //
    const ComponentClass = VnodeWrapper.type;
    const { props } = VnodeWrapper;
    const instance = new ComponentClass(props);

    const unwrappedVnode = instance.render();  // generate Vnodes(like a tree) in class's render()

    instance.Vnode = unwrappedVnode; // store Vnode into the instance for recording
    return unwrappedVnode;
}

function mountChildren(child, domNode) {
    // check children's type
    if(typeof(child) === 'string') {
        domNode.innerHTML += child;
        return;
    }

    render(child, domNode);
}

function mapProps(domNode, props){
    for (let propsName in props){
        if (propsName === 'children')
            continue;
        if (propsName === 'style') {
            let style = props['style']
            Object.keys(style).forEach((styleName) => {
                domNode.style[styleName] = style[styleName];
            });
            continue
        }
        domNode[propsName] = props[propsName];
    }
}





// function render(el, domEl) {
//     let rootDOMElement = domEl;
//     let rootReactElement = el;
//     let currentDOM;
//     if (rootReactElement.type === REACT_CLASS) {
//         currentDOM = rootReactElement.render();
//     }
//     else {
//         currentDOM = rootReactElement;
//     }
//     domEl.appendChild(currentDOM);
// }

export default {
    render,
}
