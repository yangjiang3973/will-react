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

export {
    isClass,
    isFunc,
    isEvent,
    isClassName,
}
