var React=require('react'),self,keyListArray=[];
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var addedUser=false,searchingKey;
var NotificationLayoutView=React.createClass({displayName: "NotificationLayoutView",
	mixins:[LinkedStateMixin],
	isValidKey:function(keyList,keyCode){
		var keyFound=false;
		console.log(keyCode)
		for(var i in keyList) {
        	if (keyList[i] === keyCode) 
        		keyFound=true;
    	}
    	return keyFound;
	},
	handleKeyEvent:function(e){
		if(!self.isValidKey(self.state.keyListArray,e.keyCode) && $('#userKey').val().length ) {
			searchingKey += String.fromCharCode(e.which);
			$.ajax({
				url:"/searchUser",
				dataType:'json',
				type:'POST',
				data:{
					"searchText":searchingKey
				},
				success:function(response){
					if(response.userObj.length) {
						self.setState({userList:response.userObj})
						$('.search-key-list').removeClass('hide');
					}
				},
				error:function(){}
			})
		}
	},
	getInitialState:function(){
		keyListArray
		self=this;
		return{
			keyListArray:[9,16,17,18,19,20,27,33,34,35,36,44,45,46,47,48,49,50,51,52,53,54,55,56,57,91,93,96,97,98,99,100,101,102,103,104,105,106,107,109,111,112,113,114,115,116,117,118,119,120,121,122,123,144,145,188,190,191,192,219,220,221,222],
			userKey:null,
			userMsg:null,
			userList:[],
			toUserList:null
		};
	},
	handleClick:function(e){
		self.setState({userKey:e.target.innerHTML+","})
		self.setState({toUserList:e.target.nextElementSibling.getAttribute('value')+","});
		$('.search-key-list').addClass('hide');
	},
	render:function(){
		return(
			React.createElement("div", {className: "col-lg-12 col-md-12 col-sm-12 col-xs-12"}, 
				React.createElement("div", {className: "row notification-container"}, 
					React.createElement("div", {className: "col-lg-12 col-md-12 col-sm-12 col-xs-12"}, 
						React.createElement("form", {id: "notificationForm", method: "POST", autocomplete: "on"}, 
							React.createElement("div", {className: "row form-group"}, 
								React.createElement("div", {className: "col-lg-6 col-sm-6 col-md-6 col-xs-6"}, 
									React.createElement("label", null, "Enter names to send a notifcations")
								), 
								React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-6 col-xs-6 search-list"}, 
									React.createElement("input", {type: "text", id: "userKey", name: "searchText", className: "form-control", onKeyUp: this.handleKeyEvent, valueLink: this.linkState('userKey')}), 
									React.createElement("input", {type: "hidden", name: "userList", valueLink: this.linkState('toUserList')}), 
									React.createElement("ul", {className: "col-lg-11 padding-none search-key-list hide", onClick: this.handleClick}, 
										 this.state.userList.map(function(obj,key){
											 return React.createElement("li", {key: key}, React.createElement("span", null, obj.userName), React.createElement("input", {type: "hidden", value: obj.chatName}))
										})
									)
								)
							), 
							React.createElement("div", {className: "row form-group"}, 
								React.createElement("div", {className: "col-lg-6 col-sm-6 col-md-6 col-xs-6"}, 
									React.createElement("label", null, "Message")
								), 
								React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-6 col-xs-6"}, 
									React.createElement("textarea", {name: "userMsg", className: "form-control", valueLink: this.linkState('userMsg')})
								)
							)
						)
					)
				)
			)
		)
	}
});
module.exports=NotificationLayoutView;