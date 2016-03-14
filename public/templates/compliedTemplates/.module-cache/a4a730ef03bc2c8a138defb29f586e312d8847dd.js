var React=require('react');
var ReactDom=require('react-dom');
var file,fileType;
var AttachmentView = React.createClass({displayName: "AttachmentView",
	uploadFile:function(e){
		if(e.currentTarget.files.length>0) {
			var fileReader = new FileReader();
			file = e.currentTarget.files[0];
			fileType = file.name.split('.');
			fileType =fileType[fileType.length-1];
			console.log(file);
			/*console.log(fileReader.readAsDataURL(file));*/

			fileReader.onload= function(file) {
				if(fileType !== 'img') {

					console.log(fileReader.result);
				}
			}
			fileReader.readAsDataURL(file);
			
		}
	},
	render:function() {
		targetWindow = self.props.data.toUserId;
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