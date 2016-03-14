var React=require('react');
var ReactDom=require('react-dom');
var MailView = React.createClass({displayName: "MailView",
	render:function(){
		return (
			React.createElement("div", {className: "row email-panel"}, 
				React.createElement("div", {className: "col-lg-12"}, 
					React.createElement("div", {className: "row form-group"}, 
						React.createElement("div", {className: "col-lg-6"}, 
							React.createElement("label", null, "From:")
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
						React.createElement("div", {className: "col-lg-12"}, 
							React.createElement("label", null, "Message:")
						), 
						React.createElement("div", {className: "col-lg-6"}, 
							React.createElement(TextArea, {name: "emailMessage"})
						)
					), 
					React.createElement("div", {className: "row form-group"}, 
						React.createElement("div", {className: "col-lg-12"}, 
							React.createElement("input", {type: "button", className: "btn btn-primary col-lg-4"})
						), 
						React.createElement("div", {className: "col-lg-12"}, 
							React.createElement("textarea", {name: "emailMessage", id: "emailMessage"})
						)
					)
				)
			)
		)
	}
});
module.exports=MailView;