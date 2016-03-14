var React=require('react');
var ReactDom=require('react-dom');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var MailView = React.createClass({displayName: "MailView",
	mixins:[LinkedStateMixin],
	render:function(){
		return (
			React.createElement("div", {className: "row email-panel"}, 
				React.createElement("div", {className: "col-lg-12"}, 
					React.createElement("div", {className: "row form-group"}, 
						React.createElement("div", {className: "col-lg-6"}, 
							React.createElement("label", null, "To:")
						), 
						React.createElement("div", {className: "col-lg-6"}, 
							React.createElement("input", {type: "email", value: "", name: "userEmail", id: "userEmail"})
						)
					), 
					React.createElement("div", {className: "row form-group"}, 
						React.createElement("div", {className: "col-lg-6"}, 
							React.createElement("label", null, "Subject:")
						), 
						React.createElement("div", {className: "col-lg-6"}, 
							React.createElement("input", {type: "text", value: "", name: "emailSub", id: "emailSub"})
						)
					), 
					React.createElement("div", {className: "row form-group"}, 
						React.createElement("div", {className: "col-lg-6"}, 
							React.createElement("label", null, "Message:")
						), 
						React.createElement("div", {className: "col-lg-6"}, 
							React.createElement("textarea", {name: "emailMessage", id: "emailMessage"})
						)
					), 
					React.createElement("div", {className: "row form-group"}, 
						React.createElement("div", {className: "col-lg-12"}, 
							React.createElement("input", {type: "button", className: "btn btn-primary col-lg-4", value: "send"})
						)
					)
				)
			)
		)
	}
});
module.exports=MailView;