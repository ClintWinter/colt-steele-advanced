# ES2015 - Part 1

**Objectives:**

* Understand what ES2015 is and how the term came to be.
* Refactor code to use `let` and `const` and explain the implications of using both.
* Use template strings to avoid string concatenation in your JavaScript code.
* Use arrow functions to write shorter functions and compare arrow functions and the function keyword.
* Use ES2015 object enhancements to refactor code.
* Explain what ES2015 default parameters are and how to use them.
* Compare and contrast the rest and spread operators.
* Unpack values from arrays and objects using destructuring.

## JavaScript Timeline

1995/1996 - Start  
1997 - ES1
1998 - ES2
1999 - ES3
2009 - ES5
2015 - ES6/ES2015
2016 - ES2016
2017 - ES2017

## ES2015 Additions

* let, const
* template strings
* arrow functions
* default parameters
* rest and spread operators
* for...of loops
* object shorthand notation
* computed property names
* object destructuring
* array destructuring
* class keyword
* super and extends keywords
* Maps/Sets
* Promises
* Generators
* Object, Number, Array methods

## const

An alternative to the `var` keyword that allows us to create **constants**. Once declared, they cannot be redeclared.

``` javascript
var firstInstructor = "Clint";

firstInstructor = "Ross"; // no problem
```

``` javascript
const anotherInstructor = "Clint";

anotherInstructor = "Ross"; // TypeError

const anotherInstrcutor = "Ross"; // SyntaxError
```

### Gotcha with const

You may not be able to change the value of a constant with a primitive value, but if set to an array it can be modified. Even though it can be mutated, it still cannot be redeclared.

``` javascript
const numbers = [1, 2, 3, 4];

numbers.push(10); // 5

numbers; // [1, 2, 3, 4, 5]

numbers = "no!"; // TypeError
```

## let

`let` allows the reassignment of a variable, but not the redeclaration.

``` javascript
let anotherInstructor = "Clint";

anotherInstructor = "Ross"; // no problem

let anotherInstructor = "Clint"; // SyntaxError
```

### Scope with let

``` javascript
var instructor = "Clint";

if (instructor === "Clint") {
    let funFact = "Plays the Cello";
}

funFact; // ReferenceError!
```

`let` creates a new scope called **block scope**. Before ES2015, there was *global* and *function* scope, variables declared in the global scope could be used anywhere while variables declared (using the `var` keyword) in the function scope could only be used in that function. There are a few keywords that allow us to create blocks in JavaScript. Some of those are `if`, `for`, `while`, `do`, `try`, `catch`. If we use the `let` keywords inside those blocks, we create our own type of scope.

### Hoisting with let

When we write a function and declare a variable inside using `var`, and we declare the variable *after* the return statement, JavaScript will **hoist** the variable declaration to the top, but only the declaration. It does not assign the value as well, so our function would return undefined.

``` javascript
function helloInstructor() {
    return clint;
    var clint = "ME!";
}

helloInstructor(); // undefined

// the same as writing this:
function helloInstructor() {
    var clint;
    return clint;
    clint = "ME!";
}
```

``` javascript
function helloInstructor() {
    return clint;
    let clint = "ME!";
}

helloInstructor(); // ReferenceError
```

`let` does hoist, but we can not access the value - it is in a TDZ (Temporal Dead Zone)

### Use Cases for let

``` javascript
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}

// 5 (five times)
```

You would think in the above code, 0 through 4 would be console logged. But what is actually happening is the for loop is already done running by the time `setTimeout` begins to print the value of `i`, which is already at the end of the loop and with a value of 5. Let's refactor with `let`.

``` javascript
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}

// 0
// 1
// 2
// 3
// 4
```

With `let` a new variable is created for each iteration of the loop, allowing it to work how we intended it. With `var` a single variable is created globally for this loop.

## Template Strings

Concatenating strings with values can be messy and error prone:

``` javascript
var firstName = "Clint";

var lastName = "Summer";

console.log("Hello " + firstName + " " + lastName); // Error prone!
```

In ES2015 we have an easier way to handle this need, **template strings**.

``` javascript
console.log(`Hello ${firstName} ${lastName}`); // Much nicer!
```

**NOTE:** Make sure you are using the backticks for this!

### Multi-line Strings

