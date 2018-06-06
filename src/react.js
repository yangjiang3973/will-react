(() => {
    function createElement(el, props, ...children) {
        return anElement(el, children);
    }

    function anElement(element, children) {
        if (isClass(element)) {
            const instance = new element();
            return instance.render();
        }
        else if (isFunc(element)) {
            return element();
        }
        else {
            return handleDOM(element, children);
        }
    }

    function handleDOM(element, children) {
        const anElement = document.createElement(element);
        children.map((c) => {
            if(typeof(c) === 'object'){
                anElement.appendChild(c);
            }
            else {
                anElement.innerHTML += c;
            }
        });
        return anElement;
    }

    window.React = {
        createElement
    };
    window.ReactDOM = {
        render: (el, domEl) => {
            domEl.appendChild(el);
        }
    };
})();
