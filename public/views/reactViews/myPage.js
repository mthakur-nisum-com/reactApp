var React=require('react');
var homeComponent = React.createClass({
	handleClick:function(e) {
		e.preventDefault();
		var reqType=e.target.getAttribute('data-attr-val');
		$('.tabs-sec').removeClass('active');
		$(e.target).parent().addClass('active')
		switch(reqType) {
			case "chat":
				var ChatLayoutView = require('./chatLayoutView');
				React.render(<ChatLayoutView/>,document.getElementById('options-sec'));
				return;
			case "shareCall":
				var Sharelayout = require('.//shareCallLayoutView');
				React.render(<Sharelayout/>,document.getElementById('options-sec'));
				return;
			case "notify":
				var Notfiylayout = require('./notificationLayoutView');
				React.render(<Notfiylayout/>,document.getElementById('options-sec'));
				return;
		}

	},
	render:function(){
		return(
			<div classNameName="row my-account-container">
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<nav className="navbar navbar-inverse">
				      <div className="container-fluid">
				        <div className="navbar-header">
				          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-9" aria-expanded="false">
				            <span className="sr-only">Toggle navigation</span>
				            <span className="icon-bar"></span>
				            <span className="icon-bar"></span>
				            <span className="icon-bar"></span>
				          </button>
				          <a className="navbar-brand" href="#">Menu</a>
				        </div>
				        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-9">
				          <ul className="nav navbar-nav" onClick={this.handleClick}>
				            <li className="active tabs-sec"><a href="#" data-attr-val="chat">Chat</a></li>
				            <li className="tabs-sec"><a href="#" data-attr-val="shareCall">Share & Call</a></li>
				            <li className="tabs-sec"><a href="#" data-attr-val="notify">Notifications</a></li>
				          </ul>
				        </div>
				      </div>
				    </nav>
				    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				    	<div id="options-sec">

				    	</div>
				    </div>
			    </div>
			</div>
		)
	}
});
module.exports=homeComponent;