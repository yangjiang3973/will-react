function render(Vnode, container) {  // NOTE: 2 kinds of Vnode
    if (!Vnode) return;
    let { type, props } = Vnode;
    if (!type) return;
    let { children } = props; // children is always an array, even []

    const VnodeType = typeof type;
    let domNode;

    if(VnodeType === 'function') {
        const VnodeTop = renderComponent(Vnode);
        type = VnodeTop.type;
        props = VnodeTop.props;
        children = props.children;
        domNode = document.createElement(type);
        console.log(domNode);
    }
    else if(VnodeType === 'string') {
        domNode = document.createElement(type);
    }

    for(let i=0; i<children.length; i++){
        mountChildren(children[i], domNode);  // NOTE: recusion!
    }
    mapProps(domNode, props);

    // NOTE???
    Vnode._hostNode = domNode; // for tracing back

    container.appendChild(domNode);

    // NOTE????
    return domNode;//注意这里我们加了一行代码，我们要将我们生成的真实节点返回出去，作为其他函数调用的时候的父亲节点
}

function mountChildren(child, domNode) {
    // check children's type, if string, not Vnode, return
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

function renderComponent(VnodeWrapper) {  //
    const ComponentClass = VnodeWrapper.type;
    const { props } = VnodeWrapper;
    const instance = new ComponentClass(props);
    const unwrappedVnode = instance.render();  // generate Vnodes(like a tree) in class's render()

    instance.Vnode = unwrappedVnode; // store Vnode into the instance for recording
    return unwrappedVnode;
}

export default {
    render,
}
