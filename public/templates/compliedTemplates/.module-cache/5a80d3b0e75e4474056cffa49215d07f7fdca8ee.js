var React=require('react'),
	self,
	EmojiPanelView = require('./EmojiPanelView'),
	AttachmentView = require('./AttachmentView'),
	MailView = require('./MailView');
var PanelView =React.createClass({displayName: "PanelView",
	handleClick:function(e){
		e.preventDefault();
		var tabType=e.target.parentElement.getAttribute('data-tab-type')
		switch	(tabType) {
			case "file-tab":
			  self.setState({currentView:React.createElement(AttachmentView, {data: self.props.data})});
			  break;
			case "mail-tab":
			  self.setState({currentView:React.createElement(MailView, null)});
			  break;
			default:
			  self.setState({currentView:React.createElement(EmojiPanelView, {data: self.props.data})});
			  break;
		}
	},
	getInitialState:function(){
		self=this;
		return {
			currentView:React.createElement(EmojiPanelView, {data: self.props.data})
		}
	},
	render:function(){
		return(
			React.createElement("div", {className: "row"}, 
				React.createElement("div", {className: "col-lg-12"}, 
					React.createElement("ul", {className: "nav nav-tabs", onClick: this.handleClick}, 
						React.createElement("li", {role: "presentation", refs: "smileyPanel", className: "tabs \\", "data-tab-type": "smiley-tab"}, React.createElement("a", {href: "#", className: "fa fa-smile-o"}, "☺")), 
						React.createElement("li", {role: "presentation", refs: "attachementPanel", "data-tab-type": "file-tab"}, React.createElement("a", {href: "#", className: "glyphicon glyphicon-paperclip"})), 
						React.createElement("li", {role: "presentation", refs: "mailPanel", "data-tab-type": "mail-tab"}, React.createElement("a", {href: "#", className: "glyphicon glyphicon-envelope"}))
					)
				), 
				React.createElement("div", {className: "col-lg-12 col-md-12 col-sm-12"}, 
					React.createElement("div", {className: "row panel-content"}, 
						React.createElement("div", {className: "col-lg-12"}, 
							this.state.currentView
						)
					)
				)
			)
		)
	}
	
});
module.exports =PanelView;