var React=require('react');
var ChatBoxLayoutView=require('./ChatBoxLayoutView');
var chatLayoutView=require('./chatLayoutView');
var notifier = require('node-notifier');
var userStrategy =  sessionStorage,ActionEvents = require('./../../js/Actions/ActionEvents'),chatList;
var targetBox,targetBoxisOpened;
var UserListView=React.createClass({displayName: "UserListView",
	updateChatBoxList:function(options){
		chatList=this.props.parent.state.userChatList;
			if(chatList.length === 0){
				chatList[chatList.length] = React.createElement(ChatBoxLayoutView, {data: options, key: chatList.length});
			}
			else {
				chatList[chatList.length]=React.createElement(ChatBoxLayoutView, {data: options});
			}
			this.props.parent.setState({userChatList:chatList});
	},
	handleClick:function(e){
		if(JSON.parse(e.target.getAttribute('data-attr-isopened'))===false && e.target.getAttribute('class')!== 'user-offline'){
			this.props.parent.setState({chatList:chatList});
			e.target.setAttribute('data-attr-isopened',"true")	
			 options={
				toUser:e.target.getAttribute('data-attr-name'),
				fromUser:localStorage.userEmail,
				toUserId:e.target.getAttribute('id'),
				fromUserId:localStorage.getItem('chatName'),
				title:e.target.innerHTML,
				windowOpened:JSON.parse(e.target.getAttribute('data-attr-isopened')),
				offset: 0,
			};
			ActionEvents.updateCallBack('addChatBox',options);
		}
		
	},
	componentWillMount:function(){
		
		console.log(this);
	},
	handleUserMsg:function(obj){
		console.log(obj);
		if(obj.fromUserID === localStorage.chatName ) {
			targetBox= obj.toUserID;
			obj.targetBox = obj.toUserID;
			obj.targetBoxisOpened = JSON.parse($('#user-list').find('#'+targetBox).attr('data-attr-isopened'));
			if(!obj.targetBoxisOpened) {
				ActionEvents.updateCallBack('addChatBox',{
					toUser:obj.toUser,
					fromUser:localStorage.userEmail,
					toUserId:obj.toUserId,
					fromUserId:localStorage.getItem('chatName'),
					title:$('#'+obj.toUserId).html(),
					windowOpened:false,
					offset: 0,
				});
			}
		}
		else if(obj.fromUserID !== localStorage.chatName){
			targetBox= obj.fromUserID;
			obj.targetBox = obj.fromUserID;
			targetBoxisOpened = JSON.parse($('#user-list').find('#'+targetBox).attr('data-attr-isopened'));
			if(!targetBoxisOpened) {
				ActionEvents.updateCallBack('addChatBox',{
					toUser:obj.fromUser,
					fromUser:localStorage.userEmail,
					toUserId:obj.toUserId,
					fromUserId:localStorage.getItem('chatName'),
					title:$('#'+obj.toUserId).html(),
					windowOpened:false,
					offset: 0,
				});
			}
		}
		ActionEvents.updateCallBack('addUserMsg',obj);
	},
	getInitialState:function(){
		self=this;
		ActionEvents.addListeners('updateEvent', self.handleUserMsg);
		ActionEvents.addListeners('addChatBox', self.updateChatBoxList);
		return {
			
		}
	},
	render:function(){
		return(
			React.createElement("div", {id: "user-list-info"}, 
				this.props.data.length? React.createElement("ul", {id: "user-list", onClick: this.handleClick}, this.props.data.map(function(obj,keys){
					return React.createElement("li", {key: keys, "data-attr-isopened": "false", className: obj.status?"user-online":"user-offline", id: obj.chatName, "data-attr-name": obj.email}, obj.userName)
				})):React.createElement("div", null, "please check again")
			)

		)
	}
});
module.exports=UserListView;