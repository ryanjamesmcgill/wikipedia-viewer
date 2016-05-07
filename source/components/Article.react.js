var React = require('react');
var moment = require('moment');

var articleStyle = {
    border: 0,
    borderBottom: "1px solid rgba(0,0,0,.15)",
    borderRadius: 0, 
    paddingBottom: 20,
    paddingTop: 20
};

var Article = React.createClass({
    _onClick: function(){
        var url = this.props.data.url;
        window.open(url);
    },
    render: function(){
        var image;
        if (this.props.data.imgsrc){
            image = <img style={{height:100}} 
                        src={this.props.data.imgsrc} 
                        alt={"thumbnail for "+this.props.data.title}
                        key={this.props.data.title}/>;
        } else {
            image = <span style={{fontSize:75, color: 'rgba(0,0,0,.15)'}} className="glyphicon glyphicon-eye-open"></span>;
        }
        
        var dateStr = this.props.data.touched;
		return ( 
        <div className="row article" 
            style={articleStyle}
            onClick={this._onClick}>
            <div className="col-md-8">
                <h3 style={{marginBottom:0}}>{this.props.data.title}</h3>
                <p style={{fontWeight: 'lighter',
                            color: 'rgba(0,0,0,.5)'}}>
                    Last edited: {moment(dateStr).format('MMMM Do YYYY')} -- <span style={{color: "#40E0D0"}}>{moment(dateStr).fromNow()}</span>
                </p>
                <p>{this.props.data.summary}</p>
            </div>
            <div className="col-md-4">
                {image}
            </div>
        </div>
		);
	}
});

module.exports = Article;