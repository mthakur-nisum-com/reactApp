var React=require('react'),
	self,
	EmojiPanelView = require('./EmojiPanelView'),
	AttachmentView = require('./AttachmentView'),
	MailView = require('./MailView');
var PanelView =React.createClass({
	handleClick:function(e){
		e.preventDefault();
		var tabType=e.target.parentElement.getAttribute('data-tab-type')
		switch	(tabType) {
			case "file-tab":
			  self.setState({currentView:<AttachmentView data={self.props.data} parent={self.props.parent}/>});
			  break;
			case "mail-tab":
			  self.setState({currentView:<MailView userName={self.props.userName}/>});
			  break;
			default:
			  self.setState({currentView:<EmojiPanelView data={self.props.data} parent={self.props.parent}/>});
			  break;
		}
	},
	getInitialState:function(){
		self=this;
		return {
			currentView:<EmojiPanelView data={self.props.data}/>
		}
	},
	render:function(){
		return(
			<div className="row">
				<div className="col-lg-12">
					<ul className="nav nav-tabs" onClick={this.handleClick}>
						<li role="presentation" refs="smileyPanel"  className="tabs \" data-tab-type="smiley-tab"><a href="#" className="fa fa-smile-o">&#x263A;</a></li>
						<li role="presentation" refs="attachementPanel"  data-tab-type="file-tab"><a href="#" className="glyphicon glyphicon-paperclip"></a></li>
						<li role="presentation" refs="mailPanel"  data-tab-type="mail-tab"><a href="#" className="glyphicon glyphicon-envelope"></a></li>
					</ul>
				</div>
				<div className="col-lg-12 col-md-12 col-sm-12">
					<div className="row panel-content">
						<div className="col-lg-12">
							{this.state.currentView}
						</div>
					</div>
				</div>
			</div>
		)
	}
	
});
module.exports =PanelView;