var TodoList = React.createClass({
	// called when mounted. what is returned is added to dom at mount element.
	render:function(){
		function createItem(text,index){
			return <li key={index + text}>{text}</li>;
		};
		return <ul>{this.props.items.map(createItem)}</ul>
	}
})

var TodoApp = React.createClass({
	// what is returned becomes the initial state of the app
	getInitialState:function(){
		return {
			// the items in the child todolist
			items: ["Approve Coat of Arms"], 
			// the text currently being input
			text: ''
		};
	},
	// functions with no special value get an underscore
	_onChange:function(e){
		this.setState({text: e.target.value})
	},
	_handleSubmit: function(e) {
		e.preventDefault();
		this.setState({
			items:this.state.items.concat(this.state.text),
			text:''
		})
	},
	render: function(){
		return (
			<div>
				<h3>Kingly Matters</h3>
				<TodoList items={this.state.items} />
				<form onSubmit={this._handleSubmit}>
					<input onChange={this._onChange} value={this.state.text} />
					<button>{'Add #' + (this.state.items.length + 1)}</button>
				</form>
			</div>
		)
	}
})

React.render(<TodoApp />,mount_3);	