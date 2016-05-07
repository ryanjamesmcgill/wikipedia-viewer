var React = require('react');
var ReactDOM = require('react-dom');
    
var searchBarStyle = {
    //font-size and height are in wikipedia-viewer.css
    border: 0,
    borderBottom: "1px solid rgba(0,0,0,.15)",
    borderRadius: 0,
    boxShadow: "none",
    WebkitBoxShadow: "none",
    transition: "none",
    WebkitTransition: "none"
};
    
var SearchBar = React.createClass({
    componentDidMount: function(){
      ReactDOM.findDOMNode(this.refs.searchBox).focus(); 
    },
    _onSubmit: function(e){
        e.preventDefault();
        this.props.queryWiki();
    },
	render: function(){
		return ( 
		<form onSubmit={this._onSubmit}>
		<div className="form-group">
            <input style={searchBarStyle}
                    ref="searchBox"
                    type="text" 
                    className="form-control" 
                    id="search-input" 
                    placeholder="search wikipedia..."
                    onChange={this.props.onFormChange}/>
        </div>
		</form>
		);
	}
});

module.exports = SearchBar;

