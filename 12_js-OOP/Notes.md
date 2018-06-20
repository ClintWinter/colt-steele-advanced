# Object Oriented Programming with JavaScript

## Objectives

* Define what OOP (Object Oriented Programming) is.
* Revisit the `new` keyword and understand the four things it does.
* Use constructor functions to reduce duplication in our code.
* Use `call` and `apply` to refactor constructor functions.

## OOP Defined

* A programming model based around the idea of objects.
* These objects are constructed from what are called *classes*, which we can think of like a blueprint. We call these objects created from classes *instances*.
* We strive to make our classes abstract and modular.

### OOP in JavaScript

JavaScript does not have these classes built into it - so what do we do?

**We use functions and objects!**

## Object Creation

Imagine we want to make a few house objects, they will all have bedrooms, bathrooms, and numSqft. The first thought would be to make an object for each house.

``` javascript
var house = {
    bedrooms: 2,
    bathrooms: 2,
    sqFeet: 1000
};

var house2 = {
    bedrooms: 2,
    bathrooms: 2,
    sqFeet: 1000
};

var house3 = {
    bedrooms: 2,
    bathrooms: 2,
    sqFeet: 1000
};

// this sucks :(
```

## Constructor Functions

Let's refactor by writing a blueprint for what this house should look like.

``` javascript
function House(bedrooms, bathrooms, numSqft) {
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.numSqft = numSqft;
}
```

Notice:

* Capitalization of the function name - this is conventional.
* The keyword `this` is back!
* We are attaching properties onto the keyword `this`. We would like the keyword `this` to refer to the object we will create from our constructor function, how might we do that?

## Creating an Object

So how do we use our construcor to create objects?

``` javascript
function House(bedrooms, bathrooms, numSqft) {
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.numSqft = numSqft;
}

var firstHouse = House(2, 2, 1000); // does this work?
firstHouse; // undefined... guess not!
```

Why is this not working?

* We are not returning anything from the function so our House function returns `undefined`.
* We are not explicitly binding the keyword `this` or placing it inside a declared object. This means the value of the keyword `this` will be the global object, which is not what we want!

## The `new` Keyword

Our solution to the problem.

``` javascript
function House(bedrooms, bathrooms, numSqft) {
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.numSqft = numSqft;
}

var firstHouse = new House(2, 2, 1000);
firstHouse.bedrooms; // 2
firstHouse.bathrooms; // 2
firstHouse.numSqft; // 1000
```

So what does the `new` keyword do? A lot more than we might think...

* It first creates an empty object
* It then sets the keyword `this` to be that empty object.
* It adds the line `return this` to the end of the function, which follows it.
* It adds a property onto the empty object called `__proto__` (dunder proto), which links the prototype property on the constructor function to the empty object (more on this later).

**An example for writing and using a constructor function can be found in directory 1.**

## Multiple Constructors

Let's create two constructor functions, one for a Car and one for a Motorcycle - here is what it might look like.

``` javascript
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    // we can also set properties on the keyword this
    // that are a preset value
    this.numWheels = 4;
}
```

``` javascript
function Motorcycle(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    // we can also set properties on the keyword this
    // that are a preset value
    this.numWheels = 2;
}
```

Notice how much duplication is going on in the `Motorcycle` function. Is there any way to "borrow" the `Car` function and invoke it inside the `Motorcycle` function?

## Using `call`/`apply`

We can refactor our code quite a bit using `call` + `apply`

``` javascript
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.numWheels = 4;
}
```

``` javascript
function Motorcycle(make, model, year) {
    Car.call(this, make, model, year);
    this.numWheels = 2;
}
```

``` javascript
// Using the apply option instead of call
function Motorcycle(make, model, year) {
    Car.apply(this, [make, model, year]);
    this.numWheels = 2;
}
```

``` javascript
// even better!
function Motorcycle() {
    Car.apply(this, arguments);
    this.numWheels = 2;
}
```

## Constructor Function Recap

* Object Oriented Programming is a model based on objects constructed from a blueprint. We use OOP to write more modular and shareable code.
* In languages that have built-in support for OOP, we call these blueprints `classes` and the objects created from them `instances`.
* Since we do not have built-in class support in JavaScript, we mimic classes by using functions. These constructor functions create objects through the use of the `new` keyword.
* We can avoid duplication in multiple constructor functions by using `call` or `apply`.

## Prototypes

### Objectives

* Understand what the prototype is.
* Describe and diagram the relationship between `__proto__`, `prototype`, and `constructor`.
* Add methods and properties on the prototype object to write more efficient code.
* Explain the differences between adding methods and properties to the prototype versus the constructor function.
* Implement inheritance in JavaScript through the prototype object.

### A Small Diagram

* Every constructor function has a property on it called "prototype", which is an object.
* The prototype object has a property on it called "constructor", which points back to the constructor function.
* Anytime an object is created using the `new` keyword, a property called `__proto__` (dunder proto) gets created, linking the object and the prototype property of the constructor function.

Let's see this in code.

``` javascript
// this is the constructor function
function Person(name) {
    this.name = name;
}

Person.prototype; // Object {constructor: function}
```

``` javascript
var clint = new Person("Clint");
var ross = new Person("Ross");

clint.__proto__ === Person.prototype; // true
```

