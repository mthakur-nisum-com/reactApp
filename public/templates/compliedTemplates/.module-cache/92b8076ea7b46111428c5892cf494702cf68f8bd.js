var React=require('react');
var ReactDom=require('react-dom');
var chatBoxOpenList = [];
var self,targetBox,targetBoxisOpened,msgObj,imgNode;
var chatComponent,ActionEvents,message=null,PanelView=require('./PanelView');
var ChatBoxLayoutView = React.createClass({displayName: "ChatBoxLayoutView",
	findWindow:function(windowArrayList,userName,eventType){
		for(var i in windowArrayList) {

			if(windowArrayList[i].userWindow === userName) {
				if(eventType === 'maximize') {
					windowArrayList[i].isMinimized=false;
				}
				return windowArrayList[i].userWindow;
			}
			else if(eventType === 'minimize') {
				windowArrayList[i].isMinimized=true;
			}
			return windowArrayList[i].userWindow;
		}
	},
	swapWindows:function(targetElement,parentContainer){
		var list = document.getElementById(parentContainer);    // Get the <ul> element to insert a new node
		list.insertBefore(targetElement, list.childNodes[0]);  // Insert <li> before the first child of <ul>
	},
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
						if(localStorage && localStorage.userMsg !== obj.message.userMsg) {
							if(obj.message.fileUpload !== 'null') {
								var blob = self.b64toBlob(obj.message.fileUpload, obj.message.fileType);
								var blobUrl = window.URL.createObjectURL(blob);
								fileLink.attr('href',blobUrl).attr('download',obj.message.fileName);
								fileLink.text(obj.message.fileName);
								msgObj.append('<br>').append(fileLink);
								}
								$('.'+obj.targetBox).find('.msg-list-sec').append(msgObj);
							
							}
							localStorage.userMsg=obj.message.userMsg;
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
	minimizeWindow:function(targetWindow){
		$('.'+targetWindow).addClass("minimize-class");
		$('.'+targetWindow).addClass("minimized-header");
		$('.'+targetWindow).find('.minimize-icon-sec').removeClass("hide");
		$('.'+targetWindow).find('.msg-send-sec').addClass("hide");
		$('.'+targetWindow).find('.chat-body').addClass("hide");
		$('.'+targetWindow).find('.icon-sec').addClass("hide");
		$('.'+targetWindow).find('.title-sec').addClass('padding-none');
	},
	handleMiniMizeClick:function(e) {	
		self.findWindow(chatBoxOpenList,e.currentTarget.getAttribute('data-attr-user'),'minimize');
		self.minimizeWindow(e.currentTarget.getAttribute('data-attr-user'));
	},
	handleCloseIcon:function(e){
		ReactDom.findDOMNode(this.refs[e.currentTarget.getAttribute('data-attr-user')]).remove();
		$('#user-list').find('#'+this.props.data.toUserId).attr('data-attr-isopened',false);
	},
	maximixeWindow:function(targetWindow) {
		$('.'+targetWindow).removeClass("minimize-class");
		$('.'+targetWindow).removeClass("minimized-header");
		$('.'+targetWindow).find('.minimize-icon-sec').addClass("hide");
		$('.'+targetWindow).find('.msg-send-sec').removeClass("hide");
		$('.'+targetWindow).find('.chat-body').removeClass("hide");
		$('.'+targetWindow).find('.icon-sec').removeClass("hide");
		$('.'+targetWindow).find('.title-sec').removeClass('padding-none');
	},
	handleMaximize:function(e){
		self.findWindow(chatBoxOpenList,e.currentTarget.getAttribute('data-attr-user'),'maximize');
	    self.maximixeWindow(e.currentTarget.getAttribute('data-attr-user'));
	    self.swapWindows(this.refs[e.currentTarget.getAttribute('data-attr-user')],'chat-box-list');
	    chatBoxOpenList.map(function(Obj,index) {
	    	if(Obj.userWindow !== e.currentTarget.getAttribute('data-attr-user')) {
	    		if(Obj.isMaximized) {
	    			self.minimizeWindow(e.currentTarget.getAttribute('data-attr-user'));
	    		}
	    	}
	    })
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
			localStorage.setItem('fileUpload',null);
			localStorage.setItem('fileName',null)
			localStorage.setItem('fileType',null)
		}	
		
	},
	componentWillMount:function(){
	},
	getInitialState:function(){
		self=this;
		ActionEvents = require('./../../js/Actions/ActionEvents');
		ActionEvents.addListeners('addUserMsg',self.updateChatBox);
		chatBoxOpenList.push({
			userWindow:this.props.data.toUserId,
			isMinimized:true
		});
		return {
			chatBox:'initalizing the chat',
			emoji:null,
			userDetails:null,
			userName:localStorage.userName
		}
	},
	render:function(){	
		return(
			React.createElement("li", {className: "row", ref: this.props.data.toUserId}, 
				React.createElement("div", {className: this.props.data.toUserId, id: "chatBox"}, 
					React.createElement("div", {className: "chat-header col-lg-12 col-md-12 col-sm-12"}, 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-6 col-xs-6 title-sec"}, 
								React.createElement("img", {src: "../../images/emoji/12.gif", title: self.props.data.title}), 
								React.createElement("div", {className: "user-name"}, self.props.data.title), 
								React.createElement("div", {className: "row minimize-icon-sec hide"}, 
									React.createElement("div", {className: "glyphicon glyphicon-plus col-lg-3 col-md-3 col-sm-3 col-xs-3 plus-icon", onClick: this.handleMaximize, "data-attr-user": self.props.data.toUserId}
									), 
									React.createElement("div", {className: "glyphicon glyphicon-remove col-lg-3 col-md-3 col-sm-3 col-xs-3", onClick: this.handleCloseIcon, "data-attr-user": self.props.data.toUserId}
									)
								)
							), 
							React.createElement("div", {className: "col-lg-3 col-md-6 col-cs-6 col-sm-6 col-lg-offset-3 icon-sec"}, 
								React.createElement("div", {className: "row"}, 
									React.createElement("div", {className: "glyphicon glyphicon-minus col-lg-3 col-sm-3 col-md-3 col-xs-3", onClick: this.handleMiniMizeClick, "data-attr-user": self.props.data.toUserId}
									), 
									React.createElement("div", {className: "glyphicon glyphicon-remove col-lg-3 col-sm-3 col-md-3 col-xs-3", onClick: this.handleCloseIcon, "data-attr-user": self.props.data.toUserId}
									)
								)
							)
						)
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
										React.createElement("input", {type: "text", className: "msg-text form-control", id: "messageBox", onKeyDown: this.sendMessage})
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
										React.createElement(PanelView, {data: self.props.data, parent: self, userName: self.state.userName})
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