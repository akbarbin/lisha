import React, { Component } from 'react';
import marked from 'marked';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      author: props.author,
      title: props.title,
      description: props.description,
      status: props.status,
      assign_to: props.assign_to,
      estimated_duration: props.estimated_duration,
      type: props.type
    }
    //binding all our function to this class
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleEstimatedDurationChange = this.handleEstimatedDurationChange.bind(this);
    this.handleAssignToSelect = this.handleAssignToSelect.bind(this);
    this.handleStatusSelect = this.handleStatusSelect.bind(this);
    this.handleTypeSelect = this.handleTypeSelect.bind(this);
    this.handleTodoUpdate = this.handleTodoUpdate.bind(this);
  }
  updateTodo(e) {
    e.preventDefault();
    // brings up the update field when we click on the update link.
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }
  handleTodoUpdate(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    //if author or title changed, set if. if not, leave null or our PUT request
    //will ignore it.
    let author = (this.state.author) ? this.state.author: null;
    let title = (this.state.title) ? this.state.title : null;
    let description = (this.state.description) ? this.state.description : null;
    let estimated_duration = (this.state.estimated_duration) ? this.state.estimated_duration : null;
    let assign_to = (this.state.assign_to) ? this.state.assign_to : null;
    let type = (this.state.type) ? this.state.type : null;
    let status = (this.state.status) ? this.state.status : null;
    let todo = { author: author, title: title, description: description, estimated_duration: estimated_duration, assign_to: assign_to, type: type, status: status };
    this.props.onTodoUpdate(id, todo);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      author: '',
      title: ''
    })
  }
  deleteTodo(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onTodoDelete(id);
    console.log('oops deleted');
  }
  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
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
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <tr>
        <td>{this.props._id}</td>
        <td>{this.props.author}</td>
        <td>{this.props.title}</td>
        <td>{this.props.description}</td>
        <td>{this.props.assign_to}</td>
        <td>{this.props.estimated_duration}</td>
        <td>{this.props.status}</td>
        <td>{this.props.type}</td>
        <td>
          <Button bsStyle="info" onClick={ this.updateTodo }>Update</Button>
          <Button bsStyle="danger" onClick={ this.deleteTodo }>Delete</Button>
        </td>
        { (this.state.toBeUpdated)
          ? (<form onSubmit={ this.handleTodoUpdate }>
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
                <FormControl componentClass="select" placeholder="select" value={ this.state.assign_to } onChange={this.handleAssignToSelect}>
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
                <FormControl componentClass="select" placeholder="select" value={ this.state.status } onChange={this.handleStatusSelect}>
                  <option value="">select</option>
                  <option value="New">New</option>
                  <option value="Inprogress">Inprogress</option>
                  <option value="Done">Done</option>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlsType">
                <ControlLabel>Type</ControlLabel>
                <FormControl componentClass="select" placeholder="select" value={ this.state.type } onChange={this.handleTypeSelect}>
                  <option value="">select</option>
                  <option value="Feature">Feature</option>
                  <option value="Issue">Inprogress</option>
                </FormControl>
              </FormGroup>
              <Button bsStyle="primary" type="submit">
                Submit
              </Button>
            </form>) 
          : null }
      </tr>
    )
  }
}

export default Todo;