var React=require('react');
var ReactDom=require('react-dom');
var WebRTC = require('../../lib/simplewebrtc'),webrtc;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ActionEvents = require('./../../js/Actions/ActionEvents');
var ShareCallLayoutView=React.createClass({
	mixins:[LinkedStateMixin],
	handleClick:function() {
		ActionEvents.callUser({
			toUser:self.state.targetUser,
			fromUser:localStorage.chatName
		})
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
		console.log(obj);
	},
	getInitialState:function() {
		self=this;
		ActionEvents.removeListener('callEvent', self.handleCallEvent);
		ActionEvents.addListeners('callEvent', self.handleCallEvent);
		 return {
		 	callLink:null,
		 	userList:[],
		 	targetUser:null,
		 	callingUser:null
		 }
	},
	render:function(){
		return(
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="row">
					<div id="call-main-container">
						<div className="col-lg-9 col-md-9 col-sm-6 col-lg-offset-1 col-md-offset-1 col-sm-offset-1">
							<div className="row">
								<form>
									<div className="row form-group">
										<div className="col-lg-5 col-md-6 col-sm-12 col-xs-12">
											<label>Do you  want to have video call</label>
										</div>
										<div className="col-lg-6 col-md-8 col-sm-12 col-xs-12 usr-search-list">
											<input type="name" id="userKey" valueLink={this.linkState('callLink')} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control" onKeyUp={this.findUser}/>
											<input type="hidden" value={this.state.callingUser} id="targetUser"/>
											<ul className="col-lg-11 padding-none search-key-list hide" onClick={this.addUser}>
											 {this.state.userList.map(function(obj,key){
												 return <li key={key}><span>{obj.userName}</span><input type="hidden" value={obj.chatName}/></li>
											})}
										</ul>
										</div>
									</div>
									<div className="row form-group">
										<div className="col-md-5 col-md-6 col-sm-12 col-xs-12">
											<label>Continue</label>
										</div>
										<div className="col-lg-5 col-md-9 col-sm-12 col-xs-12">
											<input type="button" value="Click" className="btn btn-primary col-lg-6 col-md-8 col-sm-12 col-xs-12" onClick={this.handleClick}/>
										</div>
									</div>
								</form>
							</div>
							<div className="row">
								 <video id="localVideo" oncontextmenu="return false;"></video>
								  <div id="localVolume" className="volume_bar"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
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