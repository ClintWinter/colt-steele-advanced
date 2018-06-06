# ES2015 Part 2

## Objectives

* Refactor object oriented code to use the class, extends, and super keywords.
* Understand how to use new data structures in ES2015.
* Refactor asynchronous code using the native Promise constructor and create functions that can pause and resume execution with generators.
* Utilize helpful ES2015 methods for copying objects, converting array-like-objects into arrays and handling issues with `NaN`.
* Examine two new features to ES2016.
* Use new string methods and refactor code using ES2017 async functions.
* Introduce the spread and rest operator for objects.

## Class

* A new reserved keyword provided by ES2015.
* The class keyword creates a constant - can not be redeclared.
* The class keyword is an abstraction of constructor functions and prototypes. JavaScript does not have built in support for object oriented programming.
* The class keyword does not hoist.
* Still use `new` keyword to create objects.

### ES5 Object Oriented

``` javascript
function Student(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

var clint = new Student("Clint", "Winter");
```

* Create a constructor function
* Use the `new` keyword to create objects

### ES2015 Object Oriented

``` javascript
class Student {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

var clint = new Student("Clint", "Winter"); // same as ES5
```

* `constructor` is just like `__construct()` in PHP. It is invoked when an instance of the class is created.
* Use the `class` keyword instead of creating a function.
* Inside, use a special method `constructor` which is run when `new` is used.
* Still use the `new` keywords to create objects.

### ES5 Instance Methods

``` javascript
function Student(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Student.prototype.sayHello = function() {
    return "Hello " + this.firstName + " " + this.lastName;
}
```

Shared methods and properties are placed directly on the function's prototype property.

### ES2015 Instance Methods

my guess:
``` javascript
class Student {
    // I'm fairly sure we would be able to use object shorthand notation here.
    constructor(firstName, lastName) {
        firstName,
        lastName
    }

    sayHello() {
        return `Hello ${this.firstName} ${this.lastName}`;
    }
}
```

I was somewhat correct.

We actually can't use the shorthand in the constructor function like we do with ES5 constructor functions, which is kind of silly.

``` javascript
class Student {
    constructor(firstName, lastName) {
        this.firstName = firstName,
        this.lastName = lastName
    }

    sayHello() {
        return `Hello ${this.firstName} ${this.lastName}`;
    }
}
```

* Placed inside of class keyword
* No `function` keywords - similar to object shorthand notation
* Under the hood it is placing methods on the prototype object.

### ES5 Class Methods

``` javascript
function Student(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Student.prototype.sayHello = function() {
    return "Hello " + this.firstName + " " + this.lastName;
}

Student.isStudent = function(obj) {
    return obj.constructor === Student;
}
```

Class methods are placed directly on the constructor function.

### ES2015 Class Methods

``` javascript
class Student {
    constructor(firstName, lastName) {
        this.firstName = firstName,
        this.lastName = lastName
    }

    sayHello() {
        return `Hello ${this.firstName} ${this.lastName}`;
    }

    static isStudent(obj) {
        return obj.constructor === Student;
    }
}

Student.isStudent(s); // true
Student.isStudent([]); // false
```

static methods that are used by the class itself, not by instances of it. It's for when we want to use a method without having to create an instance of it. Here's an example of a built-in static method:

``` javascript
Array.isArray([]); // true

// or methods like
Object.create
Object.freeze
```

**Class Keyword Exercise**

### Inheritance

Passing along methods and properties from one class to another.

#### ES5 Inheritance

``` javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastname = lastName;
}

Person.prototype.sayHello() {
    return "Hello " + this.firstName + " " + this.lastName;
}

function Student(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
```

We learned this earlier... We take the prototype from Person then reset the constructor to Student.

``` javascript
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
```

#### ES2015 Inheritance

Use the `extends` keyword. If one class extends another, it will have all of the methods that the class which it extends from has.

``` javascript
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    sayHello() {
        return `Hello ${this.firstName} ${this.lastName}`;
    }
}

class Student extends Person {

}

Student.prototype.constructor === Student; // true
```

### Super

#### ES5 Refactoring Constructors

``` javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastname = lastName;
}

Person.prototype.sayHello() {
    return "Hello " + this.firstName + " " + this.lastName;
}

function Student(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
```

