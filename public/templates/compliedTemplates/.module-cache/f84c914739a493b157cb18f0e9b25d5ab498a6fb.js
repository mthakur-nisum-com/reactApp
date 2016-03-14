var React=require('react');
var ReactDom=require('react-dom');
var className = require('classNames');
var self,targetBox,targetBoxisOpened,msgObj,imgNode;
var chatComponent,ActionEvents,message=null,PanelView=require('./PanelView');
var ChatBoxLayoutView = React.createClass({displayName: "ChatBoxLayoutView",
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
	updateChatBox:function(obj){
		if(obj.message.userMsg.length || obj.message.fileUpload) {
			if(obj.from === localStorage.getItem('userEmail') || obj.to === localStorage.getItem('userEmail')) {
				if(obj.targetBoxisOpened) {	
					msgObj =$('<li>'),fileLink=$('<a>');
					imgNode = this.processEmoji(obj.message.userMsg);
					if(imgNode.length) {
						msgObj.append(imgNode);
						if(obj.from === localStorage.getItem('userEmail')) {
							msgObj.attr('class','right-class');
							//imgNode.attr('class','right-class');
						}
						else {
							msgObj.attr('class','left-class');
							//imgNode.attr('class','left-class');
						}
						//msgObj.append(textNode);
						if(localStorage && localStorage.message !== obj.message) {
							if(obj.message.fileUpload) {
								var blob = self.b64toBlob(obj.message.fileUpload, obj.message.fileType);
								var blobUrl = window.URL.createObjectURL(blob);
								/*fileLink.attr('href',obj.message.fileUpload).attr('download',obj.message.fileName);
								fileLink.text(obj.message.fileName);*/
								msgObj.append(fileLink);
							}
							$('.'+obj.targetBox).find('.msg-list-sec').append(msgObj);
						}
						localStorage.message=obj.message;
						}
					
					}

				}
		}
		
	},
	processEmoji:function(msg){
		var match, result = msg,targetWindow = document.getElementsByClassName(self.props.data.toUserId),
            reg = /\[emoji:\d+\]/g,
            emojiIndex,
             totalEmojiNum = targetWindow[0].getElementsByClassName('smily-list');
        if(totalEmojiNum.length){
        	totalEmojiNum=totalEmojiNum[0];
            totalEmojiNum = totalEmojiNum.children.length;
        while (match = reg.exec(msg)) {
            emojiIndex = match[0].slice(7, -1);
            if (emojiIndex > totalEmojiNum) {
                result = result.replace(match[0], '[X]');
            } else {
                result = result.replace(match[0], '<img class="emoji" src="../../images/emoji/' + emojiIndex + '.gif" />');//todo:fix this in chrome it will cause a new request for the image
            };
        };
       		 return result;
        }
         else {
         	return msg;
         }   
	},
	handleEmojiPanel:function(){

		if($('.'+self.props.data.toUserId).find('.emoji-list').hasClass('hide')){
			$('.'+self.props.data.toUserId).find('.emoji-list').removeClass('hide');
		}
		else {
			$('.'+self.props.data.toUserId).find('.emoji-list').addClass('hide');
		}

	},
	getInitialState:function(){
		self=this;
		ActionEvents = require('./../../js/Actions/ActionEvents');
		ActionEvents.addListeners('addUserMsg',self.updateChatBox);
		return {
			chatBox:'initalizing the chat',
			userMsg:null,
			userDetails:null,
			userOpenedList:[]
		}
	},
	uploadEmoji:function(e) {
		var imageFile,reader = new FileReader();
		if(e.target.files.length){
			imageFile = e.target.files[0];
			reader.onload = function(e){
				console.log(e);
				message="["+e.target.result+"]";
				$('#messageBox').val($('#messageBox').val()+message);
			}
			reader.readAsDataURL(imageFile);
		}
	},
	handleMiniMizeClick:function(e) {
		console.log(e);
	},
	componentWillMount:function(){
		self=this;
		self.state.userOpenedList.push({
			'userWidow':this.props.data.toUserId,
			'userOpened':true
		});
		
		
	},
	handleCloseIcon:function(e){
		console.log(e);
		ReactDom.findDOMNode(self.refs[self.props.data.toUserId]).remove();
		$('#user-list').find('#'+this.props.data.toUserId).attr('data-attr-isopened',false);
	},
	sendMessage:function(e) {
		if(e['keyCode'] === 13 || e['keyCode'] === undefined) {
			ActionEvents.sendMessage({
				toUser:this.props.data.toUser,
				fromUser:this.props.data.fromUser,
				toUserId:this.props.data.toUserId,
				fromUserId:this.props.data.fromUserId,
				message:{
					userMsg:$('#messageBox').val(),
					fileUpload:localStorage.getItem('fileUpload')|| null,
					fileName:localStorage.getItem('fileName')|| null,
					fileType:localStorage.getItem('fileType') || null
				}
			});
			$('#messageBox').val('');
		}
		
		
	},
	attachFile:function() {

	},
	render:function(){	
		return(
			React.createElement("li", {className: "row", ref: this.props.data.toUserId}, 
				React.createElement("div", {className: this.props.data.toUserId, id: "chatBox"}, 
					React.createElement("div", {className: "chat-header col-lg-12 col-md-12 col-sm-12"}, 
						React.createElement("img", {src: "../../images/emoji/69.gif", title: "1"})
					), 
					React.createElement("div", {className: "chat-body col-lg-12 col-md-12 col-sm-12 padding-none"}, 
						React.createElement("ul", {className: "msg-list-sec padding-none"}
						)
					), 
					React.createElement("div", {className: "msg-send-sec col-lg-12 col-md-12 col-sm-12"}, 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "colg-lg-12 col-md-12 col-sm-12 padding-none"}, 
								React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-6"}, 
									React.createElement("div", {className: "row form-group"}, 
										React.createElement("input", {type: "text", className: "msg-text", id: "messageBox", onKeyDown: this.sendMessage})
									)
								), 
								React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-6"}, 
									React.createElement("div", {className: "row"}, 
										React.createElement("div", {className: "col-lg-1 col-md-6 col-sm-12 col-lg-offset-1 col-md-offset-1"}, 
											React.createElement("input", {type: "button", className: "btn btn-success", value: "→", id: "sendBtn", onClick: this.sendMessage}
											)
										), 
										React.createElement("div", {className: "col-lg-1 col-md-1 col-sm-12 col-lg-offset-2 col-md-offset-1"}, 
											React.createElement("input", {type: "button", className: "btn btn-danger", value: "+", id: "addImage", 
												onClick: this.handleEmojiPanel}
											)
										)
									)
								)
							), 
							React.createElement("div", {className: "emoji-sec row"}, 
								React.createElement("div", {className: "emoji-panel col-lg-12"}, 
									React.createElement("ul", {className: "emoji-list hide"}, 
										React.createElement(PanelView, {data: self.props.data, parent: self})
									)
								)								
							)
						)
					)
				)
			)
		)
	},
	componentDidMount:function(){
		
	}
});
module.exports=ChatBoxLayoutView;