var React=require('react'),self,keyListArray=[];
var NotificationLayoutView=React.createClass({displayName: "NotificationLayoutView",
	handleKeyEvent:function(e){
		self.state.keyListArray.forEach(function(value,index){
			console.log(value+""+e.keyCode);
		})
	},
	getInitialState:function(){
		keyListArray
		self=this;
		return{
			keyListArray:[8,9,16,17,18,19,20,27,33,34,35,36,44,45,46,48,49,50,51,52,53,54,55,56,57,91,93,112,113,114,115,116,117,118,119,120,121,122,123,144,145188,190,191,192,219,220,221,222]
		};
	},
	render:function(){
		return(
			React.createElement("div", {className: "col-lg-12 col-md-12 col-sm-12 col-xs-12"}, 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-lg-12 col-md-12 col-sm-12 col-xs-12"}, 
						React.createElement("form", {id: "notificationForm", method: "POST"}, 
							React.createElement("div", {className: "row form-group"}, 
								React.createElement("div", {className: "col-lg-6 col-sm-6 col-md-6 col-xs-6"}, 
									React.createElement("label", null, "Enter names to send a notifcations")
								), 
								React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-6 col-xs-6"}, 
									React.createElement("input", {type: "text", name: "searchText", className: "form-control", onKeyDown: this.handleKeyEvent})
								)
							), 
							React.createElement("div", {className: "row form-group"}, 
								React.createElement("div", {className: "col-lg-6 col-sm-6 col-md-6 col-xs-6"}, 
									React.createElement("label", null, "Message")
								), 
								React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-6 col-xs-6"}, 
									React.createElement("textarea", {name: "userMsg", className: "form-control"})
								)
							)
						)
					)
				)
			)
		)
	}
});
module.exports=NotificationLayoutView;