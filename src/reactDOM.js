// const REACT_CLASS = 'REACT_CLASS';

// TODO: refactor for Component wrapper

function render(Vnode, container) {
    if (!Vnode) return;
    const { type, props } = Vnode;
    if (!type) return;
    const { children } = props; // children is always an array, even []

    const VnodeType = typeof type;
    let domNode;
    // domNode = document.createElement(type);

    if(VnodeType === 'function') {
        domNode = renderComponent(Vnode, container);
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

function renderComponent(Vnode, container) {
    const ComponentClass = Vnode.type;
    const { props } = Vnode.props;
    const instance = new ComponentClass(props);

    const renderedVnode = instance.render();  // generate Vnodes(like a tree) in class's render()
    const domNode = render(renderedVnode, container);

    instance.Vnode = renderedVnode; // store Vnode into the instance for recording
    return domNode;
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
