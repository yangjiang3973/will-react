const MyCoolJSXQuoteComponent = ({ quote, author }) => {
  return React.createElement(
    "div",
    { className: "quote-container" },
    React.createElement(
      "h4",
      { className: "quote" },
      "\"",
      quote,
      "\""
    ),
    React.createElement(
      "div",
      { className: "author" },
      "- ",
      author
    )
  );
};

const stateless = React.createElement(MyCoolJSXQuoteComponent, {
  quote: "The only source of knowledge is experience.",
  author: "Albert Einstein" });

ReactDOM.render(stateless, document.getElementById('root'));
