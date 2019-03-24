// function isClass(func) {
//     // a hack way to check weather it is class or not
//     return typeof func === 'function'
//         && /^class\s/.test(Function.prototype.toString.call(func));
// }
//
// function isFunc(func) {
//     return typeof func === 'function'
//         && !isClass(func);
// }
//

//
// function isClassName(name) {
//     return name === 'className';
// }

const ComponentLifecycle = {
    CREATE: 0,
    MOUNT: 1,
    UPDATING: 2,
    UPDATED:3,
    MOUNTING: 4,
}

function isEvent(name) {
    return name.substring(0, 2) === 'on' ? true : false;
}

function mapProps(domNode, props){
    for (let propsName in props){
        if (propsName === 'children')
            continue;
        else if (propsName === 'style') {
            let style = props['style']
            Object.keys(style).forEach((styleName) => {
                domNode.style[styleName] = style[styleName];
            });
            continue
        }
        else if (isEvent(propsName)){
            domNode.addEventListener(propsName.substring(2).toLowerCase(), props[propsName]);
        }
        else {
            domNode[propsName] = props[propsName];
        }
    }
}



export {
    isClass,
    isFunc,
    isEvent,
    isClassName,
    mapProps,
    ComponentLifecycle
}
