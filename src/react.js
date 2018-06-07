(() => {
    function createElement(el, props, ...children) {
        return anElement(el, props, children);
    }

    function anElement(element, props, children) {
        if (isClass(element)) {
            const instance = new element(props);
            return instance.render();
        }
        else if (isFunc(element)) {
            return element(props);
        }
        else {
            return handleDOMNode(element, props, children);
        }
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
        if(typeof(child) === 'object'){
            element.appendChild(child);
        }
        else {
            element.innerHTML += child;
        }
    }

    function appendProp(element, propName, propVal) {
        if (isEvent(propName)) {
            console.log(propName);
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
    }

    window.React = {
        createElement,
        Component
    };
    window.ReactDOM = {
        render: (el, domEl) => {
            domEl.appendChild(el);
        }
    };
})();
