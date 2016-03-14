var React = require('react'),
 FormData = require('react-form-data'),
 LinkedStateMixin = require('react-addons-linked-state-mixin'),
self;
var LoginView = React.createClass({displayName: "LoginView",
	mixins: [LinkedStateMixin],
	handleSubmit:function(e){
		e.preventDefault()
		$.ajax({
			url:'/login',
			datatype:'json',
			type:'POST',
			data:{
				username:self.state.username,
				password:self.state.password
			},
			success:function(response){
				 ActionEvents.updateCallBack('changeEvent',response.responseObj);
			},
			error:function(reponse){

			}
		});
	},
	getInitialState :function(){
		self =this;
		ActionEvents = require('./../../js/Actions/ActionEvents');
		return {
			username:null,
			password:null
		}
	},
	render:function(){
		return(
			React.createElement("section", {className: "col-lg-8 col-md-11 col-sm-6  col-lg-offset-1 login-section  login-section"}, 
				React.createElement("div", {className: "col-lg-11 col-md-11 col-sm-6 col-xs-6 col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-2"}, 
					React.createElement("div", {className: "row"}, 
						React.createElement("h1", null, "Login")
					), 
					React.createElement("div", {className: "row"}, 
						React.createElement("form", {method: "post", action: ""}, 
							React.createElement("div", {className: "row form-group"}, 
		  						React.createElement("div", {className: "col-lg-3 col-md-2 col-sm-3 col-xs-8 col-md-offset-1 col-lg-offset-0 col-md-offset-1 col-sm-offset-0 col-xs-offset-4"}, 
		  							React.createElement("label", {for: "userName"}, "User Name:")
		  						), 
		  						React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-7 col-xs-10  col-lg-offset-0 col-md-offset-1 col-sm-offset-0 col-xs-offset-2"}, 
		  							 React.createElement("input", {type: "text", className: "form-control form-label", id: "username", placeholder: "User Name", name: "username", valueLink: this.linkState('username')})
		  						)
		  					), 
		  					React.createElement("div", {className: "row form-group"}, 
		  						React.createElement("div", {className: "col-lg-3 col-md-2 col-sm-3 col-xs-8 col-md-offset-1 col-lg-offset-0 col-md-offset-1 col-sm-offset-0 col-xs-offset-4"}, 
		  							React.createElement("label", {for: "Password"}, "Password:")
		  						), 
		  						React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-7 col-xs-10  col-lg-offset-0 col-md-offset-1 col-sm-offset-0 col-xs-offset-2"}, 
		  							 React.createElement("input", {type: "password", className: "form-control form-label", id: "password", placeholder: "Password", name: "password", valueLink: this.linkState('password')})
		  						)
		  					), 
		  					React.createElement("div", {className: "row form-group"}, 
		  						React.createElement("div", {className: "col-lg-offset-5 col-md-offset-1 col-sm-offset-1 col-xs-offset-1"}, 
		  							React.createElement("button", {type: "submit", className: "btn btn-secondary col-lg-4 col-md-10 col-sm-10 col-xs-10", id: "loginBtn", onClick: this.handleSubmit}, "Login")
		  						)
		  					)
						)
					)
				)
			)
		)
	}
});
module.exports=LoginView