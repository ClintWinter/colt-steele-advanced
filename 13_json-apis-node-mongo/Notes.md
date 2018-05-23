# Creating JSON APIs With Node and Mongo

**Our Main Goal:** Prepare for React!

* Build our own JSON API
* Build a SPA (single page application) with that API

## Single Page Apps

Front-end:

* Vanilla JS
* jQuery
* **React**
* Angular

Back-end JSON API:

* **Express**
* Rails
* Django
* Flask

## Our API Gameplan

We are making a simple todo app.

### The Data

| Field | Type |
| --- | --- |
| name | String |
| completed | Boolean |
| createdDate | Date |

### The Routes

| Verb | Route | Description |
| --- | --- | --- |
| GET | /api/todos | List all todos |
| POST | /api/todos | Create new todo |
| GET | /api/todos/:todoId | Retrieve a todo |
| PUT | /api/todos/:todoId | Update a todo |
| DELETE | /api/todos/:todoId | Delete a todo |

### Environment

We are using cloud9 for the course, so login to it and use that. Use the nodeJS environment obviously.

To run the project do `node server.js` in the terminal.

There is also a tab at the top that says "Preview" where we can preview our running application. You can take the url out of the tab and run it in the browser as well.

## Installing Express

In our new environment, start by deleting every file and folder in the main directory.

First we create a `todos_api` directory, then inside of it run `npm init`.

Next we install express with `npm install --save express`.

Next we create our `index.js` file with `touch index.js`.

Here is our basic skeleton in `index.js` to make sure it works:

``` javascript
var express = require("express"),
    app = express();
    
app.listen(process.env.PORT, function() {
    console.log("App is running on port " + process.env.PORT);
});
```

`node index.js` to run the application.

Let's add a simple route.

``` javascript
var express = require("express"),
    app = express();
    
app.get("/", function(req, res) {
    res.send("Hi from express!");
});
    
app.listen(process.env.PORT, function() {
    console.log("App is running on port " + process.env.PORT);
});
```

## Responding With JSON

``` javascript
var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000;
    
app.get("/", function(req, res) {
    res.send({message: "Hi from JS object"});
});
    
app.listen(port, function() {
    console.log("App is running on port " + port);
});
```

`res.send` is flexible, if we pass it a javascript object, it is treated like JSON. We alternatively can use `res.json` which should do the same thing.

## Installing Mongo

Here is the commands needed to install mongo and mongoose for our project:

```
$ sudo apt-get install -y mongodb-org
$ mkdir data
$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
$ chmod a+x mongod
$ ./mongod

$ npm install mongoose --save
```

Run the first group of commands from the workspace directory, not the `todos_api` directory we created.

`./mongod` starts up the server. We can also connect to that server with the mongo cli using `$ mongo`.

Lastly we can run `npm install mongoose --save` in our `todos_api` project to start using it in our application.

## Connecting App to Mongo

We first create a `models` folder inside of our `todos_api` folder. Then we add 2 files to the folder: `index.js` and `todo.js`. In `models/index.js` is where we will use mongoose to connect our application to the mongo database.

Our `models/index.js` file will look like this:

``` javascript
var mongoose = require("mongoose");
mongoose.set('debug', true);
// todo-api is the name we are giving to our database
mongoose.connect('mongodb://localhost/todo-api');
// this line allows us to use promise syntax
mongoose.Promise = Promise;
```

Next, in our `models/todo.js` file we will create a schema for our todos.

``` javascript
// name
// completed
// created_date

var mongoose = require("mongoose");

// here we define the schema for our todo model
var todoSchema = new mongoose.Schema({
    // we can do "name: String", but we give it an object to pass it more parameters
    name: {
        type: String,
        required: 'Name cannot be blank'
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

// Here we create our model
var Todo = mongoose.model('Todo', todoSchema);

// We export the model so when we require it from other pages it retrieves the Todo model
module.exports = Todo;
```

We can put this line at the bottom of our `models/index.js` file:

