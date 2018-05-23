# Closures and 'This'


## Closures

Objectives:

* Understand what a closure is and what it is not
* Use a closure to emulate private variables
* List use cases for closures in the real world

A **closure** is a function that makes use of variables defined in outer functions that have previously returned.

``` javascript
function outer() {
    var start = "Closures are";
    return function inner() {
        return start + " awesome";
    }
}

outer();
// returns:
/*
function inner() {
    return start + " awesome";
}
*/

outer()(); // Closures are awesome
```

Our first closure

``` javascript
function outer(a) {
    return function inner(b) {
        // the inner function is making use of the variable "a"
        // which was defined in an outer function called "outer"
        // and by the time inner is called, that outer function has returned
        // this function called "inner" as a closure.
        return a + b;
    }
}

outer(5)(5); // 10

var storeOuter = outer(5);

storeOuter(10); // 15
```

A couple things to note:

* We have to return the inner function for this to work.
* We can either call the inner function right away by using an extra `()` or we can store the result of the function in a variable.
* We do NOT have to give the inner function a name - we can make it anonymous (we called in "inner" for learning purposes).

### Your Turn

Is this a closure?

``` javascript
function outerFn() {
    var data = "something from outer";
    return function innerFn() {
        return "Just returned from the inner function";
    }
}
```

The answer is NO (I got it right!) because the inner function has to make use of a variable declared in the outer function.

Another test:

``` javascript
function outerFn() {
    var data = "something from outer";
    return function innerFn() {
        var innerData = "something from inner";
        return data + " " + innerData;
    }
}
```

This one is (also right!). A closure only exists when an inner function makes use of variables defined from an outer function that has returned. If the inner function does not make use of any external variables, all we have is a nested function.

### How Closures Work

Only variables used in the inner function are remembered!

``` javascript
function o() {
    var data = "something from outer fn";
    var fact = "Remember me!";
    return function i() {
        // if you keep the chrome dev tools open
        // this will pause our code and place us
        // in the sources tab where we can examine variables
        debugger;
        return fact;
    }
}

var outer = o();
outer();
```

In this example you'll see that `fact` is remembered, but not `data`. Closures don't remember everything from an outer function - just the variables they need.

### Why Do I Need To Know This?

So what are some other cases for closures? Can you think of some?

### Private Variables

In other languages, there exists support for variables that can not be modified externally. We call those private variables, but in JavaScript we don't have that built in. No worries - closures can help.

``` javascript
function counter() {
    var count = 0;
    return function inner() {
        count++;
        return count;
    }
}

var counter1 = counter();
counter1(); // 1
counter1(); // 2
counter1(); // 3

var counter2 = counter();
counter2(); // 1

counter1(); // 4
counter2(); // 2

count; // undefined
```

### More Privacy

``` javascript
function classroom() {
    var instructors = ["Clint", "Ross"];
    return {
        getInstructors: function() {
            return instructors;
        },
        addInstructors: function(instructor) {
            instructors.push(instructor);
            return instructors;
        }
    }
}

var course1 = classroom();
course1.getInstructors(); // ["Clint", "Ross"]
course1.addInstructors("Danny"); // ["Clint", "Ross", "Danny"]
course1.getInstructors(); // ["Clint", "Ross", "Danny"]
```

There is a loophole, though. We can modify the instructors array by performing methods on the `getInstructors` method:

``` javascript
course1.getInstructors().pop(); // Danny
course1.getInstructors(); // ["Clint" , "Ross"]
```

How can we prevent this?

#### Correct Implementation

We now return a copy instead of giving the original that someone can manipulate.

``` javascript
function classroom() {
    var instructors = ["Clint", "Ross"];
    return {
        getInstructors: function() {
            return instructors.slice();
        },
        addInstructors: function(instructor) {
            instructors.push(instructor);
            return instructors.slice();
        }
    }
}

var c1 = classroom();
c1.getInstructors(); // ["Clint", "Ross"]
c1.getInstructors().pop(); // Ross
c1.getInstructors().pop(); // Ross
c1.getInstructors(); // ["Clint", "Ross"]
```

### Closures Recap

* Closure exists when an inner function makes use of variables declared in an outer function which has previously returned
* Closure does not exist if you do not return an inner function and if that inner function does not make use of variables returned by an outer function.
* JavaScript will only remember values that are being used inside of the inner function, not all variable defined in the outer function.
* We can use closures to create private variables and write better code that isolates our logic and application.

## The Keyword 'this'

Objectives:

* Define what the keyword `this` is
* Understand the four ways to always figure out what the keyword `this` is

### So what is 'this'?

* A reserved keyword in JavaScript
* Usually determined by how a function is called (what we call 'execution context')
* Every time a function is run, 2 special keywords are given to that function: `this` and `arguments`
* Can be determined using four rules (global, object/implicit, explicit, new)

### 4 Rules

#### 1 - Global Context

When `this` is not inside of a declared object, `this` refers to the global object. Which, in the browser's case, is `window`.

``` javascript
console.log(this); // window
```

In fact, every variable you declare in the global scope is attached to the window.

