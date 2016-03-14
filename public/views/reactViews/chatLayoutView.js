var React=require('react');
var UserListView = require('./UserListView');
var SocketLib = require('./../../lib/CustomSocketLib'); 
var data,self=this,ActionEvents = require('./../../js/Actions/ActionEvents');
var ChatLayoutView=React.createClass({
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
					self.setState({userList:resultObj})
				}
				else {
					self.setState({userList:<div>please try again</div>})
				}
				
				
			},
			error:function(){
				self.setState({userList:<div>please try again</div>})
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
			userList:[<div>fetching users......</div>],
			userChatList:[]
		}
	},
	render:function(){
		return(
			<div className="row chat-container">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="row">
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
								<div className="row">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<UserListView data={this.state.userList} parent={self}/>
											<div id="chat_div">
											</div>
									</div>
								</div>
						</div>
						<div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
							<ul id="chat-box-list">
								{this.state.userChatList}
							</ul>
						</div>
					</div>	
				</div>
			</div>
		)
	}
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
	},*/
	
});
module.exports=ChatLayoutView;