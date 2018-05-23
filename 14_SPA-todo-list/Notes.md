# Single Page Application: Todo App With jQuery

This is built on top of the previous section where we created an api for a todo list using mongo, express, and node.

## The Root Route

Right now in `todos_api/index.js` our main root route simple sends a plain text sentence. Instead what we want is to serve an html page.

``` javascript
app.get("/", function(req, res) {
    // res.send("HELLO FROM THE ROOT ROUTE");
    res.sendFile("index.html");
});
```

Now create a `views` directory where we will store our view. In there we can make a file called `index.html`.

In addition to adding the sendFile line, we also need to tell node where to get the `index.html` file from. Above our route and under the bodyParser line, we can add this line:

``` javascript
app.use(express.static(__dirname + '/views'));
```

Next, in `index.html` we can add some html, and we also are going to want some css:

``` html
<head>
    <link rel="stylesheet" href="app.css" type="text/css" />
</head>
<body>
    
</body>
```

In `todos_api` we will add a directory called `public` where we will store `app.css`. Now in `index.js` we need to add another line for using the `public` directory the same way we just did for `views`.

``` javascript
app.use(express.static(__dirname + 'public'));
app.use(express.static(__dirname + '/views'));
```

We will also need a javascript file for our front-end JavaScript, so in the `public` directory we can add an `app.js` file. In that file just add an alert to test the file to make sure it's working. Then add a script tag into `index.html`.

``` html
<head>
    <link rel="stylesheet" href="app.css" type="text/css" />
</head>
<body>
    <h1>This is the index page</h1>
    <p>Todos will go here</p>
    
    <script type="text/javascript" src="app.js"></script>
</body>
```

**NOTE** You can install an npm package called `nodemon` with `$ npm install -g nodemon` which will automatically watch and refresh your project for you, so you don't have to continually stop and restart the server to see changes. To use it, instead of using `$ node index.js` to start the server, run `$ nodemon index.js` and that's it!

Go ahead and steal the css from the resources provided in the lecture and copy the html as well. It's only a few lines. Include jQuery in the header of the `index.html` file and we are ready to start making AJAX requests.

## AJAX

Now in our `app.js` file use the document.ready shorthand for jQuery:

``` javascript
$(function() {

});
```

We will start using this file by requesting `api/todos` at the start to initially load our todos on the page. Let's make that request:

``` javascript
$(function() {
    $.ajax({
        type: "GET",
        url: "https://todo-app-clintwinter.c9users.io/api/todos",
        success: function(data) {
            console.log(data);
        }
    });
});
```

What get's console.logged is an array of objects each representing a todo.

Here's the code on how to add the list items to the page, this should be pretty familiar:

``` javascript
$(function() {
    $.ajax({
        type: "GET",
        url: "https://todo-app-clintwinter.c9users.io/api/todos",
        success: addTodos
    });
});

// add todos to page
function addTodos(todos) {
    todos.forEach(function(todo) {
        var newTodo = $('<li class="task">' + todo.name + '</li>');
       $('ul.list').append(newTodo);
    });
}
```

We can also add an if statement to check the completed status so that our li's are displayed properly when they are completed.

``` javascript
// add todos to page
function addTodos(todos) {
    todos.forEach(function(todo) {
        var newTodo = $('<li class="task">' + todo.name + '</li>');
        if (todo.completed) {
            newTodo.addClass('done');
        }
       $('ul.list').append(newTodo);
    });
}
```

Next we want to have our form create todos when we hit the enter key. To do that we have to listen for that key to be pressed.

Just look at the file to see how it's done honestly, not that complicated.

But there was a good little lesson: `e.stopPropagation();` is extremely useful for when clicking the "X" to delete. When clicking it, we are also actually clicking on the `li` as well, so if we use `e.stopPropagation()` we can stop it from triggering both events and only trigger the one we want it to trigger. I can use that when clicking delete in the widgets thing for work.

The other thing is to set the data attributes in javascript and use those rather than write them into the html where someone crafty can go in and change them.