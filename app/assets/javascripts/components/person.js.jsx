var Person = React.createClass({
  loadPeopleFromServer: function(){
    this.setState({data: this.props.data});
  },
  getInitialState: function(){
    return {data: []};
  },
  componentDidMount: function(){
    this.loadPeopleFromServer();
    // setInterval(this.loadPeopleFromServer, this.props.pollInterval);
    // story component　と同様に今回は挫折
  },
  handlePersonSubmit: function(person){
    var foo = {person: person};
    $.ajax({
      url: this.props.create_url,
      dataType: 'json',
      type: 'POST',
      data: foo
    });
    this.setState({data: this.props.data.concat(person)})
  },
  render: function(){
    return (
      <div className="characterBox text-center">
        <h1>Create new character!</h1>
        <PersonForm onPersonSubmit={this.handlePersonSubmit} storyID={this.props.storyID}/>
        <h1>Characters</h1>
        <PersonList data={this.state.data} destroyUrl={this.props.destroy_url}/>
      </div>
    );
  }
});

var PersonList = React.createClass({
  // destroyUrlはここまで持ってくるのが精一杯。
  // というわけで、ここでdestroyhandlerを作りましょうか。
  handlePersonButtonClick: function(person_id){
    var personData = {person: {id: person_id}}
    $.ajax({
      url: this.props.destroyUrl,
      dataType: 'json',
      Type: 'DELETE',
      data: personData
    });
    var data_ary = this.props.data
    var targetID = person_id
    data_ary.some(function(v,i){
      if (v.id == targetID) data_ary.splice(i,1);
    });
    this.setState({data: data_ary})
  },
  render: function(){
    var PersonNodes = this.props.data.map(function (person) {
      var e_path = "/persons/" + person.id + "/edit";
      var d_path = "/persons/" + person.id;
      return (
        <PersonPart name={person.p_name} personID={person.id} onPersonButtonClick={this.handlePersonButtonClick}>
          {person.character}
          <br/>
          <a className="btn btn-warning" href={e_path}>edit!</a>
          <a className="btn btn-danger" rel="nofollow" data-confirm="you sure?" data-method="delete" href={d_path}>delete!</a>
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
  handleButtonClick: function(){
    var id = this.props.personID
    this.props.onPersonButtonClick({id: id});
  },
  render: function(){
    return(
      <div className="personPart">
        <h3>{this.props.name}</h3>
        {this.props.children}
        <input className="btn btn-success" type="button" value="Delete" onClick={this.handleButtonClick}/>
      </div>
    )
  }
});


var PersonForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var feature = React.findDOMNode(this.refs.feature).value.trim();
    var storyID = this.props.storyID
    if (!name || !feature || !storyID){
      return;
    }
    this.props.onPersonSubmit({p_name: name, character: feature, story_id: storyID});

    React.findDOMNode(this.refs.name).value = "";
    React.findDOMNode(this.refs.feature).value = "";
    return;
  },
  render: function() {
    return (
      <form className="personForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Character's name" ref="name" />
        <input type="text" placeholder="Character's feature" ref="feature" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
