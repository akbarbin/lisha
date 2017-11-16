import React, { Component } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import style from './style';

class TodoBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadTodosFromServer = this.loadTodosFromServer.bind(this);
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  loadTodosFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }
  handleTodoSubmit(todo) {
    // add POST request
    let todos = this.state.data;
    todo.id = Date.now();
    let newTodo = todos.concat([todo]);
    this.setState({ data: newTodo });
    axios.post(this.props.url, todo)
      .catch(err => {
        console.error(err);
        this.setState({ data: todos });
      })
  }
  handleUpdate(id, todo) {
    //sends the todo id and new author/text to our api
    axios.put(`${this.props.url}/${id}`, todo)
      .catch(err => {
        console.log(err);
      })
  }
  handleDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .catch(err => {
        console.log(err);
      })
  }
  componentDidMount() {
    this.loadTodosFromServer();
    setInterval(this.loadTodosFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div style={style.commentBox}>
        <h2>Todos:</h2>
        <TodoList
          onTodoUpdate={ this.handleUpdate}
          onTodoDelete={ this.handleDelete}
          data= { this.state.data }/>
        <TodoForm onTodoSubmit={ this.handleTodoSubmit } />
      </div>
    )
  }
}

export default TodoBox;