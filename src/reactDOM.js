const REACT_CLASS = 'REACT_CLASS';

function render(el, domEl) {
    rootDOMElement = domEl;
    rootReactElement = el;
    let currentDOM;
    if (rootReactElement.type === REACT_CLASS) {
        currentDOM = rootReactElement.render();
    }
    else {
        currentDOM = rootReactElement;
    }
    domEl.appendChild(currentDOM);
}

module.exports = {
    render: render,
}
