var React=require('react');
var NotificationLayoutView=React.createClass({displayName: "NotificationLayoutView",
	render:function(){
		return(
			React.createElement("div", {className: "collg-12 col-md-12 col-sm-12 col-xs-12"}, 
					React.createElement("div", {className: "row"}
					)
			)
		)
	}
});
module.exports=NotificationLayoutView;