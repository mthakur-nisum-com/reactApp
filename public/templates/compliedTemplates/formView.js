var React =require('React');
var LinkedStateMixin = require('react-addons-linked-state-mixin'),ActionEvents = require('./../../js/Actions/ActionEvents');;
var self; 
var Comp =React.createClass({displayName: "Comp",
	mixins:[LinkedStateMixin],
	handleSubmit:function(e){
		e.preventDefault();
		$.ajax({
			url:'/register',
			datatype:'json',
			type:'POST',
			data:this.state,
			success:function(response){
				var responseObject=Object.keys(response);
				responseObject=response[responseObject[0]];
				if(responseObject.isNewUser) {
					ActionEvents.updateCallBack('changeEvent',responseObject);
					
				}
				if(responseObject.message) {

				}

			},
			error:function(reponse){

			}
		});
	},
	getInitialState:function(){
		self=this;
		/*var params={
					url:'/getUserDetails',
					type:'POST',
					data:{
						"userEmail":localStorage.userEmail
					},
					success:function(response){
						self.setState({
							firstName:response.resultObj.firstName,
							lastName:response.resultObj.lastName,
							email:response.resultObj.userEmail,
							confirmEmail:response.resultObj.userEmail,
							password:response.resultObj.password,
							confirmPassword:response.resultObj.password
						})
					},
					error:function(){
						console.log('error')
					}
				};
				ActionEvents.makeServiceCall(params);*/
		return {
			firstName:null,
			lastName:null,
			email:null,
			confirmEmail:null,
			password:null,
			confirmPassword:null
		}
	},
	render:function(){
		return(
			React.createElement("div", {className: "row"}, 
		  	React.createElement("div", {className: "col-md-offset-1 col-lg-offset-0 col-sm-offset-2 col-sm-8 col-xs-offset-1 col-lg-12 col-xs-8 col-md-12"}, 
		  		React.createElement("div", {id: "main-container"}, 
	  				React.createElement("form", {method: "post", action: "", enctype: "multipart/form-data"}, 
	  					React.createElement("div", {className: "row heading-sec col-lg-offset-0 col-md-offset-0 col-sm-offset-0 col-xs-offset-0"}, 
	  						React.createElement("h1", null, this.props.data)
	  					), 
	  					React.createElement("div", {className: "row form-group"}, 
	  						React.createElement("div", {className: "col-lg-3 col-md-3 col-sm-6 col-xs-8 col-md-offset-1 col-lg-offset-0 col-md-offset-1 col-sm-offset-0 col-xs-offset-4"}, 
	  							React.createElement("label", {for: "firstName"}, "First Name:")
	  						), 
	  						React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-8 col-xs-8 col-md-offset-0 col-lg-offset-0 col-md-offset-1 col-sm-offset-0 col-xs-offset-4"}, 
	  							 React.createElement("input", {type: "text", className: "form-control form-label", id: "firstName", placeholder: "First Name", name: "firstName", valueLink: this.linkState('firstName')})
	  						)
	  					), 
	  					React.createElement("div", {className: "row form-group"}, 
	  						React.createElement("div", {className: "col-lg-3 col-md-3 col-sm-6 col-xs-8 col-md-offset-1 col-lg-offset-0 col-md-offset-1 col-sm-offset-0 col-xs-offset-4"}, 
	  							React.createElement("label", {for: "lastName"}, "Last Name:")
	  						), 
	  						React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-8 col-xs-8 col-md-offset-0 col-lg-offset-0 col-md-offset-1 col-sm-offset-0 col-xs-offset-4"}, 
	  							 React.createElement("input", {type: "text", className: "form-control form-label", id: "lastName", placeholder: "Last Name", name: "lastName", valueLink: this.linkState('lastName')})
	  						)
	  					), 
	  					React.createElement("div", {className: "row form-group"}, 
	  						React.createElement("div", {className: "col-lg-3 col-md-3 col-sm-6 col-xs-8 col-md-offset-1 col-lg-offset-0 col-md-offset-1 col-sm-offset-0 col-xs-offset-4"}, 
	  							React.createElement("label", {for: "email"}, "Email:")
	  						), 
	  						React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-8 col-xs-8 col-md-offset-0 col-lg-offset-0 col-md-offset-1 col-sm-offset-0 col-xs-offset-4"}, 
	  							 React.createElement("input", {type: "text", className: "form-control form-label", id: "email", placeholder: "Email Address", name: "email", valueLink: this.linkState('email')})
	  						)
	  					), 
	  					React.createElement("div", {className: "row form-group"}, 
	  						React.createElement("div", {className: "col-lg-3 col-md-3 col-sm-6 col-xs-8 col-md-offset-1 col-lg-offset-0 col-md-offset-1 col-sm-offset-0 col-xs-offset-4"}, 
	  							React.createElement("label", {for: "confirmEmail"}, "Verify Email:")
	  						), 
	  						React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-8 col-xs-8 col-md-offset-0 col-lg-offset-0 col-md-offset-1 col-sm-offset-0 col-xs-offset-4"}, 
	  							 React.createElement("input", {type: "text", className: "form-control form-label", id: "confirmEmail", placeholder: "Verify Email", name: "confirmEmail", valueLink: this.linkState('confirmEmail')})
	  						)
	  					), 
	  					React.createElement("div", {className: "row form-group"}, 
	  						React.createElement("div", {className: "col-lg-3 col-md-3 col-sm-6 col-xs-8 col-md-offset-1 col-lg-offset-0 col-md-offset-1 col-sm-offset-0 col-xs-offset-4"}, 
	  							React.createElement("label", {for: "password"}, "Password:")
	  						), 
	  						React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-8 col-xs-8 col-md-offset-0 col-lg-offset-0 col-md-offset-1 col-sm-offset-0 col-xs-offset-4"}, 
	  							 React.createElement("input", {type: "password", className: "form-control form-label", id: "password", placeholder: "Password", name: "password", valueLink: this.linkState('password')})
	  						)
	  					), 
	  					React.createElement("div", {className: "row form-group"}, 
	  						React.createElement("div", {className: "col-lg-3 col-md-3 col-sm-6 col-xs-8 col-md-offset-1 col-lg-offset-0 col-md-offset-1 col-sm-offset-0 col-xs-offset-4"}, 
	  							React.createElement("label", {for: "confirmPassword", className: "form-text"}, "Confirm Password:")
	  						), 
	  						React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-8 col-xs-8 col-md-offset-0 col-lg-offset-0 col-md-offset-1 col-sm-offset-0 col-xs-offset-4"}, 
	  							 React.createElement("input", {type: "password", className: "form-control form-label", id: "confirmPassword", placeholder: "Confirm Password", name: "confirmPassword", valueLink: this.linkState('confirmPassword')})
	  						)
	  					), 
	  					
	  					React.createElement("div", {className: "row form-group"}, 
	  						React.createElement("div", {className: "col-lg-5 col-md-5 col-sm-3 col-xs-7 col-lg-offset-5 col-md-offset-6 col-sm-offset-5 col-xs-offset-5"}, 
	  							React.createElement("button", {id: "profileProcess", className: "btn btn-primary col-lg-4 col-md-10 col-sm-10 col-xs-10", onClick: this.handleSubmit}, "Contine")
	  						)
	  					)
	  				)
		  		)
		  )
		 
		)
		)
	}
});
module.exports = Comp;
