// Include React
const React = require("react");

// Creating the Results component

class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    // this.savedItem ="";
  }

  deleteItem(itemID){
    this.props.delete(itemID)
  }
  // Here we describe this component's render method
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h2 className="saved-title">Saved</h2>
        </div>
        <div className="panel-body text-center">

          {this.props.saved.map((item, i) => {
            return (
              <div key={i} className='saved-div'>
                <h3>{item.title}</h3>
                <p>{item.date}</p>

                <p>{item.snippet}</p>
                <a href={item.url}>{item.url}</a>
                <p><button onClick={()=>this.deleteItem(item._id)}>Delete</button></p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

// Export the component back for use in other files
module.exports = Saved;
