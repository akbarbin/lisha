import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import style from './style';
import Timer from './Timer';

class TodoDetailBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loadTodoFromServer = this.loadTodoFromServer.bind(this);
  }
  loadTodoFromServer() {
    axios.get(`https://nameless-peak-45207.herokuapp.com/api/todos/${this.props.match.params.todo_id}`)
      .then(res => {
        this.setState(res.data);
      })
  }
  componentDidMount() {
    this.loadTodoFromServer();
  }
  render() {
    return (
      <div>
        <h1>Detail: {this.state.title}</h1>
        <h4>Assign To: {this.state.assign_to}</h4>
        <h4>Estimated Duration: {this.state.estimated_duration}</h4>
        <h4>Real Duration: {this.state.real_duration}</h4>
        <Timer real_duration={this.state.real_duration}/>
      </div>
    )
  }
}

export default TodoDetailBox;