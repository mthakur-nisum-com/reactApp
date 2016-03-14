var React=require('react');
var ReactDom=require('react-dom');
var webRTC = require('../../lib/webrtc'),webrtc;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ShareCallLayoutView=React.createClass({displayName: "ShareCallLayoutView",
	mixins:[LinkedStateMixin],
	getInitialState:function() {
		 return {
		 	callLink:null
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
										React.createElement("div", {className: "col-lg-6 col-md-8 col-sm-12 col-xs-12"}, 
											React.createElement("input", {type: "name", valueLink: this.linkState('callLink'), className: "col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control"})
										)
									), 
									React.createElement("div", {className: "row form-group"}, 
										React.createElement("div", {className: "col-md-5 col-md-6 col-sm-12 col-xs-12"}, 
											React.createElement("label", null, "Continue")
										), 
										React.createElement("div", {className: "col-lg-5 col-md-9 col-sm-12 col-xs-12"}, 
											React.createElement("input", {type: "button", value: "Click", className: "btn btn-primary col-lg-6 col-md-8 col-sm-12 col-xs-12"})
										)
									)
								)
							), 
							React.createElement("div", {className: "row"}, 
								 React.createElement("video", {id: "localVideo", oncontextmenu: "return false;"})
							)
						)
					)
				)
			)
		)
	},
	componentDidMount:function(){
		 var room = location.search && location.search.split('?')[1];
	 	webrtc = new webRTC({
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
                if (room) webrtc.joinRoom(room);
            });
	}
});
module.exports=ShareCallLayoutView;