Notice the duplication in the Student constructor function... we learned this earlier too, and this is how we solved it...

#### Use Apply

``` javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastname = lastName;
}

Person.prototype.sayHello() {
    return "Hello " + this.firstName + " " + this.lastName;
}

function Student() {
    Person.apply(this, arguments);
}
```

Use `call` or `apply` in a constructor function - `apply` is handy when there are many arguments.

#### ES2015 - super

The idea behind `super` is to find a method by the same name in the parent class and invoke it for the child class. Basically the same as the solution above, but with a fancy word for it.

``` javascript
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    sayHello() {
        return `Hello ${this.firstName} ${this.lastName}`;
    }
}
```

``` javascript
class Student extends Person {
    constructor(firstName, lastName) {
        // you must use super here!
        super(firstName, lastName);
    }
}
```

### Class Keywords Recap

* Quickly create constructor functions and prototype methods using the `class` keyword.
* Add class methods using the `static` keyword
* Implement inheritance using the `extends` and `super` keywords
* ES2015 class syntax is an abstraction of using functions and objects!

## Maps

A new data structure offered by ES2015.

* Also called "hash maps" in other languages.
* Until ES2015 - objects were replacements for maps.
* Similar to objects, except the keys can be ANY data type!
* Created using the `new` keyword.

``` javascript
var firstMap = new Map;
firstMap.set(1, 'Clint');
firstMap.set(false, 'a boolean');
firstMap.set('nice', 'a string');
firstMap.delete('nice');
firstMap.size; // 2
```

Keys can be any type!

``` javascript
var arrayKey = [];
firstMap.set(arrayKey, [1, 2, 3, 4, 5]);

var objectKey = {};
firstMap.set(objectKey, {a:1});
```

### Extracting Values

``` javascript
firstMap.get(1); // 'Clint'
firstMap.get(false); // 'a boolean'
firstMap.get(arrayKey); // [1, 2, 3, 4, 5]
firstMap.get(objectKey); // {a: 1}
```

We can easily iterate over the map!

``` javascript
firstMap.forEach(v => console.log(v));

// Clint
// a boolean
// [1, 2, 3, 4, 5]
// {a: 1}
```

### Iterating over a Map

Maps implement a `Symbol.iterator` which means we can use a `for...of` loop!

``` javascript
firstMap.values(); // MapInterator of values
firstMap.keys(); // MapIterator of keys
```

### Why use maps?

* Finding the size is easy - no more loops or Object.keys();
* The keys can be any data type!
* You can accidentally overwrite kyes on the `Object.prototype` in an object you make - maps do not have that issue.
* Iterating over keys and values in a map is quite easy as well.

### When to use a map

* If you need to look up keys dynamically (they are not hard coded strings).
* If you need keys that are not strings!
* If you are frequently adding and removing key/value pairs.
* Are key-value pairs frequently added or removed?

### WeakMap

* Similar to a map, but all keys MUST be objects.
* Values in a WeakMap can be cleared from memory if there is no reference to them.
* More performant than maps, but can not be iterated over.

## Sets

Another new data structure offered by ES2015.

* All values in a set are unique.
* Any type of value can exist in a set.
* Created using the `new` keyword.
* Exist in quite a few other languages, ES2015 finally brings them to JavaScript.

### Syntax

``` javascript
var s = new Set;

// can also be created from an array
var s2 = new Set([3, 1, 4, 1, 2, 1, 5]); // {3, 1, 4, 2, 5}
```

``` javascript
s.add(10); // {10}
s.add(20); // {20, 10}
s.add(10); // {20, 10}

s.size; // 2
```

``` javascript
s.has(10); // true

s.delete(20); // true

s.size; // 1
```

``` javascript
// Sets implement a Symbol.iterator
s2[Symbol.iterator]; // function(){}...
// We can use a for...of loop!
```

### WeakSet

* Similar to a set, but all values MUST be objects.
* Values in a WeakSet can be cleared from memory if there is no reference to them.
* More performant than sets, but can not be iterated over.

## Promises

Some review:
* A one time guaranteed return of some future value.
* When that value is figured out - the promise is resolved/fulfilled or rejected.
* Friendly way to refactor callback code
* Libraries have implemented Promises for a while, ES2015 is a little late to the game.

