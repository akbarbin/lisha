import React, { Component } from 'react';
import Todo from './Todo';
import { Table } from 'react-bootstrap';

class TodoList extends Component {
  render() {
    let todoNodes = this.props.data.map(todo => {
      return (
        <Todo
          author={ todo.author }
          title={ todo.title }
          description={ todo.description }
          assign_to={ todo.assign_to }
          estimated_duration={ todo.estimated_duration }
          status={ todo.status }
          type={ todo.type }
          uniqueID={ todo['_id'] }
          onTodoDelete={ this.props.onTodoDelete }
          onTodoUpdate={ this.props.onTodoUpdate }
          key={ todo['_id'] }>
          { todo.description }
        </Todo>
      )
    })
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Author</th>
            <th>Title</th>
            <th>Description</th>
            <th>Assigned To</th>
            <th>Estimated Duration</th>
            <th>Status</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          { todoNodes }
        </tbody>
      </Table>
    )
  }
}

export default TodoList;