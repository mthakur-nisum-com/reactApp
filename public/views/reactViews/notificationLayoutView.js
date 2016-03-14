var React=require('react'),self,keyListArray=[];
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var addedUser=false,searchingKey="";
var NotificationLayoutView=React.createClass({
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
						searchingKey='';
					}
				},
				error:function(){}
			});

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
		self.setState({toUserList:(self.state.toUserList)?+self.state.toUserList+e.target.nextElementSibling.getAttribute('value')+",":e.target.nextElementSibling.getAttribute('value')+","});
		$('.search-key-list').addClass('hide');
	},
	render:function(){
		return(
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="row notification-container">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<form id="notificationForm" method="POST" autocomplete="on">
							<div className="row form-group">
								<div className="col-lg-6 col-sm-6 col-md-6 col-xs-6">
									<label>Enter names to send a notifcations</label>
								</div>
								<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 search-list">
									<input type="text" id="userKey" name="searchText" className="form-control" onKeyUp={this.handleKeyEvent} valueLink={this.linkState('userKey')}/>
									<input type="hidden" name="userList" valueLink={this.linkState('toUserList')}/>
									<ul className="col-lg-11 padding-none search-key-list hide" onClick={this.handleClick}>
										 {this.state.userList.map(function(obj,key){
											 return <li key={key}><span>{obj.userName}</span><input type="hidden" value={obj.chatName}/></li>
										})}
									</ul>
								</div>
							</div>
							<div className="row form-group">
								<div className="col-lg-6 col-sm-6 col-md-6 col-xs-6">
									<label>Message</label>
								</div>
								<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
									<textarea name="userMsg" className="form-control" valueLink={this.linkState('userMsg')}></textarea>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
});
module.exports=NotificationLayoutView;