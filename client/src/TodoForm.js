import React, { Component } from 'react';
import style from './style';
import { Panel, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: '', title: '', description: '', status: '', assign_to: '', estimated_duration: '', type: '' };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleEstimatedDurationChange = this.handleEstimatedDurationChange.bind(this);
    this.handleAssignToSelect = this.handleAssignToSelect.bind(this);
    this.handleStatusSelect = this.handleStatusSelect.bind(this);
    this.handleTypeSelect = this.handleTypeSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }
  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }
  handleEstimatedDurationChange(e) {
    this.setState({ estimated_duration: e.target.value });
  }
  handleAssignToSelect(e) {
    this.setState({ assign_to: e.target.value });
  }
  handleStatusSelect(e) {
    this.setState({ status: e.target.value });
  }
  handleTypeSelect(e) {
    this.setState({ type: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let title = this.state.title.trim();
    let description = this.state.description.trim();
    let estimated_duration = this.state.estimated_duration.trim();
    let assign_to = this.state.assign_to.trim();
    let type = this.state.type.trim();
    let status = this.state.status.trim();
    if (!title || !author) {
      return;
    }

    this.props.onTodoSubmit({ author: author, title: title, description: description, estimated_duration: estimated_duration, assign_to: assign_to, type: type, status: status });
    this.setState({ author: '', title: '', description: '', status: '', assign_to: '', estimated_duration: '', type: '' });
    console.log(`${this.state.author} said "${this.state.title}"`)
  }
  render() {
    return (
      <div style={style.TodoAppForm}>
        <Panel header="Add Todo">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="formControlsAuthor">
              <ControlLabel>Author</ControlLabel>
              <FormControl placeholder="Enter your name" value={ this.state.author } onChange={ this.handleAuthorChange } />
            </FormGroup>
            <FormGroup controlId="formControlsTitle">
              <ControlLabel>Title</ControlLabel>
              <FormControl placeholder="Enter your title" value={ this.state.title } onChange={ this.handleTitleChange } />
            </FormGroup>
            <FormGroup controlId="formControlsDescription">
              <ControlLabel>Description</ControlLabel>
              <FormControl componentClass="textarea" placeholder="Enter description" value={ this.state.description } onChange={ this.handleDescriptionChange } />
            </FormGroup>
            <FormGroup controlId="formControlsEstimatedDuration">
              <ControlLabel>Estimated Duration</ControlLabel>
              <FormControl placeholder="Enter your estimated duration" value={ this.state.estimated_duration } onChange={ this.handleEstimatedDurationChange } />
            </FormGroup>
            <FormGroup controlId="formControlsAssignTo">
              <ControlLabel>Assign To</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={this.handleAssignToSelect}>
                <option value="">select</option>
                <option value="Adnan">Adnan</option>
                <option value="Akbar">Akbar</option>
                <option value="Irfan">Irfan</option>
                <option value="James">James</option>
                <option value="Revan">Revan</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsStatus">
              <ControlLabel>Status</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={this.handleStatusSelect}>
                <option value="">select</option>
                <option value="New">New</option>
                <option value="Inprogress">Inprogress</option>
                <option value="Done">Done</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsType">
              <ControlLabel>Type</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={this.handleTypeSelect}>
                <option value="">select</option>
                <option value="Feature">Feature</option>
                <option value="Issue">Issue</option>
              </FormControl>
            </FormGroup>
            <Button bsStyle="primary" type="submit">
              Submit
            </Button>
          </form>
        </Panel>
      </div>
    )
  }
}

export default TodoForm;