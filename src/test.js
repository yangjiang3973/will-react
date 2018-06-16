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
// ReactDOM.render(parent, document.getElementById('root'));

// We expect to see:
// -----------------
// Hello World
// Hello World
// I'm just a regular div
// I'm just a text


// class Hello extends React.Component{
//     constructor(props) {
//         super(props); // calls the parent constructor.
//     }
//
//     render() {
//         return React.createElement('div', null, `hello again! ${this.props.name}`);
//     }
// }
//
// const helloWorld = React.createElement(Hello, {name: 'yang'}, null);


// class MyButton extends React.Component {
//
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     return React.createElement('button', {onClick: this.props.onClick}, `Click me`);
//   }
// }
// const myBtn = React.createElement(MyButton, {onClick: () => alert('yay it worked')}, null);
// ReactDOM.render(myBtn, document.getElementById('root'));

// class Counter extends React.Component {
//      constructor(props) {
//          super(props);
//          this.state = {value: 0};
//      }
//
//      onPlusClick() {
//          this.setState({value: this.state.value + 1});
//      }
//
//      onMinusClick() {
//          this.setState({value: this.state.value - 1});
//      }
//
//      render() {
//          return React.createElement('div', null,
//             React.createElement('div', null, 'A Counter'),
//             React.createElement('div', null, `${this.state.value}`),
//             React.createElement('button', {onClick: this.onPlusClick.bind(this)}, '+'),
//             React.createElement('button', {onClick: this.onMinusClick.bind(this)}, '-')
//         );
//      }
// }

// TODO: Need to keep old class's state. Otherwise reReder will create instances again, then nothing change on web page.
// use a hashMap to store all instances. when reRender(), find instances(will not lose states).
// key is the order of instance in the tree, value is its instance.
// class Root extends React.Component {
//     render() {
//         return React.createElement('div', null,
//             React.createElement(Counter, null, null),
//             React.createElement(Counter, null, null));
//     }
// }

// const counter = React.createElement(Counter, null, null);
// const counterWrapper = React.createElement('div', null, counter);
// ReactDOM.render(counterWrapper, document.getElementById('root'));


// const wrapCounter = React.createElement(Root, null, null);
// ReactDOM.render(wrapCounter, document.getElementById('root'));
