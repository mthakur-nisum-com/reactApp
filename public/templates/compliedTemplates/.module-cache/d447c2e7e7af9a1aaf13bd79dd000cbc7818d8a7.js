var React=require('react');
var ReactDom=require('react-dom');
var file,fileType,targetWindow,liElem=$('<li>'),fileLink=$('<a>'),fileName,fileData;
var AttachmentView = React.createClass({displayName: "AttachmentView",
	uploadFile:function(e){
		if(e.currentTarget.files.length>0) {
			var fileReader = new FileReader();
			file = e.currentTarget.files[0];
			fileName = file.name;
			fileType = file.name.split('.');
			fileType =fileType[fileType.length-1];
			console.log(file);
			/*console.log(fileReader.readAsDataURL(file));*/

			fileReader.onload= function(file) {
				if(fileType !== 'img') {
					/*ileLink.text(fileName);
					fileData = fileReader.result.split(',');
					fileData = fileData[fileData.length-fileData.length] + encodeURIComponent(fileData[fileData.length-1]);
					fileLink.attr('href','http://localhost:3000/'+fileData).attr('target','_blank').attr('download',fileName);
					liElem.append(fileLink);
					$('.'+targetWindow).find('.msg-list-sec').append(liElem);*/
					console.log(fileReader.result.split(','));
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