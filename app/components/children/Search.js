
const React = require("react");

// Creating the Results component

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
  //        this.render= this.render.bind(this);

        this.state = {term: ''};

    }

  handleChange(event) {

    this.setState({ term: event.target.value });

  }

  // When a user submits...
  handleSubmit(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    // Set the parent to have the search term
    this.props.setTerm(this.state.term);
  //  this.props.askNYT()
    this.setState({ term: "" });
  }
  // Here we describe this component's render method
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">

              <input
               value={this.state.term}
                type="text"
                className="search-box"
                id="term"
                onChange={this.handleChange}
                required
              />
              <br />
              <button
                className="submit-button"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

// Export the component back for use in other files
module.exports = Search;

// class Results extends React.Component {
//     constructor(props) {
//         super(props);
//         this.saveItem = this.saveItem.bind(this);
//         this.savedItem ="";
//
//     }
