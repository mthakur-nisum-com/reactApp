var React=require('react');
var NotificationLayoutView=React.createClass({displayName: "NotificationLayoutView",
	render:function(){
		return(
			React.createElement("div", {className: "col-lg-12 col-md-12 col-sm-12 col-xs-12"}, 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-lg-12 col-md-12 col-sm-12 col-xs-12"}, 
						React.createElement("form", {id: "notificationForm", method: "POST"}, 
							React.createElement("div", {className: "row"}, 
								React.createElement("div", {className: "col-lg-6 col-sm-6 col-md-6 col-xs-6"}, 
									React.createElement("label", null, "Enter names to send a notifcations")
								), 
								React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-6 col-xs-6"}, 
									React.createElement("input", {type: "text", name: "searchText", className: "form-control"})
								)
							), 
							React.createElement("div", {className: "row"}
							)
						)
					)
				)
			)
		)
	}
});
module.exports=NotificationLayoutView;