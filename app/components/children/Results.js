// Include React
const React = require("react");

// Creating the Results component

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.saveItem = this.saveItem.bind(this);
    //    this.savedItem ="";

    }


  saveItem(obj) {

    this.setState({
      savedArticle: obj
    }, ()=> {
      console.log(this.state.savedArticle);
      this.props.setSaved(this.state.savedArticle);
    });

  }
  // Here we render the function
  render() {
    return (
      <div className="container">

        <div className="row col-sm-12">
          <h2>Matching Results</h2>

          {this.props.currentResults.map((item, i) => {
            const obj = {
              date: item.pub_date,
              title: item.headline.main,
              snippet: item.snippet,
              url: item.web_url
            };
            return (
              <div key={i} className='results-div'>

                <h3>{item.headline.main}</h3>
                <p>{item.pub_date}</p>
                <p>{item.snippet}</p>
                {/* <p>{item.url}</p> */}
                <a href={item.web_url}>{item.web_url}</a>


                <p><button className="saveButton" id={i} onClick={() => this.saveItem(obj)}>Save</button></p>

              </div>
            )
          })}
          <img alt="News" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/News_1.svg/701px-News_1.svg.png" width="30%" height="30%" onClick={this.saveItem}/>
        </div>
      </div>
    );
  }
};

// Export the component back for use in other files
module.exports = Results;
//export default Results;
