var ActionEvents = require('./../js/Actions/ActionEvents'),self=this;
var socket=require("./Socket");
var sockeLib = {
	setParams:function(params){
		this.params=params;
	},
	checkConnection:function(){
		return Socket.connected;
	},
	createSocketConnection:function(params){
		params={};
		Socket=new socket();
		params.callBack = function() {
			console.log('sample Call')
		}
		Socket.emit('chatMessage', params.fromUser,params.toUser,localStorage.getItem('chatName'),params.toUserID,params.message);
		Socket.on('chatMessage'+localStorage.getItem('chatName')+'',function(fromUser,toUser,fromUserID,toUserID,msg){
			console.log(fromUserID);
			params.from=fromUser;
			params.fromUser=fromUser;
			params.fromUserID=fromUserID;
			params.message=msg;
			params.to = toUser;
			params.toUser=toUser;
			params.toUserID=toUserID;
			params.callBack.call(this,'updateEvent',params)
		});
		ActionEvents.removeListener('createSocket',sockeLib.createSocketConnection);
	},
	createSocket:function(){
		ActionEvents.addListeners('createSocket',sockeLib.createSocketConnection);
	},
	sendMessage:function(params) {
		Socket.emit('chatMessage', params.fromUser,params.toUser,params.fromUserID,params.toUserID,params.message);
		Socket.on('chatMessage'+localStorage.getItem('chatName')+'',function(fromUser,toUser,fromUserID,toUserID,msg){
			console.log(fromUserID);
			params.from=fromUser;
			params.fromUser=fromUser;
			params.fromUserID=fromUserID;
			params.message=msg;
			params.to = toUser;
			params.toUser=toUser;
			params.toUserID=toUserID;
			params.callBack.call(this,'updateEvent',params)
		});
	},
	callUser:function(params){
		Socket=new socket();
		Socket.emit('callUser',params.fromUser,params.toUser);
		Socket.on('callUser'+params.fromUser+'',function(fromUser,toUser){
			params.fromUser=fromUser;
			params.toUser=toUser;
			params.callBack.call(this,'callEvent',params)
		});
	}/*,
	notifyUser:function(){
		params.callback.call(from)
	}*/
}
module.exports=sockeLib;