### Story Time

* You're hungry - so you go to McDonalds.
* You place your order and get a ticket (a promise).
* You move out of the way so other people can order while your order is processed.
* After some time, you either get your food and the ticket (promise) is resolved or you do not get your food and the ticket (promise) is rejected.
* If you want another order - you need a new ticket (promise)!

### Where have you seen promises before?

* jQuery implemented its own version of a promise called deferred. jQuery version 3 now supports native promises.
* Many JavaScript libraries and frameworks (Node, Angular) use popular promise libraries like q and bluebird.

### We can now create our own promises!

* Created using the `new` keyword.
* Every promise constructor accepts a callback function which contains two parameters, resolve and reject.
* You can call these parameters whatever you like, resolve and reject are most common.
* These parameters are both functions to be run if the promise is resolved or rejected.

### A Simple Example

``` javascript
function displayAtRandomTime() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (Math.random() > .5) {
                resolve('Yes!');
            } else {
                reject('No!');
            }
        }, 1000)
    });
}
```

The returned value from a promise will always contain a `.then` and `.catch` method which are funtions to be executed when the promise is resolved or rejected.

``` javascript
displayAtRandomTime().then(function(value) {
    console.log(value);
}).catch(function(error) {
    console.log(error);
});
```

Run this in the console and see how it works.

### Returning Promises

Since a promise always returns something that has a `.then` (thenable) - we can chain promises together and return values from one promise to another!

What we will try to do is build an array of years that movies were released and print out the array when we are done building it up.

We will use the omdb api to do this.

``` javascript
var years = [];
$.getJSON('https://omdbapi.com?t=titanic&apikey=thewdb')
    .then(function(movie) {
        years.push(movie.Year);
        return $.getJSON('https://omdbapi.com?t=shrek&apikey=thewdb');
    })
    .then(function(movie) {
        years.push(movie.Year);
        console.log(years);
    });

console.log('ALL DONE!');

// "ALL DONE!"
// ["1997", "2001"]
```

### Promise.all

* Accepts an array of promises and resolves all of them or rejects once a single one of the promises as been first rejected (fail fast).
* If all of the passed-in promises fulfill, `Promise.all` is fulfilled with an array of the values from the passed-in promises, in the same order as the promises passed in.
* You may have seen something like this with $.when in jQuery or Q.
* The promises dont resolve sequentially, but `Promise.all` waits for them.

Let's make a function that returns a promise.

``` javascript
function getMovie(title) {
    return $.getJSON(`https://omdbapi.com?t=${title}&apikey=thewdb`);
}

var titanicPromise = getMovie('titanic');
var shrekPromise = getMovie('shrek');
var braveheartPromise = getMovie('braveheart');
```

We can now resolve all of the promises using `Promise.all`.

``` javascript
Promise.all([titanicPromise, shrekPromise, braveheartPromise]).then(function(movies) {
    return movies.forEach(function(value) {
        console.log(value.Year);
    });
});
```

## Generators

* A special kind of function which can pause execution and resume at any time.
* Created using a *.
* When invoked, a generator object is returned to us with the keys of `value` and `done`.
* `value` is what is returned from the paused function using the `yield` keyword.
* `done` is a boolean which returns true when the function has completed.

### Our First Generator

``` javascript
function* pauseAndReturnValues(num) {
    for (ley i = 0; i < num; i++) {
        yield i;
    }
}
```

``` javascript
// assigning the function returns a generator object
var gen = pauseAndReturnValues(5);
```

``` javascript
gen.next(); // {value: 0, done: false}
gen.next(); // {value: 1, done: false}
gen.next(); // {value: 2, done: false}
gen.next(); // {value: 3, done: false}
gen.next(); // {value: 4, done: false}
gen.next(); // {value: undefined, done: true}
```

### Yield Multiple Values

We can place multiple yield keywords inside of a generator function to pause multiple times!

``` javascript
function* printValues() {
    yield "First";
    yield "Second";
    yield "Third";
}

var g = printValues();
g.next().value; // "First"
g.next().value; // "Second"
g.next().value; // "Third"
```


### Iterating over a Generator

Since generators implement a Symbol.iterator property we can use a `for...of` loop!

``` javascript
function* pauseAndReturnValues(num) {
    for (let i = 0; i < num; i++) {
        yield i;
    }
}

