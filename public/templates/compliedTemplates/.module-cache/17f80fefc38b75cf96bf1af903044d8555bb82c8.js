var React=require('react');
var ReactDom=require('react-dom');
var file,fileType,targetWindow,liElem=$('<li>'),fileLink=$('<a>'),fileName,fileData;
var AttachmentView = React.createClass({displayName: "AttachmentView",
	b64toBlob:function(b64Data, contentType, sliceSize) {
		var contentType = contentType || '';
	    var sliceSize = sliceSize || 512;

	    var byteCharacters = atob(b64Data);
	    var byteArrays = [];

	    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
	        var slice = byteCharacters.slice(offset, offset + sliceSize);

	        var byteNumbers = new Array(slice.length);
	        for (var i = 0; i < slice.length; i++) {
	            byteNumbers[i] = slice.charCodeAt(i);
	        }

	        var byteArray = new Uint8Array(byteNumbers);

	        byteArrays.push(byteArray);
	    }

	    var blob = new Blob(byteArrays, {type: contentType});
	    console.log(blob);
	    return blob;
	},
	uploadFile:function(e){
		if(e.currentTarget.files.length>0) {
			var fileReader = new FileReader();
			file = e.currentTarget.files[0];
			fileName = file.name;
			fileType = file.name.split('.');
			fileType =fileType[fileType.length-1];
			console.log(file);
			/*console.log(fileReader.readAsDataURL(file));*/

			fileReader.onload= function() {
				if(fileType !== 'img') {
					/*fileLink.text(fileName);
					fileData = fileReader.result.split(',');
					fileData = fileData[fileData.length-fileData.length] + encodeURIComponent(fileData[fileData.length-1]);
					fileLink.attr('href','http://localhost:3000/'+fileData).attr('target','_blank').attr('download',fileName);
					liElem.append(fileLink);
					$('.'+targetWindow).find('.msg-list-sec').append(liElem);*/
					
					fileData = fileReader.result.split(',');
					
					var blob = self.b64toBlob(fileReader.result.split(',')[1], file.type);
					var blobUrl = window.URL.createObjectURL(blob);
					fileLink.attr('href',blobUrl).attr('download',fileName);
					fileLink.text(fileName);
					liElem.append(fileLink);
					$('.'+targetWindow).find('.msg-list-sec').append(liElem);
					$('.'+targetWindow).find('#messageBox').val($('.'+targetWindow).find('#messageBox').val()+fileLink.toString());
				}
			}
			fileReader.readAsDataURL(file);
			
		}
	},
	getInitialState:function(){

		self=this;
		targetWindow = self.props.data.toUserId;
		return {};
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