``` javascript
module.exports.Todo = require("./todo");
```

## Defining the Index Route

`GET - /api/todos - List all todos` is the first route we will define.

Start by making a `routes` directory in our `todos_api` folder.

Inside of that we will make a `todos.js` file for all of our todos routes. This is what it will look like in its most basic form:

``` javascript
var express = require("express"),
    router = express.Router();

// notice we don't give it the /api/todos prefix that goes with all of the api routes. we do this in the main index.js file
router.get('/', function(req, res) {
    res.send("HELLO FROM TODOS ROUTES");
});

module.exports = router;
```

Then in `todos_api/index.js` we will import the routes:

``` javascript
var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000;
    
var todoRoutes = require("./routes/todos");

app.get("/", function(req, res) {
    res.send("HELLO FROM THE ROOT ROUTE");
});

// the first argument is the prefix for all of the routes, and the second is the router.
app.use('/api/todos', todoRoutes);
```

Now that that's setup, let's actually get todos for the route.

Our `routes/todos.js` file is now going to look like this:

``` javascript
var express = require("express"),
    router = express.Router(),
    db = require("../models");
    // we first bring in our main model file (which has todo model in it) to interact with the database
    
router.get('/', function(req, res) {
    // we use the Todo model specifically and find all todos.
    db.Todo.find()
    .then(function(todos) {
        res.json(todos);
    })
    .catch(function(err) {
        res.send(err);
    });
});

module.exports = router;
```

We don't actually have any todos in our database yet, so when we go to the `/api/todos` route in our application it will only return an empty array.

## The Create Route

`POST - /api/todos - Create new todo.`

The first thing we need to do is install `body-parser`, so we can handle the body of the post response.

```
$ npm install --save body-parser
```

Then we use it in our main `index.js` file.

``` javascript
var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require("body-parser");
    
var todoRoutes = require("./routes/todos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ...
```

Now we can add our new route for creating a todo to `routes/todos.js`.

``` javascript
// post instead of get
router.post('/', function(req, res) {
    // create the todo using req.body, which we can use thanks to body-parser
    db.Todo.create(req.body)
    .then(function(newTodo) {
        // we can see the todo that we created in response (will have completed status and created_date as well)
        res.status(201).json(newTodo);
    })
    .catch(function(err) {
        res.send(err);
    });
});
```

**NOTE: Use postman to send posts to add todos so that we have some data seeded to work with**

## The Show Route

`GET - api/todos/:todoId - Retrieve a todo`

Here we are getting the details of a single todo. It actually isn't that useful for this example because all of the details about our todos is available when viewing all of the todos. If we had more details that weren't shown unless viewing a specific todo, then this would make more sense.

In our `routes/todos.js` we add the new route.

``` javascript
// anything after /todos/id/ will be considered the todoId in the url.
router.get('/:todoId', function(req, res) {
    // find the todo by the id that was given in the url accessed by req.params
    db.Todo.findById(req.params.todoId)
    .then(function(todo) {
        res.json(todo);
    })
    .catch(function(err) {
        res.send(err);
    });
});
```

Now if we go to our `api/todos` route in the app, and take one of the ids from a todo and add it at the end of our url (`api/todos/<someid>`) we will get the details of that todo specifically.

## The Update Route

`Put - /api/todo/:todoId - Update a todo`

This route would be used when we click or check off a todo to update its completed status for example.

``` javascript
// UPDATE ROUTE
// we use put instead of get or post
router.put('/:todoId', function(req, res) {
    // we use findOneAndUpdate: the first argument is an object for how to find which todo.
    // in this case we are finding it by _id.
    // the second argument is the data we are updating it with, which is the req.body
    // similar to creating a todo.
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body)
    .then(function(todo) {
        res.json(todo);
    })
    .catch(function(err) {
        res.send(err);
    }); 
});
```

When we run our put request in postman and update the name, you'll notice the todo object you get back doesn't have the updated name. But when you do the get request again, the name is actually changed.

