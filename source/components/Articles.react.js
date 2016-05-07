var React = require('react');
var Article = require('./Article.react');
    
var Articles = React.createClass({
	render: function(){
        var articles = this.props.articles;
    	return ( 
    	<div>
            {articles.map(function(article){
                return <Article key={article.index} data={article} />;
            })}
        </div>
	    );
	}
});

module.exports = Articles;