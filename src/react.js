(() => {
    let rootDOMElement, rootReactElement;
    const REACT_CLASS = 'REACT_CLASS';

    let classCounter = 0;
    const classMap = {};

    function createElement(el, props, ...children) {
        return anElement(el, props, children);
    }

    function anElement(element, props, children) {
        if (isClass(element)) {
            return handleClass(element, props, children);
        }
        else if (isFunc(element)) {
            return element(props);
        }
        else {
            return handleDOMNode(element, props, children);
        }
    }

    function handleClass(clazz, props, children) {
        classCounter ++;
        if(classMap[classCounter]) {
            return classMap[classCounter];
        }

        const reactElem = new clazz(props);
        reactElem.children = children;
        reactElem.type = REACT_CLASS;
        classMap[classCounter] = reactElem;
        // NOTE: return the obj instead of calling render() here
        return reactElem;
    }

    function handleDOMNode(element, props, children) {
        const anElement = document.createElement(element);

        if ( children !== null ) {
            children.map((c) => {
                appendChild(anElement, c);
            });
        }
        // add event listeners or attributes from props
        for (let propName in props) {
            appendProp(anElement, propName, props[propName]);
        }
        return anElement;
    }

    function appendChild(element, child) {
        if (child.type === 'REACT_CLASS') {
            console.log('bbbb');
            appendChild(element, child.render());
        }
        else if(Array.isArray(child)) {
            console.log('aaaa');
            child.map(ch => {element.appendChild(ch)});
        }
        else if(typeof(child) === 'object'){
            element.appendChild(child);
        }
        else {
            element.innerHTML += child;
        }
    }

    function appendProp(element, propName, propVal) {
        if (isEvent(propName)) {
            element.addEventListener(propName.substring(2).toLowerCase(), propVal);
        }
        else {
            element.setAttribute(propName, propVal);
        }
    }

    class Component {
        constructor(props) {
            this.props = props;
        }
        setState (state) {
            this.state = Object.assign({}, this.state, state);
            reRender();
        }
    }

    function reRender() {
        // delete old dom tree
        while(rootDOMElement.hasChildNodes()) {
            rootDOMElement.removeChild(rootDOMElement.lastChild);
        }
        // render again
        classCounter = 1; // skip the root
        ReactDOM.render(rootReactElement, rootDOMElement);
    }

    window.React = {
        createElement,
        Component
    };
    window.ReactDOM = {
        render: (el, domEl) => {
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
    };
})();
