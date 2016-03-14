var React=require('react');
var contentView = React.createClass({displayName: "contentView",
	handleClick:function(){
		React.unmountComponentAtNode(document.getElementById('chat-box-sec'));
	},
	handleMiniMizeClick:function(e) {
		console.log(e.currentTarget.parentNode.parentNode)
		$('#chatBox').slideUp();
	},
	handleSentEvent:function(e) {
		e.preventDefault();
		console.log(e.keyCode);
	},
	render:function(){
		return(
			React.createElement("section", {className: "row content-section"}, 
				React.createElement("div", {className: "col-lg-9 col-md-9 col-sm-6 col-xs-6 col-lg-offset-1 col-md-offset-1 col-sm-offset-2 col-xs-offset-2", id: "display-section"}
					
				)

			)
		)
	}
});
module.exports=contentView;