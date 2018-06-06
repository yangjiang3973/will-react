// const Hello = ({name}) => {
//     return React.createElement('div', null, `hello, ${name}`);
// };

// const Hello = ({name}) => {
//     return <div>hello, {name}</div>
// }

{/* <Hello name='yang'></Hello> */}
// const helloWorld = React.createElement(Hello, {name: 'Yang'}, null);



// const Hello = function () {
//     return React.createElement('div', null, `Hello World`);
// };
// const helloWorld = React.createElement(Hello, null, null);
// const helloWorld2 = React.createElement(Hello, null, null);
// const regularDiv = React.createElement('div', null, `I'm just a regular div`);
//
// const parent = React.createElement('div', null,
//         helloWorld,
//         helloWorld2,
//         regularDiv,
//         ` I'm just a text`
// );
// We expect to see:
// -----------------
// Hello World
// Hello World
// I'm just a regular div
// I'm just a text


class Hello extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement('div', null, `hello again! ${this.props.name}`);
    }
}

const helloWorld = React.createElement(Hello, {name: 'yang'}, null);

ReactDOM.render(helloWorld, document.getElementById('root'));
