var React=require('react');
var ReactDom=require('react-dom');
var fileReader = new FileReader();
var AttachmentView = React.createClass({displayName: "AttachmentView",
	uploadFile:function(e){
		if(e.target.files.length>0) {

		}
	},
	render:function() {
		return(
			React.createElement("div", {className: "row attachment-panel"}, 
				React.createElement("div", {className: "colg-lg-11"}, 
					React.createElement("div", {className: "row attachment-preview"}
					), 
					React.createElement("div", {className: "col-lg-11 attach-sec"}, 
						React.createElement("input", {type: "file", id: "attachFile", onChange: this.uploadFile})
					)
				)
			)
		)
	}
});
module.exports = AttachmentView;