``` javascript
var x = 10;

console.log(window.x); // 10

x === window.x; // true
```

``` javascript
function whatIsThis() {
    return this;
}

whatIsThis(); // window

// You would think 'this' wouldn't be window, but
// this is not inside of a newly declared object.
// Functions may be objects but it has to be declared
// with the 'new' keyword to change the definition of 'this'
```

``` javascript
function variablesInThis() {
    this.person = "Elie";
}

variablesInThis(); // the keyword 'this' inside the function is the window

// if 'this' is window, then that means 'person' is in the global scope
// so after  the function is invoked we can use 'person' like a normal variable.

console.log(person); // Elie
```

**Strict Mode** doesn't allow the declaration of variables in the global scope

``` javascript
"use strict";

console.log(this); // window

function whatIsThis() {
    return this;
}

whatIsThis(); // undefined
```

``` javascript
"use strict";

function variablesInThis() {
    // can't add variables to the global scope in strict mode.
    // 'this' is the window object because it's not a newly declared object
    this.person = "Elie";
}

variablesInThis(); // TypeError, can't set 'person' on undefined
```

#### 2 - Object/Implicit Context

When the keyword `this` IS inside of a declared object.

``` javascript
// strict mode does not make a difference here

var person = {
    firstName: "Clint",
    sayHi: function() {
        return "Hi " + this.firstName;
    },
    determineContext: function() {
        return this === person;
    }
};

person.sayHi(); // "Hi Clint"
person.determineContext(); // true
```

What should the keyword `this` refer to here?

``` javascript
var person = {
    firstName: "Clint",
    determineContext: this;
};

person.determineContext === person; // false
```

Why isn't `this` equal to the object?

**A keyword `this` is defined when a function is run!** There is not a function being run here to create a new value of the keyword `this` so the value of `this` is still the window.

##### Nested Objects

What happens when we have a nested object?

``` javascript
var person = {

    firstName: "Clint",

    sayHi: function() {
        return "Hi " + this.firstName;
    },

    determineContext: function() {
        return this === person;
    },

    dog: {

        sayHello: function() {
            return "Hello " + this.firstName;
        },

        determineContext: function() {
            return this === person;
        }

    }

};

person.sayHi(); // "Hi Colt"
person.determineContext(); // true

person.dog.sayHello(); // My guess: we get an error because this is referring to dog and firstName is not defined
person.dog.determineContext(); // My guess: false because this refers to the last object it is in and if a function 
                                // is declared, which I believe are both fulfilled.
```

> **The implicit rule states that the closest object is the one that determines the definition of `this`, so therefore `dog` is the object that `this` refers to in this instance.**

I made a basic javascript mistake in my guess. `dog.firstName` is `undefined` and that won't give an error, it will just print `"Hello undefined"`. My second answer was correct.

#### 3 - Explicit Binding

Choose what we want the context of `this` to be using `call`, `apply` or `bind`. **These methods can _only_ be used by functions.**

| Name of Method | Parameters | Invoke Immediately? |
| --- | --- | --- |
| `call()` | thisArg, a, b, c, d, ...| Yes |
| `apply()` | thisArg, [a, b, c, d, ...] | Yes |
| `bind()` | thisArg, a, b, c, d,... | No |

`thisArg` is the value we pass for what we want `this` to be. The other parameters are the arguments we are passing to the function.

``` javascript
function firstFunction() {
    return "hello";
}

firstFunction; // without invoking it with () returns the function definition:
/*
function firstFunction() {
    return "hello";
}
*/
```

This example is just saying how `bind` allows us to set the values we want without calling the function. We are setting it now so it is how we want it to be when we call it in the future.

##### Fixing Up With Call

Let's see if we can repair our previous issue using `call`.

``` javascript
var person = {

    firstName: "Clint",

    sayHi: function() {
        return "Hi " + this.firstName;
    },

    determineContext: function() {
        return this === person;
    },

    dog: {

        sayHello: function() {
            return "Hello " + this.firstName;
        },

        determineContext: function() {
            return this === person;
        }

    }

};
```

``` javascript
person.dog.sayHello.call(person); // Hello Clint
person.dog.determineContext.call(person); // true

// Notice that we do not invoke sayHello or determineContext. Call automatically invokes the function when used.
```

##### Using Call in the Wild

Let's examine a very common use case

``` javascript
var clint = {
    firstName: "Clint",
    sayHi: function() {
        return "Hi " + this.firstName;
    }
};

var ross = {
    firstName: "Ross",
    // Look at all this duplication :(
    sayHi: function() {
        return "Hi " + this.firstName;
    }
};

clint.sayHi(); // Hi Clint
ross.sayHi(); // Hi Ross
```

How can we refactor this duplication using call?

How can we "borrow" the sayHi functino from clint and set the value of `this` to be ross?

``` javascript
var clint = {
    firstName: "Clint",
    sayHi: function() {
        return "Hi " + this.firstName;
    }
};

var ross = {firstName: "Ross"};

clint.sayHi(); // Hi Clint
clint.sayHi.call(ross); // Hi Ross
```