``` javascript
"
Hello
" // Does not work!

`
Hello
How
Nice
Is
This!
` // Works well!
```

## Arrow Functions

``` javascript
// ES5
var add = function(a, b) {
    return a + b;
};
```

Replace the keyword `function` with `=>`.

``` javascript
// ES2015
var add = (a, b) => {
    return a + b;
};
```

### One-line Arrow Functions

* You can put arrow functions on one line.
* But you must omit the return keyword as well as curly braces.

``` javascript
var add = (a, b) => a + b;
```

### Refactoring With Arrow Functions

We can go from:

``` javascript
// ES5
[1, 2, 3].map(function(value) {
    return value * 2;
}); // [2, 4, 6]
```

To:

``` javascript
[1, 2, 3].map((value) => value * 2); // [2, 4, 6]
```

Or we can go from:

``` javascript
function doubleAndFilter(arr) {
    return arr.map(function(value) {
        return value * 2;
    }).filter(function(value) {
        return value % 3 === 0;
    });
}

doubleAndFilter([5, 10, 15, 20]); // [30]
```

To this:

``` javascript
var doubleAndFilter = arr => arr.map(value => value * 2).filter(num => num % 3 === 0);
};

doubleAndFilter([5, 10, 15, 20]); // [30]
```

**NOTE:** When you only have a single parameter, we do not need parenthesis around it with arrow functions!

``` javascript
// more than 1 parameter
(arg1, arg2) => arg1 + arg2;

// 1 parameter
arg1 => arg1 + 10;
```

### The Catch

* Arrow functions are not exactly the same as regular functions.
* Arrow functions do not get their own `this` keyword.
* Inside of an arrow function, the keyword `this` has its original meaning from the enclosing context.
* The fact that arrow functions do not have their own `this` keyword can be quite helpful - you just need to understand when you might NOT want that.

Here's a familiar situation:

``` javascript
var instructor = {
    firstName: "Clint",
    sayHi: function() {
        setTimeout(function() {
            console.log("Hello " + this.firstName);
        }, 1000);
    }
};

instructor.sayHi(); // "Hello undefined"
```

Remember that because the console log is inside `setTimeout`, `this` actually refers to the window rather than the object. This is why we used `bind` to explicitly set the value of `this`.

``` javascript
var instructor = {
    firstName: "Clint",
    sayHi: function() {
        setTimeout(function() {
            console.log("Hello " + this.firstName);
        }.bind(this), 1000);
    }
};

instructor.sayHi(); // "Hello Clint"
```

Arrow functions as an alternative:

``` javascript
var instructor = {
    firstName: "Clint",
    sayHi: function() {
        setTimeout(() => {
            console.log("Hello " + this.firstName);
        }, 1000);
    }
};

instructor.sayHi(); // Hello Clint
```

Why does this work? Arrow functions do not have their own `this` keyword. `this` refers to its enclosing context (the instructor object).

**One Quick Gotcha**

Notice that we used both the function keyword and an arrow function...why is that?

Because then our outer function also would be missing a `this` keyword and have to take *it's* enclosing context, which would be the window object again. So rather than the `setTimeout` function having an enclosing context at the method of `sayHi`, it would have an enclosing context at the window.

``` javascript
var instructor = {
    firstName: "Clint",
    sayHi: () => {
        setTimeout(() => {
            console.log("Hello " + this.firstName);
        }, 1000);
    }
};

instructor.sayHi(); // Hello undefined
```

### Arrow Functions and 'arguments'

Arrow functions do not get their own keyword arguments.

``` javascript
var add = (a, b) => {
    return arguments;
};

add(2, 4); // ReferenceError: arguments is not defined
```

