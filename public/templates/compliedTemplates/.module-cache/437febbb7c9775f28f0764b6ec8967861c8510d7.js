var React=require('react');
var UserListView = require('./UserListView');
var SocketLib = require('./../../lib/CustomSocketLib'); 
var data,self=this,ActionEvents = require('./../../js/Actions/ActionEvents');
var ChatLayoutView=React.createClass({displayName: "ChatLayoutView",
	getUserList:function(){
		self=this;
		$.ajax({
			url:'/getUserList',
			datatype:'json',
			type:'POST',
			data:'',
			success:function(response){
				if(response.responseObj !== null) {
					var result=[],resultObj=Object.keys(response),resultObj=response[resultObj[0]];
					self.setState({userList:resultObj.userList})
				}
				else {
					self.setState({userList:React.createElement("div", null, "please try again")})
				}
				
				
			},
			error:function(){
				self.setState({userList:React.createElement("div", null, "please try again")})
			}
		});
		console.log(localStorage);
		SocketLib.createSocket();
		ActionEvents.updateCallBack('createSocket');
	},
	updateChatLayout:function(){
		console.log('hello')
	},
	componentWillMount:function(){
		localStorage.addEventListener=false;
		self=this;
		self.getUserList();
	},
	 getInitialState:function(){
	 	self=this;
		return {
			data:null,
			userList:[React.createElement("div", null, "fetching users......")],
			userChatList:[]
		}
	},
	/*componentDidMount:function(){
		console.log(UserListView)
	},
	componentWillReceiveProps:function(){
		
		console.log('componentWillReceiveProps')
	},
	componentDidUpdate:function(){
		console.log('componentDidUpdate')
	},
	componentWillUnmount:function(){
		console.log('componentWillUnmount')
	},
	componentWillUpdate:function(){
		console.log('componentWillUpdate');
	},
	shouldComponentUpdate:function(){
		return true;
	},
	,*/
	render:function(){
		return(
			React.createElement("div", {className: "row chat-container"}, 
				React.createElement("div", {className: "col-lg-12 col-md-12 col-sm-12 col-xs-12"}, 
					React.createElement("div", {className: "row"}, 
						React.createElement("div", {className: "col-lg-3 col-md-3 col-sm-3 col-xs-3"}, 
								React.createElement("div", {className: "row"}, 
									React.createElement("div", {className: "col-lg-12 col-md-12 col-sm-12 col-xs-12"}
										
									), 
									React.createElement("div", {className: "col-lg-12 col-md-12 col-sm-12 col-xs-12"}, 
											React.createElement(UserListView, {data: this.state.userList, parent: self}), 
											React.createElement("div", {id: "chat_div"}
											)
									)
								)
						), 
						React.createElement("div", {className: "col-lg-9 col-md-9 col-sm-9 col-xs-9"}, 
							React.createElement("ul", {id: "chat-box-list"}, 
								this.state.userChatList
							)
						)
					)	
				)
			)
		)
	}
});
module.exports=ChatLayoutView;