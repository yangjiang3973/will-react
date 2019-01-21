import React from '../src/react.js'
import ReactDOM from '../src/reactDOM.js'

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
// const helloWorld = <div>
// aaaa
//                         <div >
//                             aaaa
//                         </div>
//                    </div>;
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
// class Hello extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//
//     render() {
//         // console.log(this.props);
//         return (
//             <div>
//                 {this.props.children}
//             </div>
//         )
//     }
// }
// //
// const helloWorld = (
//         <Hello>
//             <div>Yang</div>
//             <div>Jiang</div>
//         </Hello>
//     );
// console.log(helloWorld);
// ReactDOM.render(helloWorld, document.getElementById('root'));

// TEST 5
class FuckApp extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        color: 'red'
    }

    _handleClick = () => {
        console.log('cccccc');
        const color = ['#eee', 'black', 'red', 'green', 'blue','grey','#133234','#123213','#222345','#998232']
        const rand = parseInt(Math.min(10, Math.random() * 10))
        console.log(color[rand]);
        this.setState({
            color: color[rand]
        });

        // console.log(this);
    }

    render() {
        return (
            <div>
                <div
                style={{ height: '100px', width: '100px', background: this.state.color }}
                className='I am FuckApp component' />
                <button onClick={this._handleClick}>'aaa'</button>
            </div>
        );
    }
}


ReactDOM.render(
    <FuckApp />
    , document.getElementById('root')
);