It updates in the database, but responds with the old version. We can change that.

``` javascript
// UPDATE ROUTE
// we use put instead of get or post
router.put('/:todoId', function(req, res) {
    // we use findOneAndUpdate: the first argument is an object for how to find which todo.
    // in this case we are finding it by _id.
    // the second argument is the data we are updating it with, which is the req.body
    // similar to creating a todo.
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo) {
        res.json(todo);
    })
    .catch(function(err) {
        res.send(err);
    }); 
});
```

Notice we are passing `findOneAndUpdate` a third parameter `{new: true}` so that our response is the new object instead.

## The Delete Route

`DELETE - /api/todo/:todoId - Delete a todo`

A fairly straight forward solution

``` javascript
// DELETE ROUTE
router.delete('/:todoId', function(req, res) {
    // use remove and give it the property you want to search by
    db.Todo.remove({_id: req.params.todoId})
    .then(function() {
        // there's no data to go to the then callback so just send a message.
        res.json({message: "We deleted it!"});
    })
    .catch(function(err) {
        res.send(err);
    });
});
```

## Refactoring

We will now refactor our `routes/todos.js` to use predefined functions so that it looks less messy. Let's make a new folder in `todos_api` called `helpers` and inside that new folder make a file called `todos.js`.

We will do the first 2 routes, index and create:

``` javascript
var db = require('../models');

exports.getTodos = function(req, res) {
    db.Todo.find()
    .then(function(todos) {
        res.json(todos);
    })
    .catch(function(err) {
        res.send(err);
    });
};

exports.createTodo = function(req, res) {
    db.Todo.create(req.body)
    .then(function(newTodo) {
        res.status(201).json(newTodo);
    })
    .catch(function(err) {
        res.send(err);
    });
};

module.exports = exports;
```

Now in `routes/todos.js` it will look like this after we pulled out those 2 functions:

``` javascript
var express = require("express"),
    router = express.Router(),
    db = require("../models");

// INDEX
route.get('/', );

// CREATE
route.create('/', );
```

We want to bring in the helper functions and use those for the routes we are refactoring...

``` javascript
var express = require("express"),
    router = express.Router(),
    db = require("../models"),
    helpers = require("../helpers/todos");
```

And we can combine the `index` and `create` routes because it uses the same path to make it even more simple:

``` javascript
var express = require("express"),
    router = express.Router(),
    db = require("../models"),
    helpers = require("../helpers/todos");
    
// INDEX/CREATE ROUTES
router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodo);
```

Let's finish the rest of the routes in `helpers/todos.js`:

``` javascript
var db = require('../models');

exports.getTodos = function(req, res) {
    db.Todo.find()
    .then(function(todos) {
        res.json(todos);
    })
    .catch(function(err) {
        res.send(err);
    });
};

exports.createTodo = function(req, res) {
    db.Todo.create(req.body)
    .then(function(newTodo) {
        res.status(201).json(newTodo);
    })
    .catch(function(err) {
        res.send(err);
    });
};

exports.showTodo = function(req, res) {
    db.Todo.findById(req.params.todoId)
    .then(function(todo) {
        res.json(todo);
    })
    .catch(function(err) {
        res.send(err);
    });
};

exports.updateTodo = function(req, res) {
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo) {
        res.json(todo);
    })
    .catch(function(err) {
        res.send(err);
    }); 
};

exports.deleteTodo = function(req, res) {
    db.Todo.remove({_id: req.params.todoId})
    .then(function() {
        res.json({message: "We deleted it!"});
    })
    .catch(function(err) {
        res.send(err);
    });
};

module.exports = exports;
```

And now our new `routes/todos.js` file is super clean:

``` javascript
var express = require("express"),
    router = express.Router(),
    db = require("../models"),
    helpers = require("../helpers/todos");
    
// INDEX/CREATE ROUTES
router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodo);
    
// SHOW/UPDATE/DELETE ROUTES
router.route('/:todoId')
    .get(helpers.showTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo);

module.exports = router;
```