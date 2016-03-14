var React=require('react'),liElem,imgElem,imgElem,targetWindow;
var ReactDom=require('react-dom');
var EmojiPanelView = React.createClass({displayName: "EmojiPanelView",
	getInitialState:function(){
		self=this;
		targetWindow = self.props.data.toUserId;
		var emojiList=[];
		for(var i=102; i>=1;i--) {
			liElem = React.createElement('li',null,React.createElement('img',{"src":"../../images/emoji/"+i+".gif","title":""+i+""}));
			emojiList.push(liElem);
		}
			return {
				emojiList:emojiList
			}
		
	},
	addEmoji:function(e){
		self.props.parent.setState({emoji: '[emoji:' + e.target.title + ']'});
		/*$('.'+targetWindow).find('#messageBox').val($('.'+targetWindow).find('#messageBox').val() + '[emoji:' + e.target.title + ']');*/
		if($('.'+targetWindow).find('.emoji-list').hasClass('hide')){
			$('.'+targetWindow).find('.emoji-list').removeClass('hide');
		}
		else {
			$('.'+targetWindow).find('.emoji-list').addClass('hide');
		}
		
	},
	render:function(){
		
		
		return (
			React.createElement("ul", {className: " smily-list padding-none colg-lg-12", onClick: this.addEmoji}, 
				 this.state.emojiList
			)
		)
	}
});
module.exports= EmojiPanelView;