##### One Step Further

Let's make a `sayHi` function for anyone!

``` javascript
function sayHi() {
    return "Hi " + this.firstName;
}

var clint = {
    firstName: "Clint"
};

var ross = {
    firstName: "Ross"
};

sayHi.call(clint); // Hi Clint
sayHi.call(ross); // Hi Ross
```

##### Another Use Case For Call

Let's imagine we want to select all the `divs` on a page.

``` javascript
var divs = document.getElementsByTagName('div');
```

How can we find all the divs that have the text "Hello" and return an array of them? Using filter would be nice!

``` javascript
divs.filter // undefined
```

The `divs` variable is not an array, it's an array-like-object so `filter` won't work.

So how can we convert an array-like-object into an array?

Very similar to the way we make copies of arrays - using slice!

`call` to the rescue! Let's use the slice method on arrays, but instead of the target of slice (the keyword `this`) being that array, let's set the target of `this` to be our divs array-like-object.

``` javascript
var divsArray = [].slice.call(divs);
// also commonly seen is:
Array.prototype.slice.call(divs);

// both do the same thing
```

And now we can use the `filter` method.

``` javascript
divsArray.filter(function(val) {
    return val.innerText === "Hello";
});
```

What we are doing is trying to slice something that is not actually an array! In JavaScript, slice will not work on all data types, but it works very well on array-like-objects.

##### What about Apply?

``` javascript
function sayHi() {
    return "Hi " + this.firstName;
}

var clint = {
    firstName: "Clint"
};

var ross = {
    firstName: "Ross"
};

sayHi.call(clint); // Hi Clint
sayHi.apply(ross); // Hi Ross

// well this seems the same...
```

It seems identical... but what happens if we start adding parameters?

##### Let's Add Parameters!

It's almost identical to call - except the parameters!

``` javascript
function addNumbers(a, b, c, d) {
    return this.fn + " just calculated " + (a+b+c+d);
}

var clint = {
    fn: "Clint"
};

var ross = {
    fn: "Ross"
};

addNumbers.call(clint, 1, 2, 3, 4); // Clint just calculated 10
addNumbers.apply(ross, [1, 2, 3, 4]); // Ross just calculated 10
```

##### When to use Apply

When a function does not accept an array, apply will spread out values in an array for us

``` javascript
var nums = [5, 7, 1, 4, 2];
Math.max(nums); // NaN
// Math.max does not accept an array
```

``` javascript
Math.max.apply(this, nums); // 7
```

``` javascript
function sumValues(a, b, c) {
    return a + b + c;
}

var values = [4, 1, 2];

sumValues(values); // 4,1,2undefinedundefined
// not compatible with an array
// instead of having to pull all the values out of the array, we can just use apply to automatically do it for us.

sumValues.apply(this, values); // 7
```

##### And What About Bind?

The parameters work like call, but `bind` returns a function with the context of `this` bound already!

``` javascript
function addNumbers(a, b, c, d) {
    return this.firstName + " just calculated " + (a, b, c, d);
}

var clint = {
    fn: "Clint"
};

var clintCalc = addNumbers.bind(clint, 1, 2, 3, 4); // function(){...}
clintCalc(); // Clint just calculated 10
```

`bind` is useful when we don't know all of the parameters of the function right away.

``` javascript
var clintCalc = addNumbers.bind(clint, 1, 2); // function(){...}
clintCalc(3, 4); // Clint just calculated 10
```

##### Bind in the Wild

`bind` is commonly used in asynchronous code. Very commonly we lose the context of `this`, but in functions that we do not want to execute right away!

``` javascript
var clint = {
    fn: "Clint",
    sayHi: function() {
        setTimeout(function() {
            console.log("Hi " + this.fn);
        }, 1000);
    }
};
```

Because the `setTimeout` is called at a later point in time (1 second later), the object that it is attached to is actually the global object (window). Even though it's inside the `clint` object, `setTimeout` is a window function.

``` javascript
clint.sayHi(); // Hi undefined (1000 milliseconds later)
```

Use `bind` to set the correct context of `this`.

``` javascript
var clint = {
    fn: "Clint",
    sayHi: function() {
        setTimeout(function() {
            console.log("Hi " + this.fn);
        }.bind(this), 1000); // you could also pass it 'clint'
    }
};

clint.sayHi(); // Hi Clint (1000 milliseconds later)
```

#### 4 - The `new` Keyword

We can set the context of the keyword `this` using the `new` keyword - it does quite a bit more as well which we will discuss further when we talk about OOP.

``` javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

var clint = new Person("Clint", "Winter");
```

## RECAP

* The keyword `this` is a reserved keyword in JavaScript and its value is determined at execution.
* It is either set using the global context, object binding, explicit binding, or the `new` keyword.
* When set in the global context in a function, it is either the global object (window if in the browser) or undefined (if we are using strict mode).
* To explicitly set the value of the keyword `this`, we can use `call`, `apply`, or `bind`.
* We can also use the `new` keyword to set the context of `this`, which we will discuss when we talk about Object Oriented Programming.