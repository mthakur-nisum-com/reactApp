var AppDispatcher = require('./../Dispatcher/AppDispatcher'),
    EventEmitter = require("events").EventEmitter,
    eventEmitter = new EventEmitter(),
    type, callBack;
var ActionEvents = {
    createRoom: function(obj) {

    },
    addListeners: function(type, callback) {
        this.type = type;
        switch (type) {
            case "updateEvent":
                callBack = callback;
                eventEmitter.on('update', callback);
                return;
            case "changeEvent":
                callBack = callback;
                eventEmitter.on('change', callback);
                return;
            case "Error":
                callBack = callback;
                eventEmitter.on('updateError', callback);
                return;
            case "selectEvent":
                callBack = callback;
                eventEmitter.on('select', callback);
                return;
            case "insertRecord":
                callBack = callback;
                eventEmitter.on('insert', callback);
                return;
            case "loginEvent":
                callBack = callback;
                eventEmitter.on('login', callback);
                return;
            case "addChatBox":
                callBack = callback;
                eventEmitter.on('addChat', callback);
                return;
            case "createSocket":
                callBack = callback;
                eventEmitter.on('createSocket', callback);
                return;
            case "addUserMsg":
                callBack = callback;
                eventEmitter.on('addUserMsg', callback);
                return;
            case "searchEvent":
                callBack = callback;
                eventEmitter.on('searchEvent', callback);
                return;
            case "callEvent":
                callBack = callback;
                eventEmitter.on('callEvent', callback);
                return;
        }

    },
    updateCallBack: function(type, params) {
        switch (type) {
            case "updateEvent":
                //console.log(params)
                eventEmitter.emit('update', params);
                break;
            case "changeEvent":
                eventEmitter.emit('change', params);
                break;
            case "loginEvent":
                eventEmitter.emit('login', params);
                break;
            case "Error":
                eventEmitter.emit('updateError', params);
                break;
            case "selectEvent":
                eventEmitter.emit('select', params);
                break;
            case "insertRecord":
                eventEmitter.emit('insert', params);
                break;
            case "addChatBox":
                eventEmitter.emit('addChat', params);
                break;
            case "createSocket":
                eventEmitter.emit('createSocket', params);
                break;
            case "addUserMsg":
                eventEmitter.emit('addUserMsg', params);
                break;
            case "searchEvent":
                eventEmitter.emit('searchEvent', params);
                break;
             case "callEvent":
                eventEmitter.emit('callEvent', params);
                break;
        }
    },
    removeListener: function(type, callback) {
        switch (type) {
            case "updateEvent":
                eventEmitter.removeListener('update', callback);
                break;
            case "changeEvent":
                eventEmitter.removeListener('update', callback);
                break;
            case "selectEvent":
                eventEmitter.removeListener('select', callback);
                break;
            case "insertRecord":
                eventEmitter.removeListener('insert', callback);
                break;
            case "loginEvent":
                eventEmitter.removeListener('login', callback);
                break;
            case "addChatBox":
                eventEmitter.removeListener('addChat', callback);
                break;
            case "createSocket":
                eventEmitter.removeListener('createSocket', callback);
                break;
            case "addUserMsg":
                eventEmitter.removeListener('addUserMsg', callback);
                break;
            case "searchEvent":
                 eventEmitter.removeListener('searchEvent', callback);
                break;
            case "callEvent":
                 eventEmitter.removeListener('callEvent', callback);
                break;

        }
    },
    sendMessage: function(obj) {
        AppDispatcher.dispatch({
            message: obj.message,
            eventType: 'send_msg',
            toUser: obj.toUser,
            fromUser: obj.fromUser,
            toUserID: obj.toUserId,
            fromUserID: obj.fromUserId,
            callback: this.updateCallBack
        })
    },
    makeServiceCall: function(params) {
        AppDispatcher.dispatch({
            eventType: 'makeCall',
            url: params.url,
            data: params.data,
            type: params.type,
            success: params.success,
            error: params.error
        });
    },
    callUser:function(params) {
        AppDispatcher.dispatch({
            eventType: 'call_user',
            toUser: params.toUser,
            fromUser: params.fromUser,
            callback: this.updateCallBack
        });
    }
}
module.exports = ActionEvents;