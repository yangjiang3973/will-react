const REACT_CLASS = 'REACT_CLASS';

function render(el, domEl) {
    let rootDOMElement = domEl;
    let rootReactElement = el;
    let currentDOM;
    if (rootReactElement.type === REACT_CLASS) {
        currentDOM = rootReactElement.render();
    }
    else {
        currentDOM = rootReactElement;
    }
    domEl.appendChild(currentDOM);
}

export default {
    render,
}
