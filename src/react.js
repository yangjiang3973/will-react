(() => {
    function createElement(el, props, ...children) {
        return anElement(el, props, children);
    }

    function anElement(element, props, children) {
        if (isClass(element)) {
            const instance = new element();
            return instance.render();
        }
        else if (isFunc(element)) {
            console.log('aaa');
            return element(props);
        }
        else {
            console.log('bbb');
            return handleDOM(element, props, children);
        }
    }

    function handleDOM(element, props, children) {
        const anElement = document.createElement(element);

        if ( children !== null ) {
            children.map((c) => {
                if(typeof(c) === 'object'){
                    anElement.appendChild(c);
                }
                else {
                    anElement.innerHTML += c;
                }
            });
        }

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