An `arguments` keyword can be accessed if the arrow function is inside of another function (but it will be the outer function's arguments).

If you REALLY need the arguments to an arrow function, use the **rest operator** - we'll see that very soon.

### When NOT to use Arrow Functions

Arrow functions should NEVER be used as methods in objects since we will get the incorrect value of the keyword `this`. ES2015 provides a better alternative we will see soon.

``` javascript
var instructor = {
    firstName: "Clint",
    sayHi: () => `Hello ${this.firstname}`
};

instructor.sayHi(); // "Hello undefined"
```

## Default Parameters

``` javascript
function add(a, b) {
    return a + b;
}

add(); // NaN because a is undefined and b is undefined
```

``` javascript
var add = (a = 10, b = 20) => a + b;

add(); // 30
add(20); // 40
```

## For ... Of Loops

``` javascript
var arr = [1, 2, 3, 4, 5];

for (let val of arr) {
    console.log(val);
}

// 1
// 2
// 3
// 4
// 5
```

* Can't access an index
* Can only be used on data structures with  Symbol.iterator method implemented (no objects!)

## Rest

Collects the rest of the unused arguments in a function and returns them to us.

``` javascript
function printRest(a, b, ...c) {
    console.log(a);
    console.log(b);
    console.log(c);
}

printRest(1, 2, 3, 4, 5);
// 1
// 2
// [3, 4, 5]
```

* The rest operator always returns an array.
* Is called the rest operator "only" when it is a parameter to a function.
* Is accessed without the `...` in a function.
* A better alternative to using the `arguments` array-like-object.

### Rest Continued

``` javascript
// ES5
function sumArguments() {
    var total = 0;
    for (var i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}
```

``` javascript
// A little fancier ES5
function sumArguments() {
    var argumentsArray = [].slice.call(arguments);
    return argumentsArray.reduce(function(accumulator, nextValue) {
        return accumulator + nextValue;
    });
}
```

``` javascript
// ES2015
var sumArguments = (...args) => args.reduce((acc, next) => acc + next);
```

## Spread

* Used on arrays to spread each value out (as a comma separated value).
* Useful when you have an array, but what you are working with expects comma separated values.

``` javascript
// ES5
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = [7, 8, 9];

var combined = arr1.concat(arr2).concat(arr3);
```

``` javascript
// ES2015
var combined = [...arr1, ...arr2, ...arr3];
```

### Spread Instead of Apply

Remember when we learned we can use the `apply` method to pass functions the values of an array as arguments when it didn't accept an array? Well now we have a dedicated operator for that when using spread.

``` javascript
var arr = [3, 2, 4, 1, 5];

Math.max(arr); // NaN
```

``` javascript
// ES5
Math.max.apply(this, arr); // 5
```

``` javascript
// ES2015
Math.max(...arr); // 5
```

### One More Time

``` javascript
function sumValues (a, b, c) {
    return a + b + c;
}

var nums = [12, 15, 20];
```

``` javascript
// ES5
sumValues.apply(this, nums); // 47
```

``` javascript
// ES2015
sumValues(...nums); // 47
```

**Rest and Spread Exercises**

## Object Enhancements

### Object Shorthand Notation

``` javascript
var firstName = "Clint";
var lastName = "Summer";

// ES5
var instructor = {
    firstName: firstName,
    lastName: lastName
};
```

In ES2015, if the keys and values have the same name, we can write it shorthand like this:

``` javascript
var firstName = "Clint";
var lastName = "Summer";

// ES2015
var instructor = {
    firstName,
    lastName
};
```

### Object Method

``` javascript
// ES5
var instructor = {
    sayHello: function() {
        return "Hello!";
    }
};
```

``` javascript
// ES2015 - do NOT use arrow functions here!
var instructor = {
    sayHello() {
        return "Hello!";
    }
}
```

### Computed Property Names

``` javascript
// ES5
var firstName = "Clint";
var instructor = {};
instructor[firstName] = "That's me!";

instructor.Clint; // "That's me!"
```

Normally if we wanted to use a variables value as the key for an object property, we would have to create the object first, then use bracket notation to have it properly compute. With computed property names we can use bracket notation inside of the object itself when creating it.

``` javascript
// ES2015
var firstName = "Clint";
var instructor = {
    [firstName]: "That's me!"
};

instructor.Clint; // "That's me!"
```

## Object Destructuring

Extracting values from data stored in objects and arrays.

### ES5

``` javascript
var instructor = {
    firstName: "Clint",
    lastName: "Summer"
};
```

In ES5, this is how we would extract data from an object and create variables whose names are based off the keys of the object. 

``` javascript
var firstName = instructor.firstName;
var lastName = instructor.lastName;

firstName; // "Clint"
lastName; // "Summer"
```
Destructuring allows us to unpack values from arrays or properties from objects into distinct variables

### Object Destructuring

``` javascript
var instructor = {
    firstName: "Clint",
    lastName: "Summer"
};

var {firstName, lastName} = instructor;

firstName; // "Clint"
lastName; // "Summer"
```

What if we want to change the variable names?

``` javascript
var instructor = {
    firstName: "Clint",
    lastName: "Summer"
};

var {firstName:first, lastName:last} = instructor;

first; // "Clint"
last; // "Summer"
```

### ES5 Default Values with an Object

We are checking to see if a value for the options parameter was passed in, and if not we give it an empty object. We are then creating variables which will either be values inside of the options object or default values that we make. Finally we return an array of the properties.

``` javascript
function createInstructor(options) {
    var options = options || {};
    var name = options.name || {first: "Clint", last: "Summer"};
    var isHilarious = options.isHilarious || false;
    var [name.first, name.ast, isHilarious];
}
```

``` javascript
createInstructor(); // ["Clint", "Summer", false]
createInstructor({isHilarious: true}); // ["Clint", "Summer", true]
createInstructor({name: {first: "Ross", last: "Smith"}}); // ["Ross", "Smith", false]

// Lots of work! :(
```

### ES2015 Destructuring

``` javascript
function createInstructor({name = {first:"Clint", last:"Summer"}, isHilarious = false} = {}) {
    return [name.first, name.last, isHilarious];
}
```

* We are passing in a destructured object as a default parameter to a function.
* We are specifying the keys `name` and `isHilarious` as default values.
* At the end of the argument we are assigning the whole thing to an empty object so ES2015 knows that our default parameter is a destructured object.
* If nothing is passed in, we default to the destructured object as the parameter.

``` javascript
createInstructor(); // ["Clint", "Summer", false]
createInstructor({isHilarious: true}); // ["Clint", "Summer", true]
createInstructor({name: {first: "Ross", last: "Smith"}}); // ["Ross", "Smith", false]
```

### Object Fields as Parameters ES5

``` javascript
function displayInfo(obj) {
    return [obj.name, obj.favColor];
}
```

``` javascript
var instructor = {
    name: "Clint",
    favColor: "Blue"
};

displayInfo(instructor); // ["Clint", "Blue"]
```

### Object Fields as Parameters ES2015

``` javascript
function displayInfo({name,favColor}) {
    return [name, favColor];
}
```

``` javascript
var instructor = {
    name: "Clint",
    favColor: "Blue"
};

displayInfo(instructor); // ["Clint", "Blue"]
```

Very common in React!

## Array Destructuring

### ES5 vs ES2015

``` javascript
// ES5
var arr = [1, 2, 3];

var a = arr[0];
var b = arr[1];
var c = arr[2];

a; // 1
b; // 2
c; // 3
```

``` javascript
// ES2015
var arr = [1, 2, 3];

var [a, b, c] = arr;

a; // 1
b; // 2
c; // 3
```

Example 2:

``` javascript
// ES5
function returnNumbers(a, b) {
    return [a, b];
}

var first = returnNumbers(5, 10)[0];
var second = returnNumbers(5, 10)[1];

first; // 5
second; // 10
```

``` javascript
// ES2015
function returnNumbers(a, b) {
    return [a, b];
}

var [first, second] = returnNumbers(5, 10);

first; // 5
second; // 10
```

### Swapping Values

Common when you don't want to make a new array, but just want to switch the places of certain values.

``` javascript
// ES5
function swap(a, b) {
    var temp = a;
    a = b;
    b = temp;
    return [a, b];
}

swap(10, 5); // [5, 10]
```

``` javascript
// ES2015
function swap(a, b) {
    return [a, b] = [b, a];
}

swap (10, 5); // [5, 10]
```

## Recap

* ES2015 gives us two new keywords for declaring variables, `let` and `const`. `const` ensures we can not redeclare a variable and `let` gives us block scope.
* Easily evaluate variables in strings and create nulti-line strings with ES2015 template strings. Don't forget the backticks!
* Create more concise functions using the `=>` syntax, but these functions do not get their own `this` and `arguments` keywords.
* Gather arguments to a function as an array using the rest operator and spread out values in an array to another value or function using `...`.
* Write more concise methods and property names using shorthand notation and computed property names.
* Object destructuring is very useful for reducting duplication and passing in default parameters as a destructured object.