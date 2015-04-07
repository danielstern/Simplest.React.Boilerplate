var Stark = React.createClass({
	render:function(){
		return (<div>My name is {this.props.name} Stark</div>);
	}
});

React.render(<Stark name="Eddard"/>,mount_1)