var Daenerys = React.createClass({
	getInitialState:function(){
		return {dragonsHatched:0};
	},
	hatchDragon:function(){
		this.setState({dragonsHatched: this.state.dragonsHatched + 1})
	},
	/*
		What Angular calls BootStrapping, and jQuery calls Binding, React call Mount.
	*/
	componentDidMount:function(){
		this.interval = setInterval(this.hatchDragon, 2000);
	},
	componentWillUnmount: function(){
		clearInterval(this.interval);
	},
	/*
		This function is called after mounting. Whatever is returned is added to the Dom at the Mountnode.
	*/
	render: function(){
		return (
			<div>Dragons Hatched: {this.state.dragonsHatched}. DRACARYS!</div>
		)
	}

})

React.render(<Daenerys/>, mount_2)