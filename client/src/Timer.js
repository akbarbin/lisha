import React, { Component } from 'react';
import axios from 'axios';
class Timer extends Component {
  constructor(props) {
    super(props);
    // this.state = { time: {}, seconds: 2 * 60 };
    this.state = { 
      timer: 0,
      time: {},
      seconds: 1 * 60 + 10
    };
    this.startTimer = this.startTimer.bind(this);
  }
  
  secondToTime(secs) {
    let hours = secs / 3600;
    let divisor_for_minutes = secs % 3600;
    let minutes= Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    }
    return obj;
  }

  tick() {
    this.setState(prevState => ({
      time: this.secondToTime(prevState.seconds),
      seconds: prevState.seconds - 1
    }));
    if(this.state.seconds < 0) {
      clearInterval(this.interval);
      this.setState({timer: 0, seconds: 1 * 60 + 10})

      this.handleUpdate({real_duration: this.state.real_duration + 1})
    }
  }

  componentDidMount() {
  }

  startTimer() {
    if (this.state.timer == 0) {
      this.interval = setInterval(() => this.tick(), 1000);
      this.state.timer = this.interval;
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleUpdate(todo) {
    // sends the todo id and new author/text to our api
    // axios.put(`https://nameless-peak-45207.herokuapp.com/${this.props.match.params.todo_id}`, todo)
    //   .catch(err => {
    //     console.log(err);
    //   })
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <h1> m: {this.state.time.m ? this.state.time.m : "00" } s: {this.state.time.s ? this.state.time.s : "00"} </h1>

        <br />
        <br />
        <br />
        <button onClick={this.startTimer}>Start</button>
      </div>
    );
  }
}

export default Timer;