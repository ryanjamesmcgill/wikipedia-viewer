var React = require("react");
var $ = require("jquery");
var async = require("async");
var SearchBar = require("./SearchBar.react");
var Articles = require("./Articles.react");


var formStyle = {
	marginTop: 20
};    

var Application = React.createClass({
	getInitialState: function(){
		return {
			searchString: "",
			articles: [],
		};
	},
	queryWiki: function(){
		console.log('[wikipedia-viewer] queryWiki() called');
		var searchString = this.state.searchString;
		if (searchString == ""){
			this.setState({articles:[]});
			return;
		}
		searchString = searchString.split(" ").join("+");
		var self = this;
		$.ajax({
			url:"https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms%7Cinfo&generator=prefixsearch&redirects=1&formatversion=2&piprop=original&pilimit=10&wbptterms=description&inprop=url&gpslimit=10&gpssearch="+searchString,
			dataType: "jsonp",
			method: "get"
			})
		  .done(function(data) {
		    	var articles = [];
		    	var pages = [];
		    	if((data.query||{}).pages)
		    		pages = data.query.pages;
		    	for (var i=0; i<pages.length; i++){
		    		var index,title,touched,url,imgsrc,summary;
		    		
		    		if(pages[i].index){
		    			index = pages[i].index;
		    		}else{
		    			index = null;
		    		}
		    		if(pages[i].title){
		    			title = pages[i].title;
		    		}else{
		    			index = null;
		    		}
		    		if(pages[i].touched){
		    			touched = pages[i].touched;
		    		}else{
		    			touched = null;
		    		}
		    		if(pages[i].fullurl){
		    			url = pages[i].fullurl;
		    		}else{
		    			url = null;
		    		}
		    		if((pages[i].thumbnail||{}).original){
		    			imgsrc = pages[i].thumbnail.original;
		    		}else{
		    			imgsrc = null;
		    		}
		    		if(((pages[i].terms||{}).description||[]).length > 0){
		    			summary = pages[i].terms.description[0];
		    		}else{
		    			summary = null;
		    		}
		    		
		    		var page = {
		    			index: index,
		    			title: title,
		    			touched: touched,
		    			url: url,
		    			imgsrc: imgsrc,
		    			summary: summary
		    		};
		    		
		    		articles.push(page);
		    	}
		    	articles.sort(function(a,b){
		    		var ai = a.index;
		    		var bi = b.index;
		    		if (ai < bi)
		    			return -1;
		    		if (ai > bi)
		    			return 1;
		    		return 0;
		    	});
		    	self.setState({articles: articles});
		  })
		  .fail(function(err) {
		    	console.warn( "error from wikiSearch()", err );
		  });

	},
	onFormChange: function(event){
		var text = event.target.value;
		this.setState({searchString: text});
		setTimeout(this.queryWiki, 400);
	},
	render: function(){
		return ( 
		<div className="container">
		<div className="row">
			<div style={formStyle} className="col-md-12">
				<SearchBar queryWiki={this.queryWiki} onFormChange={this.onFormChange}/>
			</div>
		</div>
		<div className="row">
			<div className="col-md-10">
				<Articles articles={this.state.articles}/>
			</div>
		</div>
		</div>
		);
	}
});

module.exports = Application;

