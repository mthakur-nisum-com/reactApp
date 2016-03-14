var React=require('react');
var ReactDom=require('react-dom');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var file,fileType,targetWindow,liElem=$('<li>'),fileLink=$('<a>'),fileName,fileData;
var AttachmentView = React.createClass({
	mixins:[LinkedStateMixin],
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
					localStorage.fileUpload = fileReader.result.split(',')[1];
					localStorage.fileName= fileName;
					localStorage.fileType= file.type;
				}
				if($('.'+targetWindow).find('.emoji-list').hasClass('hide')){
					$('.'+targetWindow).find('.emoji-list').removeClass('hide');
				}
				else {
					$('.'+targetWindow).find('.emoji-list').addClass('hide');
				}
				alert('uploaded file');
			}
			fileReader.readAsDataURL(file);
			
		}
	},
	getInitialState:function(){

		self=this;
		targetWindow = self.props.data.toUserId;
		return {
			fileUpload:null
		};
	},
	render:function() {
		
		return(
			<div className="row attachment-panel">
				<div className="colg-lg-11">
					<div className="row attachment-preview">
					</div>
					<div className="col-lg-11 attach-sec">
						<input type="file" id="attachFile" onChange={this.uploadFile} value=""/>
					</div>
				</div>
			</div>
		)
	}
});
module.exports = AttachmentView;