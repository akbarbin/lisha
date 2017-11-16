'use strict'

// first we import our dependencies

var express = require('express');
const path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/comments');
var Todo = require('./model/todos');

// and create out instances
var app = express();
var router = express.Router();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// set our port to either a predetermined port number if you have set
// it up, or 3001
var port = process.env.PORT || 3001;

// db config
var mongoDB = 'mongodb://lisha:12345678@ds159235.mlab.com:59235/lisha';
mongoose.connect(mongoDB, { useMongoClient: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// now we should configure the API to use bodyParser and look for
// JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  // and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
})

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!' });
})

//adding the /comments route to our /api router
router.route('/comments')
  // retrieve all comments from the database
  .get(function(req, res) {
    //looks at out Commen Schema
    Comment.find(function(err, comments) {
      if(err)
        res.send(err);
        // responds with a json object of out database comments.
        res.json(comments);
    });
  })
  //post new comment to the database
  .post(function(req, res) {
    var comment = new Comment();
    //body parser lets us use the req.body
    comment.author = req.body.author;
    comment.text = req.body.text;

    comment.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment successfully added!' });
    });
  });

  // Adding a route to a specifig comment based on the database ID
  router.route('/comments/:comment_id')
    // The pust method gives us the chance to update our comment based on the ID passed on the route
    .put(function(req, res) {
      Comment.findById(req.params.comment_id, function(err, comment) {
        if (err)
          res.send(err);
        //setting the new autho and text to whatever was changed. If nothing was changed
        // we will not alter the field.
        (req.body.author) ? comment.author = req.body.author : null;
        (req.body.text) ? comment.text = req.body.text : null;

        // save comment
        comment.save(function(err) {
          if (err)
            res.send(err);
          res.json({ message: 'Comment has been updated' });
        });
      });
    })
    //delete method for removing a comment from our database
    .delete(function(req, res) {
      //select the comment by its ID, then removes it.
      Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
        if (err)
          res.send(err);
        res.json({ message: 'Comment has been deleted' })
      });
    });

  //adding the /todos route to our /api router
  router.route('/todos')
    // retrieve all todos from the database
    .get(function(req, res) {
      //looks at out Commen Schema
      Todo.find(function(err, todos) {
        if(err)
          res.send(err);
          // responds with a json object of out database todos.
          res.json(todos);
      });
    })
    //post new todo to the database
    .post(function(req, res) {
      var todo = new Todo();
      //body parser lets us use the req.body
      todo.author = req.body.author;
      todo.title = req.body.title;
      todo.description = req.body.description;
      todo.status = req.body.status;
      todo.assign_to = req.body.assign_to;
      todo.estimated_duration = req.body.estimated_duration;
      todo.type = req.body.type;

      todo.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Todo successfully added!' });
      });
    });

  // Adding a route to a specifig todo based on the database ID
  router.route('/todos/:todo_id')
    // The pust method gives us the chance to update our todo based on the ID passed on the route
    .get(function(req, res) {
      //looks at out Commen Schema
      Todo.findById(req.params.todo_id, function(err, todo) {
        if(err)
          res.send(err);
          // responds with a json object of out database todos.
          res.json(todo);
      });
    })
    .put(function(req, res) {
      Todo.findById(req.params.todo_id, function(err, todo) {
        if (err)
          res.send(err);
        //setting the new autho and text to whatever was changed. If nothing was changed
        // we will not alter the field.
        (req.body.author) ? todo.author = req.body.author : null;
        (req.body.title) ? todo.title = req.body.title : null;
        (req.body.description) ? todo.description = req.body.description : null;
        (req.body.status) ? todo.status = req.body.status : null;
        (req.body.assign_to) ? todo.assign_to = req.body.assign_to : null;
        (req.body.estimated_duration) ? todo.estimated_duration = req.body.estimated_duration : null;
        (req.body.type) ? todo.type = req.body.type : null;

        // save todo
        todo.save(function(err) {
          if (err)
            res.send(err);
          res.json({ message: 'Todo has been updated' });
        });
      });
    })
    //delete method for removing a todo from our database
    .delete(function(req, res) {
      //select the todo by its ID, then removes it.
      Todo.remove({ _id: req.params.todo_id }, function(err, todo) {
        if (err)
          res.send(err);
        res.json({ message: 'Todo has been deleted' })
      });
    });

// Use our router configuration when we call / api
app.use('/api', router);

// // The "catchall" handler: for any request that doesn't
// // match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/public/index.html'));
// });

// starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
})