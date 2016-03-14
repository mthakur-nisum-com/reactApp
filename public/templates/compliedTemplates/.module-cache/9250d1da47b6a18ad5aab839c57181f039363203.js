var React=require('react');
var ReactDom=require('react-dom');
var AttachmentView = React.createClass({displayName: "AttachmentView",
	render:function() {
		return(
			React.createElement("div", {className: "row attachment-panel"}, 
				React.createElement("div", {className: "colg-lg-12"}, 
					React.createElement("div", {className: "row attachment-preview"}
					), 
					React.createElement("div", {className: "col-lg-10 attach-sec"}, 
						React.createElement("input", {type: "file", id: "attachFile"})
					)
				)
			)
		)
	}
});
module.exports = AttachmentView;