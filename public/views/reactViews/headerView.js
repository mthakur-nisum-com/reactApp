var React=require('react'), ActionEvents,self;
var headerView = React.createClass({
	optionsList:function(resObj) {
		/*var clickEvent=new MouseEvent('click',{
			'view': window,
    		'bubbles': true,
    		'cancelable': true
		});*/
		var optionList=['login','logout','register','myPage','profile'],element=null,options=[];
		if(resObj) {
			if(resObj.loggedIn) {
				element=React.createElement('li',{"data-attr-value":optionList[1]},optionList[1]);
				options.push(element);
				element= React.createElement('li',{"data-attr-value":optionList[3]},optionList[3]);
				options.push(element);
				element= React.createElement('li',{"data-attr-value":optionList[4]},optionList[4]);
				options.push(element);
			}
			/*console.log(document.getElementsByClassName('options-list'))*/
		}
		else {
			element=React.createElement('li',{"data-attr-value":optionList[0]},optionList[0]);
			options.push(element);
			element= React.createElement('li',{"data-attr-value":optionList[2]},optionList[2]);
			options.push(element);
		}
		return options;
	},
	updateLayout:function(updateObj){
		if(localStorage) {
			localStorage.loggedIn = updateObj.loggedIn || updateObj.isNewUser;
			localStorage.userEmail = updateObj.userEmail;
			localStorage.userName = updateObj.userName;
			localStorage.chatName=updateObj.chatName;
			localStorage.userID  = updateObj.userID;
		}
		self.setState({optionsList:self.optionsList(updateObj)});

	},
	handleClick:function(e){
		e.preventDefault();
		var reqType=e.target.getAttribute('data-attr-value');
		switch(reqType) {
			case  "login":
				var LoginView = require('./LoginView');
				React.render(<LoginView/>,document.getElementById('display-section'))
				return;
			case  "register":
				var Comp = require('./formView');
				React.render(<Comp data="register"/>,document.getElementById('display-section'))
				return;
			case  "profile":
				var Comp = require('./formView');
				React.render(<Comp data="profile"/>,document.getElementById('display-section'))
				return;
			case "myPage":
				var Comp = require('./myPage');
				React.render(<Comp/>,document.getElementById('display-section'))
			case "logout":
				$.ajax({
					url:'/logout',
					datatype:'json',
					type:'POST',
					data:{
						username:localStorage.userEmail,
					},
					success:function(response){
						var HeaderSection = require('./headerView');
						 ActionEvents.updateCallBack('changeEvent',response.resultObj);
					},
					error:function(reponse){

					}
				})
			return;
		}
	},
	getInitialState:function(){
		self=this;
		ActionEvents = require('./../../js/Actions/ActionEvents');
		ActionEvents.addListeners('changeEvent',self.updateLayout);
		return {
			userDetails:null,
			optionsList:(localStorage && localStorage.loggedIn)?self.optionsList(localStorage):self.optionsList(undefined)
		};
	},
	render:function(){
		return(
			<header className="row header-section">
				<div className="left col-lg-6 col-md-6 col-sm-6 col-xs-6 icon-section">
					icon
				</div>
				<div className="right col-lg-6 col-md-6 col-sm-6 col-xs-6 main-list-sec">
					<ul onClick={this.handleClick} className="options-list">
						{this.state.optionsList}
					</ul>
				</div>
			</header>
		)
	},
	componentDidMount:function(){
		
	}
});
module.exports=headerView;