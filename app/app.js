import React from '../src/react.js';
import ReactDOM from '../src/reactDOM.js';

// const MyCoolJSXQuoteComponent = ({quote, author}) => {
//   return (
//     <div className="quote-container">
//       <h4 className="quote">"{quote}"</h4>
//       <div className="author">- {author}</div>
//     </div>
//   );
// };
//
//
// ReactDOM.render(
//   <MyCoolJSXQuoteComponent
//     quote="The only source of knowledge is experience."
//     author="Albert Einstein"/>,
//   document.getElementById('root'));

// TEST 1
// const helloWorld = <div>hello sb!</div>;
//
// ReactDOM.render(helloWorld, document.getElementById('root'));

// TEST 2
// const helloWorld2 = <div style={{background: 'red'}}>
//                         hello sb!
//                         <div>
//                             hello tony!
//                         </div>
//                     </div>;
//
// ReactDOM.render(helloWorld2, document.getElementById('root'));

// TEST 3
// class Hello extends React.Component{
//     render() {
//         return (
//             <div>
//                 Hello!!!
//                 <span>
//                     aaaaaa
//                     <span>
//                         vvvvvvvvvv
//                     </span>
//                 </span>
//             </div>
//         )
//     }
// }
//
// const helloWorld = (
//     <div>
//         ssssss
//         <Hello/>
//     </div>
//     );
// ReactDOM.render(helloWorld, document.getElementById('root'));

// TEST 4
class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return React.createElement(
            'div',
            null,
            'Hello!!!',
            this.props.children[0]   
        );
    }
}

const helloWorld = React.createElement(
    'div',
    null,
    'ssssss',
    React.createElement(
        Hello,
        null,
        React.createElement(
            'div',
            null,
            'Yang'
        )
    )
);
ReactDOM.render(helloWorld, document.getElementById('root'));
