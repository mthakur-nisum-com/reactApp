var React =require('React');
var HeaderSection = require('./headerView');
var ContentSection = require('./contentView');
var ChatEventStore=require("../../js/Stores/ChatEventStore");
var mainView = React.createClass({
	render:function(){
		return(
			<div className="row">
				<HeaderSection/>
				<ContentSection/>
			</div>
		)
	}
});
module.exports = mainView