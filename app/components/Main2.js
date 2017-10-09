import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

//const React = require("react");

const Search = require("./children/Search");
const Results = require("./children/Results");
const Saved = require("./children/Saved");
const helpers = require("./utils/helpers");

// Creating the Results component

class Main2 extends React.Component {
  constructor(props) {
    super(props);
    this.setTerm = this.setTerm.bind(this);
    this.setSaved = this.setSaved.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);

    //  this.handleSubmit= this.handleSubmit.bind(this);
    //        this.render= this.render.bind(this);

    this.state = {
      searchTerm: '',
      results: [],
      saved: []
    };

  }

  componentDidMount() {
    console.log("here!!");
    // Get the latest saved.
    helpers.getSaved().then((response) => {
      console.log(response);
      if (response !== this.state.saved) {
        console.log("Saved", response.data);
        this.setState({saved: response.data});
      }
    });
  }

  componentDidUpdate() {

    //alert("Update");
  }

  setTerm(term) {
    this.setState({searchTerm: term});
    helpers.runQuery(term).then((data) => {

      //  var articleArray=data.data.response.docs;

      if (data.data.response.docs !== this.state.results) {
        //  console.log("AHELP!!!", data);
        //  this.setState({results: JSON.stringify(data)});
        this.setState({results: data.data.response.docs});
      }

    });
  }

  setSaved(savedArticle) {

    helpers.postSaved(savedArticle).then(() => {
      console.log("Updated!");

      helpers.getSaved().then((response) => {
        console.log("Current Saved", response);

        this.setState({saved: response.data});
        console.log("Saved", response.data);
      });
    });

  };

  deleteArticle(articleToDelete) {

    helpers.postDelete(articleToDelete).then(() => {
      console.log("Updated!");

      helpers.getSaved().then((response) => {
        console.log("Current Saved", response);

        this.setState({saved: response.data});
        console.log("Saved", response.data);
      });
    });

  };

  render() {
    const Sea = () => <div><Search setTerm={this.setTerm}/><Results currentResults={this.state.results} setSaved={this.setSaved}/></div>
    const Sav = () => <Saved saved={this.state.saved} delete={this.deleteArticle}/>
    return (

        <Router>
          <div className="container">
            <div className="jumbotron">
              <img className='title' src='./images/titletext.png' />
              <h1 className="sub-title1">Article Search</h1>
              <p className="sub-title2">
                <em>Enter a term to search for (ex: "cat shortage").</em>
              </p>
              <div className='nav-links'>

                  <Link to="/search" className='nav' style={{ textDecoration: 'none' }}>Search</Link>
                {/* </div>
                <div className='nav'> */}
                  <Link to="/saved" className='nav' style={{ textDecoration: 'none' }}>Saved</Link>

              </div>
            </div>

            <div className='component-div'>
              <Switch>
                <Route path="/saved" component={Sav}/>
                <Route path="/search" component={Sea}/>
              </Switch>
            </div>
          </div>
        </Router>

    );
  }
};

module.exports = Main2;
