
var Story = React.createClass({
  loadStoriesFromServer: function(){
    this.setState({data: this.props.data});
  },
  getInitialState: function(){
    return {data: []};
  },
  componentDidMount: function() {
    this.loadStoriesFromServer();
    // setInterval(this.loadStorieFromServer, this.props.pollInterval);
    // 上のコードは定期的にサーバーサイドと同期をするコード。
    // ただRails側の@storyはそのページを更新しないかぎり変化しない。
    // というわけで、今回は挫折。たぶんrailsAPIの作成だといける気がする。
   },
   handleStorySubmit:function(story){
    // submit storydatas to server side.
    var storyDataToRails = {story: story}
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: storyDataToRails
    });
    // change DOM by new data.
    this.setState({data: this.state.data.concat(story)});
   },
  render: function() {
    return (
      <div className="storyBox">
        <h1>Create New Stories!</h1>
        <StoryForm onStorySubmit={this.handleStorySubmit}/>
        <h1 className="text-center">Current Stories</h1>
        <StoryList data={this.state.data}/>
      </div>
    );
  }
});

var StoryList = React.createClass({
  render: function() {
    var storyNodes = this.props.data.map(function (story) {
      var e_path = "/storys/" + story.id + "/edit";
      var d_path = "/storys/" + story.id ;
      return (
        <div className="storyPart text-center">
          <StorySegment author={story.author} title={story.title} url={story.url} id={story.id}>
            {story.summary}
          </StorySegment>
          <a className="btn btn-warning" href={e_path}>edit!</a>
          <a className="btn btn-danger" rel="nofollow" data-confirm="you sure?" data-method="delete" href={d_path}>delete!</a>
          <p>-------------------------------------------------</p>
        </div>
      );
    });
    return (
      <div className="storyList">
        {storyNodes}
      </div>
    );
  }
});

var StorySegment = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    var thisTitleName = this.props.title;
    var thisUrlPath = "/storys/" + this.props.id + "/";
    return (
      <div className="story">
        <h2 className="storyTitle">
          <a href={thisUrlPath} className="btn btn-primary btn-lg">{thisTitleName}</a>
        </h2>
        author: {this.props.author}
        <br></br>
        url: {this.props.url}
        <br></br>
        summary: <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});


var StoryForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var title = React.findDOMNode(this.refs.title).value.trim();
    var summary = React.findDOMNode(this.refs.summary).value.trim();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var url = React.findDOMNode(this.refs.url).value.trim();
    if (!summary || !author || !title || !url){
      return;
    }
    this.props.onStorySubmit({author: author, summary: summary, title: title, url: url});

    React.findDOMNode(this.refs.author).value = "";
    React.findDOMNode(this.refs.title).value = "";
    React.findDOMNode(this.refs.url).value = "";
    React.findDOMNode(this.refs.summary).value = "";
    return;
  },
  render: function() {
    return (
      <form className="storyForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Story's title" ref="title" />
        <input type="text" placeholder="Story's summary" ref="summary" />
        <input type="text" placeholder="Story's author" ref="author" />
        <input type="text" placeholder="Story's url" ref="url"/>
        <input type="submit" value="Post" />
      </form>
    );
  }
});
