# ES2016 & ES2017

**Objectives:**

* Examine two new features to ES2016
* Use new string methods in ES2017
* Understand how to refactor asynchronous code using ES2017 async functions
* Use the `spread` and `rest` operator for objects

## Exponentiation Operator (**)

From:
``` javascript
// ES2015
var calculatedExponent = Math.pow(2, 4);
calculatedExponent; // 16
```

To:
``` javascript
// ES2016
var calculatedExponent = 2 ** 4;
calculatedExponent; // 16
```

### Another Example

From:
``` javascript
// ES2015
var nums = [1, 2, 3, 4];
var total = 2;

for (let i = 0; i < nums.length; i++) {
    total = Math.pow(total, nums[i]);
}
```

To:
``` javascript
// ES2016
var nums = [1, 2, 3, 4];
var total = 2;

for (let i = 0; i < nums.length; i++) {
    total **= nums[i];
}
```

## [].includes

In ES2015, we learned that strings have a method called `includes`, which returns `true` if the value passed to it is included in the string, otherwise `false`.

In ES2016, arrays now have an includes method as well.

From:
``` javascript
// ES2015
var nums = [1, 2, 3, 4, 5];
nums.indexOf(3) > -1 // true
nums.indexOf(44) > -1 // false
```

To:
``` javascript
// ES2016
var nums = [1, 2, 3, 4, 5];
nums.includes(3); // true
nums.includes(44); // false
```

## padStart

The first parameter is the total length of the new string. The second parameter is what to pad with from the start. Default is an empty space.

``` javascript
"awesome".padStart(10);      // "   awesome"
"awesome".padStart(10, '!'); // "!!!awesome"
```

## padEnd

The first parameter is the total length of the new string. The second parameter is what to pad with from the end. Default is an empty space.

``` javascript
"awesome".padEnd(10, '!'); // "awesome!!!"
```

## ES2017 Async Functions

A special kind of function that is created using the word `async`. The purpose of async functions is to simplify writing asynchronous code, specifically Promises.

``` javascript
async function first() {
    return "We did it!";
}

first(); // returns a promise

first().then(val => console.log(val)); // "We did it!"
```

What makes them really special is the `await` keyword!

### Await

A reserved keyword that can only be used inside async functions.

`await` pauses the execution of the async function and is followed by a Promise. The `await` keyword waits for the promise to resolve, and then resumes the async function's execution and returns the resolved value.

Think of the `await` keyword like a pause button (similar to `yield` with generators).

We remove the hassle of callbacks, promise then chaining, and generator functions.

### Using Await

Let's write a function that gets some movie data from the OMDB API!

``` javascript
async function getMovieData() {
    console.log("starting!");
    var movieData = await $.getJSON('https://omdbapi.com?t=titanic&apikey=thewdb');
    console.log("all done!");
    console.log(movieData);
}

getMovieData() // logs an object with data about the movie.
```

This basically lets us dictate the order. Normally the "starting" and "all done" statements will both print, then we get our data from the request. But using `await` forces the promise to resolve so we get the data, then the function continues after.

No `.then` or callback or yield necessary!

### Object Asnyc

We can also place async functions as methods inside objects!

``` javascript
var movieCollector = {
    data: "titanic",
    async getMovie() {
        var response = await $.getJSON(`https://omdbapi.com?t=${this.data}&apikey=thewdb`);
        console.log(response);
    }
};

movieCollector.getMovie();
```

Just make sure to prefix the name of the function with the async keyword.

### Class Async

We can also place async functions as instance methods with ES2015 class syntax.

``` javascript
class MovieData {
    constructor(name) {
        this.name = name;
    }

    async getMovie() {
        var response = await $.getJSON(`https://omdbapi.com?t=${this.data}&apikey=thewdb`);
        console.log(response);
    }
}

var m = new MovieData('shrek');
m.getMovie();
```

But what happens when things go wrong and a promise is rejected?

### Handling Errors

If a promise is rejected using await, an error will be thrown so we can easily use a try/catch statement to handle errors!

``` javascript
async function getUser(user) {
    try {
        var response = await $.getJSON(`https://api.github.com/users/${user}`);
        console.log(response.name);
    } catch(e) {
        console.log("User does not exist!");
    }
}
```

``` javascript
getUser('csummerweb'); // Clint Summer
getUser('fool!!!'); // User does not exist!
```

### Thinking about HTTP Requests

Below we are making two requests sequentially.

``` javascript
// SEQUENTIAL NOT PARALLEL
async function getMovieData() {
    var responseOne = await $.getJSON(`https://omdbapi.com?t=titanic&apikey=thewdb`);
    var responseTwo = await $.getJSON(`https://omdbapi.com?t=shrek&apikey=thewdb`);
    console.log(responseOne);
    console.log(responseTwo);
}

getMovieData();
```

The second request does not get made until the first is resolved. Imagine if each of these requests took a couple seconds... our application would slow down quite a bit.

#### Refactoring

Start the HTTP requests in parallel and then await their resolved promise!

``` javascript
async function getMovieData() {
    var titanicPromise = $.getJSON(`https://omdbapi.com?t=titanic&apikey=thewdb`);
    var shrekPromise = $.getJSON(`https://omdbapi.com?t=shrek&apikey=thewdb`);

    var titanicData = await titanicPromise;
    var shrekData = await shrekPromise;

    console.log(titanicData);
    console.log(shrekData);
}
```

Even though it is quite similar, there is a tremendous performance difference when making multiple requests. If you find yourself making a lot of HTTP requests and your application is slowing down, consider refactoring to make the requests in parallel.

### Await with Promise.all

We can use `Promise.all` to await multiple resolved promises.

``` javascript
async function getMovieData(first, second) {
    var moviesList = await Promise.all([
        $.getJSON(`https://omdbapi.com?t=${first}&apikey=thewdb`),
        $.getJSON(`https://omdbapi.com?t=${second}&apikey=thewdb`)
    ]);

    console.log(moviesList[0].Year);
    console.log(moviesList[1].Year);
}

getMovieData('shrek', 'blade');

// 2001
// 1998
```

Here we are simply waiting for an array of promises to resolve!

## Object Rest

Gather remaining (rest) of keys and values in an object and create a new one out of them.

``` javascript
var developer = {
    first: "Clint", 
    last: "Summer", 
    job: "Developer", 
    numSiblings: 4
};

var {first, last, ...data} = developer;
first; // Clint
last; // Summer
data; // {job: "Developer", numSiblings: 4}
```

## Object Spread

Spread out keys and values from one object to another.

``` javascript
var developer =  {
    first: "Clint",
    last: "Summer",
    job: "Developer"
};

var developer2 = {...developer, first: "Ross", last: "Smith"};
```

Great for creating objects starting with default values and is a more concise alternative to `Object.assign`.

``` javascript
var defaults = {job: "Developer", ownsCat: true, ownsDog: true};

var clint = {...defaults, ownsCat: false};
var ross = {...defaults, ownsDog: false};
```

Quite common in React and Redux.

## Recap

* ES2016 provides the exponentiation (`**`) operator and `[].includes`.
* ES2017 provides helpful string methods and introduces async functions.
* The `async`/`await` keywords in ES2017 allow for writing synchronous looking functions that under the hood are asynchronous.
* We can combine async functions with `Promise.all` to create readable synchronous "looking" code.
* The Object `rest` and `spread` (`...`) operator are proposed changes to JavaScript. (Not yet in the language, but upcoming changes)