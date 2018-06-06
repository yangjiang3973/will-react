function isClass(func) {
    // a hack way to check weather it is class or not
    return typeof func === 'function'
        && /^class\s/.test(Function.prototype.toString.call(func));
}

function isFunc(func) {
    return typeof func === 'function'
        && !isClass(func);
}
