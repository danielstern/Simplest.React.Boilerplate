var NavigationItem = React.createClass({
	_onClick:function(){
		this.props.selectItem(this.props.item);
	},
	render:function(){
		return (
			<li onClick={this._onClick} className={this.props.selected ? "selected" : ""}>
				{this.props.items.data.display_name}
			</li>
		)
	}
});

var Navigation = React.createClass({
	_setSelectedItem:function(item){
		this.props.selectItem(item);
	},
	render:function(){
		var _this = this;

		return <div>HIYO!</div>

		// var items = this.props.items.map(function(item){
		// 	return (
		// 		<NavigationItem key={item.data.id}
		// 			item={item} selectedItem={_this._setSelectedItem}
		// 			selected={item.data.url === _this.props.activeUrl} />
		// 	)
			
		// });
	}
});

function JSONP(url,cb){
	var cbname = "fn" + Date.now();
	var script = document.createElement("script")
	script.src = url + cbname;

	window[cbname] = function(json){
		cb(json);
		delete window[cbname];
	}

	document.head.appendChild(script);
}

var RedditApp = React.createClass({
	componentDidMount: function(){
		var _this = this;
		JSONP("http://www.reddit.com/reddits.json?jsonp=",function(json){
			_this.setState({
				navigationItems:json.data.children
			});
			console.log("Got data...",json);
		})
	},
	getInitialState:function(){
		return ({
			activeUrl: "",
			navigationItems: [],
			storyItems: [],
			title: "SELECT A SUBREDDIT!"
		})
	},
	render:function(){
		return (
			<div>
				<h1>OUR REDDIT APP!</h1>
				<Navigation/>
			</div>
		)
	},
	setSelectedItem:function(item){

	}
})

React.render(<RedditApp />, mount_4)