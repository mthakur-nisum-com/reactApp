var React =require('React');
var HeaderSection = require('./headerView');
var ContentSection = require('./contentView');
var ChatEventStore=require("./../js/Stores/ChatEventStore");
var mainView = React.createClass({displayName: "mainView",
	render:function(){
		return(
			React.createElement("div", {className: "row"}, 
				React.createElement(HeaderSection, null), 
				React.createElement(ContentSection, null)
			)
		)
	}
});
module.exports = mainView