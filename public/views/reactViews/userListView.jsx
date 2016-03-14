var React=require('react');
var ChatBoxLayoutView=require('./../templates/ChatBoxLayoutView');
var chatLayoutView=require('./../templates/chatLayoutView');
var userStrategy =  sessionStorage;
var UserListView=React.createClass({
	handleClick:function(e){
		var options={
			id:e.currentTarget.getAttribute('data-attr-name'),
			from:localStorage.userEmail,
			title:e.currentTarget.innerHTML,
			offset: 0,
		};
		if(e.currentTarget.getAttribute('data-attr-isopened')==="true"){
			var chatList=this.props.parent.state.userChatList;
			if(chatList.length === 0){
				chatList[chatList.length] = <ChatBoxLayoutView data={options} key={chatList.length}/>;
			}
			else {
				chatList[chatList.length]=<ChatBoxLayoutView data={options}/>;
			}
			this.props.parent.setState({chatList:chatList});
			e.currentTarget.setAttribute('data-attr-isopened',"false")	
		}

		
	},
	render:function(){
		return(
			<li className={this.props.data.status ? "user-online":"user-offline"} onClick={this.handleClick} data-attr-name={this.props.data.email} id={this.props.data.chatName}data-user-status={this.props.data.status} data-attr-isopened="true
			">{this.props.data.userName}</li>
		)
	}
});
module.exports=UserListView;