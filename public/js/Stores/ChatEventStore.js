var AppDispatcher =require('./../Dispatcher/AppDispatcher'),
socketLib=require("./../../lib/CustomSocketLib");
AppDispatcher.register(function(obj){
	switch(obj.eventType) {
		case "send_msg":
		if(socketLib.checkConnection) {
			socketLib.sendMessage({
				callBack:obj.callback,
				fromUser:obj.fromUser,
				message:obj.message,
				toUser:obj.toUser,
				toUserID:obj.toUserID,
				fromUserID:obj.fromUserID
			});
		}
		break;
		case "makeCall":
			$.ajax({
				url:obj.url,
				type:obj.type,
				data:obj.data,
				success:function(response){
					obj.success.call(this,response)
				},
				error:function() {
					obj.error.call(this);
				}
			});
		break;
		case "call_user":
			if(socketLib.checkConnection) {
				socketLib.callUser({
					callBack:obj.callback,
					fromUser:obj.fromUser,
					toUser:obj.toUser
				});
			}
		break;
	}
});
/*module.exports={};*/