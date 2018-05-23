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