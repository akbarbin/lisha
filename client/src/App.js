import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import CommentBox from './CommentBox';
import TodoBox from './TodoBox';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to LISHA</h1>
          <span>TODO list sharing</span>
        </header>
        <Router>
          <div>
            <nav>
              <Link to="/todos"> Todos</Link> |
              <Link to="/comments"> Comments</Link>
            </nav>

            <hr/>
            <Route exact path="/todos" render={()=><TodoBox url='https://salty-caverns-11463.herokuapp.com/api/todos' pollInterval={2000} />} />
            <Route exact path="/comments" render={()=><CommentBox url='https://salty-caverns-11463.herokuapp.com/api/comments' pollInterval={2000} />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
