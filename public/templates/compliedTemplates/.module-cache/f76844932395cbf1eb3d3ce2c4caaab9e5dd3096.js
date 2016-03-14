var React=require('react');
var homeComponent = React.createClass({displayName: "homeComponent",
	handleClick:function(e) {
		e.preventDefault();
		var reqType=e.target.getAttribute('data-attr-val');
		$('.tabs-sec').removeClass('active');
		$(e.target).parent().addClass('active')
		switch(reqType) {
			case "chat":
				var ChatLayoutView = require('./chatLayoutView');
				React.render(React.createElement(ChatLayoutView, null),document.getElementById('options-sec'));
				return;
			case "shareCall":
				var Sharelayout = require('.//shareCallLayoutView');
				React.render(React.createElement(Sharelayout, null),document.getElementById('options-sec'));
				return;
			case "notify":
				var Notfiylayout = require('./notificationLayoutView');
				React.render(React.createElement(Notfiylayout, null),document.getElementById('options-sec'));
				return;
		}

	},
	render:function(){
		return(
			React.createElement("div", {classNameName: "row my-account-container"}, 
			  React.createElement("div", {className: "col-lg-12 col-md-12 col-sm-12 col-xs-12"}, 
					React.createElement("nav", {className: "navbar navbar-inverse"}, 
				      React.createElement("div", {className: "container-fluid"}, 
				        React.createElement("div", {className: "navbar-header"}, 
				          React.createElement("button", {type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-9", "aria-expanded": "false"}, 
				            React.createElement("span", {className: "sr-only"}, "Toggle navigation"), 
				            React.createElement("span", {className: "icon-bar"}), 
				            React.createElement("span", {className: "icon-bar"}), 
				            React.createElement("span", {className: "icon-bar"})
				          ), 
				          React.createElement("a", {className: "navbar-brand", href: "#"}, "Menu")
				        ), 
				        React.createElement("div", {className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-9"}, 
				          React.createElement("ul", {className: "nav navbar-nav", onClick: this.handleClick}, 
				            React.createElement("li", {className: "active tabs-sec"}, React.createElement("a", {href: "#", "data-attr-val": "chat"}, "Chat")), 
				            React.createElement("li", {className: "tabs-sec"}, React.createElement("a", {href: "#", "data-attr-val": "shareCall"}, "Share & Call")), 
				            React.createElement("li", {className: "tabs-sec"}, React.createElement("a", {href: "#", "data-attr-val": "notify"}, "Notifications"))
				          )
				        )
				      )
				    ), 
				    React.createElement("div", {className: "col-lg-12 col-md-12 col-sm-12 col-xs-12"}, 
				    	React.createElement("div", {id: "options-sec"}

				    	)
				    )
			    )
			)
		)
	}
});
module.exports=homeComponent;