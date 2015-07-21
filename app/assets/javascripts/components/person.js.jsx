var Person = React.createClass({
  getInitialState: function(){
    return {data: []};
  },
  loadPeopleFromServer: function(){
    this.setState({data: this.props.data});
  },
  componentDidMount: function(){
    this.loadPeopleFromServer
    setInterval(this.loadPeopleFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div>
        <h1>Create new character!</h1>
        <PersonForm />
        <h1>Characters</h1>
        <PersonList data={this.state.data}/>
      </div>
    );
  }
});

var PersonList = React.createClass({
  render: function(){
    var PersonNodes = this.props.data.map(function (person) {
      return (
        <PersonPart name={person.p_name}>
          {person.character}
        </PersonPart>
      );
    });
    return (
      <div className="personList">
        {PersonNodes}
      </div>
    );
  }
});

var PersonPart = React.createClass({
  render: function(){
    return(
      <div className="personPart">
        <h3>{this.props.name}</h3>
        {this.props.children}
      </div>
    )
  }
});

var PersonForm = React.createClass({
  render: function(){
    return(
      <div className="personForm">
        <p>this is person form</p>
      </div>
    );
  }
});
