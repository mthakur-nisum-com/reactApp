var React=require('react');
var ReactDom=require('react-dom');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var MailView = React.createClass({
	mixins:[LinkedStateMixin],
	getInitialState:function(){
		self=this;
		return {
			toEmail:null,
			emailSubject:null,
			emailBody:null,
			fromUser:self.props.userName
		}
	},
	handleClick:function() {
		console.log(self)
		$.ajax({
			url:'/sendEmail',
			datatype:'json',
			type:'POST',
			data:self.state,
			success:function(response){
				//var responseObject=Object.keys(response);
				/*responseObject=response[responseObject[0]];
				if(responseObject.isNewUser) {
					//ActionEvents.updateCallBack('changeEvent',responseObject);
					
				}
				if(responseObject.message) {

				}*/
				console.log(response);
			},
			error:function(reponse){

			}
		});
	},
	render:function(){
		return (
			<div className="row email-panel">
				<form method="post" action="" enctype="multipart/form-data"> 
					<div className="col-lg-12">
						<div className="row form-group">
							<div className="col-lg-6">
								<label>To:</label>
							</div>
							<div className="col-lg-6">
								<input type="email" valueLink={this.linkState('toEmail')} name="userEmail" id="userEmail"/>
							</div>
						</div>
						<div className="row form-group">
							<div className="col-lg-6">
								<label>Subject:</label>
							</div>
							<div className="col-lg-6">
								<input type="text" valueLink={this.linkState('emailSubject')} name="emailSub" id="emailSub"/>
							</div>
						</div>
						<div className="row form-group">
							<div className="col-lg-6">
								<label>Message:</label>
							</div>
							<div className="col-lg-6">
								<textarea name="emailMessage" valueLink={this.linkState('emailBody')} id="emailMessage"></textarea>
							</div>
						</div>
						<div className="row form-group">
							<div className="col-lg-12">
								<input type="button" className="btn btn-primary col-lg-4" value="send" id="sendEmail" onClick={this.handleClick}/>
							</div>
						</div>
					</div>
				</form>
			</div>
		)
	}
});
module.exports=MailView;