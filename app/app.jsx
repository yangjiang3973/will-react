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
// class CCC extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (<div style={{ height: '100px', width: '100px', background: this.props.color }}>asd</div>);
//     }
// }
// //
// class FuckApp extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//
//     state = {
//         color: 'red'
//     }
//
//     _handleClick = () => {
//         const color = ['#eee', 'black', 'red', 'green', 'blue','grey','#133234','#123213','#222345','#998232']
//         const rand = parseInt(Math.min(10, Math.random() * 10))
//         this.setState({
//             color: color[rand]
//         });
//     }
//
//     render() {
//         return (
//             <div>
//                 <div
//                     style={{ height: '100px', width: '100px', background: this.state.color }}
//                     className='I am FuckApp component'
//                 />
//                 <button onClick={this._handleClick}>{this.state.color}</button>
//                 <CCC color={this.state.color}/>
//             </div>
//         );
//     }
// }
//
//
// ReactDOM.render(
//     <FuckApp />
//     , document.getElementById('root')
// );

// TEST 6
// class Hello extends React.Component {
//   constructor(props) {
//         super(props);
//         this.state = {};
//     }
//
//   render() {
//     return (
//             <div>
//                 {this.props.children}
//             </div>
//         );
//   }
// }
//
// const helloWorld = (
//     <div>
//         <Hello>
//             <div>Yang</div>
//             <div>jiang</div>
//         </Hello>
//     </div>
//     );
//
//
// ReactDOM.render(helloWorld, document.getElementById('root'));

class CCC extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div style={{ height: '100px', width: '100px', background: this.props.color }}>asd</div>);
    }
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 1,
      color: 'red'
    }
  }

  _handleClick = () => {
      const color = ['#eee', 'black', 'red', 'green', 'blue','grey','#133234','#123213','#222345','#998232']
      const rand = parseInt(Math.min(10, Math.random() * 10))
      this.setState({
          color: color[rand],
          counter: this.state.counter + 1,
      });
  }

  render() {
    return (
      <div key={1} >
        {this.state.counter%2 === 0 ? <div>native dom here</div> : <CCC color={this.state.color}/> }
        <button onClick={this._handleClick}>{this.state.color}</button>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);



// ReactDOM.render(
//     <FuckApp />
//     , document.getElementById('root')
// );
