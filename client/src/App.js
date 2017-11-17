import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import CommentBox from './CommentBox';
import TodoBox from './TodoBox';
import TodoDetailBox from './TodoDetailBox';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to LISHA</h1>
        </header>
        <p className="App-intro">
          Todo List Sharing. You can share your todolist when you get stack. Happy to share.
        </p>
        <Router>
          <div>
            <nav>
              <Link to="/todos"> Todos</Link> |
              <Link to="/comments"> Comments</Link>
            </nav>

            <hr/>
            <Switch>
              <Route exact path="/todos" render={()=><TodoBox url='https://nameless-peak-45207.herokuapp.com/api/todos' pollInterval={2000} />} />
              <Route exact path='/todos/:todo_id' component={TodoDetailBox}/>
              <Route exact path="/comments" render={()=><CommentBox url='https://nameless-peak-45207.herokuapp.com/api/comments' pollInterval={2000} />} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
