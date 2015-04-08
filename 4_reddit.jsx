var NavigationItem = React.createClass({
	_onClick:function(){
		this.props.selectItem(this.props.item);
	},
	render:function(){
		return (
			<li onClick={this._onClick} className={this.props.selected ? "selected" : ""}>
				{this.props.item.data.display_name} {this.props.selected ? "!!" : ""}
			</li>
		)
	}
});

var Navigation = React.createClass({
	setSelectedItem:function(item){
		this.props.selectSelectedNavItem(item);
	},
	render:function(){
		var _this = this;

		var items = this.props.items.map(function(item){
			return (
				<NavigationItem key={item.data.id}
					item={item} 
					selectItem={_this.setSelectedItem}
					selected={item.data.url === _this.props.activeUrl} />
			)			
		});

		return (
			<div className="navigation">
				<div className="header">Navigation</div>
				<ul>
					{items}
				</ul>
			</div>
		)
	}
});

var RedditApp = React.createClass({
	makeJSONPRequest:function(url,cb){
		var cbname = "fn" + Date.now();
		var script = document.createElement("script")
		script.src = url + cbname;

		window[cbname] = function(json){
			cb(json);
			delete window[cbname];
		}

		document.head.appendChild(script);
	},
	componentDidMount: function(){
		var _this = this;
		this.makeJSONPRequest("http://www.reddit.com/reddits.json?jsonp=",function(json){
			_this.setState({
				navigationItems:json.data.children
			});
		});
	},
	getInitialState:function(){
		return ({
			activeNavigationUrl: "",
			navigationItems: [],
			storyItems: [],
			title: "SELECT A SUBREDDIT!"
		})
	},
	render:function(){
		return (
			<div>
				<h1>OUR REDDIT APP!</h1>
				<Navigation activeUrl={this.state.activeNavigationUrl}
				items={this.state.navigationItems}
				selectSelectedNavItem={this.selectSelectedNavItem} />
			</div>
		)
	},
	selectSelectedNavItem:function(item){
		console.log("settingselected nav...",item);
		var _this = this;
		this.makeJSONPRequest("http://www.reddit.com/" + item.data.url + ".json?sort=top&t=month&jsonp=",function(json){
			_this.setState({storyItems:json.data.children})
		});

		this.setState({
			activeNavigationUrl: item.data.url,
			title: item.data.display_name
		})

	}
})

React.render(<RedditApp />, mount_4)