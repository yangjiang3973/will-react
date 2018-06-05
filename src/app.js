// const Hello = function () {
//     return React.createElement('div', null, `aaa World`);
// };
// const helloWorld = React.createElement(Hello, null, null);
// ReactDOM.render(helloWorld, document.getElementById('root'));



const Hello = function () {
    return React.createElement('div', null, `Hello World`);
};
const helloWorld = React.createElement(Hello, null, null);
const helloWorld2 = React.createElement(Hello, null, null);
const regularDiv = React.createElement('div', null, `I'm just a regular div`);

const parent = React.createElement('div', null,
        helloWorld,
        helloWorld2,
        regularDiv,
        ` I'm just a text`
);
// We expect to see:
// -----------------
// Hello World
// Hello World
// I'm just a regular div
// I'm just a text
ReactDOM.render(parent, document.getElementById('root'));