``` javascript
Person.prototype.constructor === Person; // true
```

### Prototype

Where does the prototype property fit into all of this? Remember, the prototype is shared among all objects created by that constructor function

``` javascript
function Person(name) {
    this.name = name;
}

var clint = new Person("Clint");
var ross = new Person("Ross");

Person.prototype.isInstructor = true;

clint.isInstructor; // true
ross.isInstructor; // true

// how were we able to access properties on the prototype?

// __proto__!
```

### Prototype Chain

How does JavaScript find methods and properties?

``` javascript
var arr = [];

// same as
var arr = new Array;

// array is a built in constructor
arr.push; // function push() { [native code] }

// where is push defined?
// __proto__!

arr.__proto__ = Array.prototype; // true
```

arr -> `.__proto__` -> Array.prototype -> `.__proto__` -> Object.prototype -> `.__proto__` -> `null`

### Refactoring

Now that we know that objects created by the same constructor have a shared prototype, let's refactor some code:

``` javascript
function Person(name) {
    this.name = name;
    this.sayHi = function() {
        return "Hi " + this.name;
    }
}

clint = new Person("Clint");
clint.sayHi(); // Hi Clint
```

This code works, but it's inefficient. Every time we make an object using the `new` keyword we have to redefine the `sayHi` function.

Let's put it on the prototype instead!

``` javascript
function Person(name) {
    this.name = name;
}

Person.prototype.sayHi = function() {
    return "Hi " + this.name;
};

clint = new Person("Clint");
clint.sayHi(); // Hi Clint
```

### Challenge

* Create a constructor function for a Vehicle: every object created from this consturctor should have a `make`, `model`, and `year` property. Each object should also have a property called `isRunning`, which should be set to `false`.
* Every object created from the Vehicle constructor should have a function called `turnOn`, which changes the `isRunning` property to `true`.
* Every object created from the Vehicle constructor should have a function called `turnOff`, which changes the `isRunning` property to `false`.
* Every object created from the Vehicle constructor should have a method called `honk`, which returns the string "beep" ONLY if the `isRunning` property is `true`.

Answer is in **directory 3**.

## Inheritance

The passing of methods and properties from one class to another.

### Why?

``` javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.sayHi = function() {
    return "Hello " + this.firstName + " " + this.lastName;
};

function Student(firstName, lastName) {
    return Person.apply(this, arguments);
}

Student.prototype.sayHi = function() {
    return "Hello " + this.firstName + " " + this.lastName;
};
```

Do we really need to redefine `sayHi` on the `Student.prototype`? That seems repetitive...

### How?

``` javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.sayHi = function() {
    return "Hello " + this.firstName + " " + this.lastName;
};
```

Assign the prototype property of one object to another's!

``` javascript
function Student(firstName, lastName) {
    return Person.apply(this, arguments);
}

Student.prototype = Person.prototype;

var clint = new Student("Clint", "Summer");
clint.sayHi(); // "Hello Clint Summer"
```

It works!

### Not Exactly

Let's now add something onto the Student prototype object.

``` javascript
Student.prototype.status = function() {
    return "I am currently a student!";
}

var clint = new Person("Clint", "Summer");
clint.status(); // "I am currently a student!"
```

We want `student` to inherit from `person`. A `person` shouldn't get a status like a `student` does. The problem is when we assign one prototype to the other we are creating a reference.

An example:

``` javascript
var o = {name: "Clint"};
var o2 = o;

o2.name = "Tim";
o.name; // "Tim"
```

When we assign one object to another, we don't create a new object. We just create a reference (or a link) to the same object. That means when we change the `student` prototype, we also change the `person` prototype.

### A Better Alternative

`Object.create` creates a brand new function and accepts, as its first parameter, what the prototype object should be for the newly created object.

``` javascript
function Student(firstName, lastName) {
    return Person.apply(this, arguments);
}

Student.prototype = Object.create(Person.prototype);
```

Let's test it again and see if they are properly separated.

``` javascript
Student.prototype.status = function() {
    return "I am currently a student!";
}

var clint = new Person("Clint", "Summer");
clint.status(); // undefined
```

### Why not `new`?

This will do almost the same thing, but add additional unnecessary properties on the prototype object (since it is creating an object with undefined properties just for the prototype).

### One Missing Piece

``` javascript
function Student(firstName, lastName) {
    return Person.apply(this, arguments);
}

Student.prototype.sayHi = function() {
    return "Hello " + this.firstName + " " + this.lastName;
};

Student.prototype = Object.create(Person.prototype);

// The Student constructor is still set to Person when we set the Student prototype to the Person prototype
Student.prototype.constructor; // Person

// "Resetting the constructor" is the final part of prototypal inheritance
Student.prototype.constructor = Student;
```

Two parts of inheritance

* Set the prototype to be an object created with another prototype
* Reset the constructor property

## Recap

* Every time the `new` keyword is used, a link between the object created and the prototype property of the constructor is established - this link can be accessed using `__proto__`.
* The prototype object contains a property called constructor, which points back to the constructor function.
* To share properties and methods for objects created by a constructor function, place them in the prototype as it is the most efficient.
* To pass methods and properties from one prototype object to another, we can use inheritance which involves setting the prototype property to be a newly created object using `Object.create` and resetting the constructor property.