for (val of pauseAndReturnValues(3)) {
    console.log(val);
}

// 0
// 1
// 2
```

### Async Generators

We can use generators to pause asynchronous code!

``` javascript
function* getMovieData(movieName) {
    console.log('starting');
    yield $.getJSON(`https://omdbapi.com?t=${movieName}&apikey=thewdb`);
    console.log('ending');
}
```

The next value returned is a promise so let's resolve it!

``` javascript
var movieGetter = getMovieData('titanic');
movieGetter.next().value.then(val => console.log(val));
```

## Object.Assign

When we assign a new variable to an already existing variable referencing an object, we are referencing the same object. That means when we change a property for the new one, we change it for the old one too.

``` javascript
// ES5
var o = {name: "Clint"};
var o2 = o;
o2.name = "Ross";
o; // {name: "Ross"}
```

`Object.assign` creates copies of objects without the same reference.

``` javascript
// ES2015
var o = {name: "Clint"};
var o2 = Object.assign({}, o);

o2.name = "Ross";
o.name; // "Clint"
```

### Not a Deep Clone

If there are objects *inside* the referenced object, changes made on the newly created object will be there on the old one.

``` javascript
var o = {instructor: ["Clint", "Ross"]};
var o2 = Object.assign({}, o);

o2.instructors.push("Jake");
o.instructors; // ["Clint", "Ross", "Jake"]
```

## Array.from

Converts an array-like-object into an array.

``` javascript
// ES5
var divs = document.getElementsByTagname("div"); // returns an array-like-object

divs.reduce // undefined, since it is not an actual array

// how it was done with ES5 using call
var converted = Array.prototype.slice.call(divs);
converted.reduce // function reduce(){...}
```

Notice `.from` is used directly on the `Array` constructor. This is another example of a static method.

### Using Array.from

``` javascript
// ES2015

var divs = document.getElementsByTagName("div");
var converted - Array.from(divs);
```

Convert different types of objects into arrays

``` javascript
var firstSet = new Set([1, 2, 3, 4, 3, 2, 1]); // {1, 2, 3, 4}
var arrayFromSet = Array.from(firstSet); // [1, 2, 3, 4]
```

## Find

* Invoked on arrays
* Accepts a callback with value, index and array (just like `forEach`, `map`, `filter`, etc.)
* Returns the value found or undefined if not found.

``` javascript
var instructors = [{name: "Clint"}, {name: "Ross"}, {name: "Danny"}, {name: "Jake"}];
instructors.find(function(val) {
    return val.name === "Ross";
}); // {name: "Ross"}
```

## findIndex

* Similar to find, but returns an index or -1 if the value is not found.

``` javascript
var instructors = [{name: "Clint"}, {name: "Ross"}, {name: "Danny"}, {name: "Jake"}];
instructors.findIndex(function(val) {
    return val.name === "Ross";
}); // 1
```

## Includes

Returns a boolean if a value is in a string - easier than using `indexOf`.

``` javascript
// ES5
"awesome".indexOf("some") > -1 // true
```

``` javascript
// ES2015
"awesome".includes("some"); // true
```

## Number.isFinite

A static method on the `Number` constructor. A handy way for handling `NaN` being a `typeof` number. It gets messy when we want to check if a number is a number and also not `NaN`:

``` javascript
// ES5
function seeIfNumber(val) {
    if (typeof val === "number" && !isNaN(val)) {
        return "It is a number!";
    }
}
```

``` javascript
// ES2015
function seeIfNumber(val) {
    if (Number.isFinite(val)) {
        return "It is a number!";
    }
}
```

## Recap

* The `Map` data structure is useful when creating key value pairs and the keys are not strings.
* `Sets` are useful for creating unique data sets and do not require key value pairs.
* The ES2015 `Promise` constructor allows for creating promises and resolving an array of promises with `Promise.all`.
* Generators are valuable when creating functions or methods that can pause and resume at any time.
* ES2015 provides a few useful methods for converting array like objects into arrays, making shallow copies of objects, and handling issues with `NaN` and `typeof` number.