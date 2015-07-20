
var Story = React.createClass({
  loadCommentsFromServer: function(){
    this.setState({data: this.props.data});
  },
  getInitialState: function(){
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    // 上のコードは定期的にサーバーサイドと同期をするコード。
    // ただRails側の@storyはそのページを更新しないかぎり変化しない。
    // というわけで、今回は挫折。たぶんrailsAPIの作成だといける気がする。
   },
   handleCommentSubmit:function(story){
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
      <div className="commentBox">
        <h1>Post New Stories!</h1>
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
        <h1>Stories</h1>
        <CommentList data={this.state.data}/>
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (story) {
      return (
        <Comment author={story.author} title={story.title} url={story.url}>
          {story.summary}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.title}
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


var CommentForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var title = React.findDOMNode(this.refs.title).value.trim();
    var summary = React.findDOMNode(this.refs.summary).value.trim();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var url = React.findDOMNode(this.refs.url).value.trim();
    if (!summary || !author || !title || !url){
      return;
    }
    this.props.onCommentSubmit({author: author, summary: summary, title: title, url: url});

    React.findDOMNode(this.refs.author).value = "";
    React.findDOMNode(this.refs.title).value = "";
    React.findDOMNode(this.refs.url).value = "";
    React.findDOMNode(this.refs.summary).value = "";
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Story's title" ref="title" />
        <input type="text" placeholder="Story's summary" ref="summary" />
        <input type="text" placeholder="Story's author" ref="author" />
        <input type="text" placeholder="Story's url" ref="url"/>
        <input type="submit" value="Post" />
      </form>
    );
  }
});
