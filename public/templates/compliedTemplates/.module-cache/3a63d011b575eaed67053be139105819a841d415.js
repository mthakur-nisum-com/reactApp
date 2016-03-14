var React=require('react');
var ReactDom=require('react-dom');
var WebRTC = require('../../lib/simplewebrtc'),webrtc;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ActionEvents = require('./../../js/Actions/ActionEvents');
var ShareCallLayoutView=React.createClass({displayName: "ShareCallLayoutView",
	mixins:[LinkedStateMixin],
	handleClick:function() {

	},
	findUser:function(e){
		var exp =new RegExp('[A-z]');
		if(exp.test( String.fromCharCode(e.which) )) {
			$.ajax({
				url:"/searchUser",
				dataType:'json',
				type:'POST',
				data:{
					"searchText":$('#userKey').val()
				},
				success:function(response){
					if(response.userObj.length) {
						self.setState({userList:response.userObj})
						$('.search-key-list').removeClass('hide');
					}
				},
				error:function(){}
			});

		}
	},
	addUser:function(e){
		self.setState({callLink:e.target.innerHTML});
		self.setState({targetUser:e.target.nextElementSibling.value});
		$('.search-key-list').addClass('hide');
	},
	handleCallEvent:function(obj){

	},
	getInitialState:function() {
		ActionEvents.removeListener('callEvent', self.handleCallEvent);
		self=this;
		 return {
		 	callLink:null,
		 	userList:[],
		 	targetUser:null,
		 	callingUser:null
		 }
	},
	render:function(){
		return(
			React.createElement("div", {className: "col-lg-12 col-md-12 col-sm-12 col-xs-12"}, 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {id: "call-main-container"}, 
						React.createElement("div", {className: "col-lg-9 col-md-9 col-sm-6 col-lg-offset-1 col-md-offset-1 col-sm-offset-1"}, 
							React.createElement("div", {className: "row"}, 
								React.createElement("form", null, 
									React.createElement("div", {className: "row form-group"}, 
										React.createElement("div", {className: "col-lg-5 col-md-6 col-sm-12 col-xs-12"}, 
											React.createElement("label", null, "Do you  want to have video call")
										), 
										React.createElement("div", {className: "col-lg-6 col-md-8 col-sm-12 col-xs-12 usr-search-list"}, 
											React.createElement("input", {type: "name", id: "userKey", valueLink: this.linkState('callLink'), className: "col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control", onKeyUp: this.findUser}), 
											React.createElement("input", {type: "hidden", value: this.state.callingUser, id: "targetUser"}), 
											React.createElement("ul", {className: "col-lg-11 padding-none search-key-list hide", onClick: this.addUser}, 
											 this.state.userList.map(function(obj,key){
												 return React.createElement("li", {key: key}, React.createElement("span", null, obj.userName), React.createElement("input", {type: "hidden", value: obj.chatName}))
											})
										)
										)
									), 
									React.createElement("div", {className: "row form-group"}, 
										React.createElement("div", {className: "col-md-5 col-md-6 col-sm-12 col-xs-12"}, 
											React.createElement("label", null, "Continue")
										), 
										React.createElement("div", {className: "col-lg-5 col-md-9 col-sm-12 col-xs-12"}, 
											React.createElement("input", {type: "button", value: "Click", className: "btn btn-primary col-lg-6 col-md-8 col-sm-12 col-xs-12", onClick: this.handleClick})
										)
									)
								)
							), 
							React.createElement("div", {className: "row"}, 
								 React.createElement("video", {id: "localVideo", oncontextmenu: "return false;"}), 
								  React.createElement("div", {id: "localVolume", className: "volume_bar"})
							)
						)
					)
				)
			)
		)
	},
	componentDidMount:function(){
		 /*var room = location.search && location.search.split('?')[1];
	 	webrtc = new WebRTC({
            // the id/element dom element that will hold "our" video
            localVideoEl: 'localVideo',
            // the id/element dom element that will hold remote videos
            remoteVideosEl: '',
            // immediately ask for camera access
            autoRequestMedia: true,
            debug: false,
            detectSpeakingEvents: true,
            autoAdjustMic: false
        });
        webrtc.on('readyToCall', function () {
            // you can name it anything
            webrtc.joinRoom(room);
        });*/
	}
});
module.exports=ShareCallLayoutView;