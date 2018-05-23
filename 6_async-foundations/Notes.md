# Async Foundations

## Callback Functions

**Objectives**

* Define callback functions
* Define higher order functions
* Use a callback function to make youre code more general
* Create callbacks using anonymous functions

### Callback Function

A **callback function** is a function that is passed into another function as a parameter then invoked by that other function.

#### Example:

``` javascript
function callback() {
    console.log("Coming from callback");
}

function higherOrder(fn) {
    console.log("About to call callback");
    fn(); // Callback function is invoked
    console.log("Callback has been invoked");
}

higherOrder(callback);
```

### Higher Order Function

A **higher order function** is a function that accepts a callback as a parameter.

#### Example:

```javascript
function callback() {
    console.log("Coming from callback");
}

function higherOrder(fn) {
    console.log("About to call callback");
    fn(); // Callback function is invoked
    console.log("Callback has been invoked");
}

higherOrder(callback);
// Yes, this example is the same as the first one.
```

### What are Callbacks Used For?

* Advanced Array Methods
* Browser events
* AJAX Requests
* React Development

#### Example

Here is code with a lot of duplication:
``` javascript
function sendMessageConsole(message) {
    console.log(message);
}

function sendMessageAlert(message) {
    alert(message);
}

function sendMessageConfirm(message) {
    return confirm(message);
}

sendMessageAlert("Lots of duplication");
```

Let's refactor to use callbacks and make the code more general:
``` javascript
function sendMessage(message, callback) {
    return callback(message);
}

sendMessage("Message for console", console.log);
sendMessage("Message for alert", alert);
var answer = sendMessage("Are you sure??", confirm);
```

Callbacks with function declarations:
``` javascript
function greet(name, formatter) {
    return "Hello, " + formatter(name);
}

function upperCaseName(name) {
    return name.toUpperCase();
}

greet("Tim", upperCaseName);
```

Callbacks with anonymous functions:
``` javascript
function greet(name, formatter) {
    return "Hello, " + formatter(name);
}

greet("Tim", function(name) {
    return name.toUpperCase();
});

greet("Tim", function(name) {
    return name + "!!!!!";
});
```

## The Stack and The Heap

**Objectives:**  

* Describe what the stack is
* Describe a stack frame
* Describe the heap

### What is the stack?

* An ordered data structure
* Keeps track of the function invocations
* Part of the JavaScript runtime (you don't access it directly)

### How Your Code Changes the Stack

Whenever you invoke a function, the details of the invocation are saved to the top of the stack (pushed to the top). When a function returns, the information about the invocation is taken off the top of the stack (popped off of the top).

#### Example

5 is the line number, the stack keeps track of where these invocations are so they can return there after it is done.

Stack: 
```
5 | function: main
```

``` javascript
function multiply(x, y) {
    return x * y;
}

var res = multiply(3, 5);
```

*Function invoked*

Stack:
``` 
2 | function: multiply
5 | function: main
```

Main is waiting on line 5 for the multiply function to complete so it can continue. The multiply function is on line 2 executing the function (x * y).

*Function completed*

Stack:
```
5 | function: main
```

*Program resolved*

Stack:
```
(empty)
```

### Stack Frame

Stack:
```
2 | function: multiply
5 | function: main
```

Each one of those lines in the stack that keeps track of the functions are called **stack frames**. They keep track of:

* The function that was invoked
* The parameters that were passed to the function
* Current line number

Now knowing this, we can describe the **stack** as: An ordered set of stack frames. The most recently invoked function is on the top of the stack. The bottom of the stack is the first function invoked. The stack is processed from top to bottom.

### The Heap

An area in memory where your data is stored.

#### Example

``` javascript
var obj = {
    firstName: "Tim",
    lastName: "Garcia"
};
```

The object is created in the heap. `obj` is a reference to the object that was created there.

``` javascript
var referenceCopy = obj;
```

Here, new data is not created, only a copy of the reference.

### Larger Stack Example

``` javascript
function upperCaseFirst(word) {
    return word[0].toUpperCase() + word.slice(1);
}

function upperCaseWords(sentence) {
    var words = sentence.split(" ");
    for (var i = 0; i < words.length; i++) {
        words[i] = upperCaseFirst(words[i]);
    }
    return words.join(" ");
}

upperCaseWords("lowercase words");
```

First we have our main function

Stack:
```
13 | function: main
```

Next, the `upperCaseWords` function is invoked

Stack:
```
6  | function: upperCaseWords
13 | function: main
```

On line 6 (first line of upperCaseWords function) we are invoking the `split` function.

Stack: 
```
?  | function: split
6  | function: upperCaseWords
13 | function: main
```

`split` resolves and comes off the stack, we move from line 6 to line 8.

Stack: 
```
6  | function: upperCaseWords
13 | function: main
```

On line 8, we invoke `upperCaseFirst` with the current element they are on (`words[i]`).

Stack: 
```
2  | function: upperCaseFirst
8  | function: upperCaseWords
13 | function: main
```

On line 2, we run `upperCaseFirst` which use `toUpperCase`

Stack: 
```
?  | function: toUpperCase
2  | function: upperCaseFirst
8  | function: upperCaseWords
13 | function: main
```

`toUpperCase` finishes and is taken off the stack.

Stack: 
```
2  | function: upperCaseFirst
8  | function: upperCaseWords
13 | function: main
```

After `toUpperCase`, `slice` is invoked.

Stack: 
```
?  | function: slice
2  | function: upperCaseFirst
8  | function: upperCaseWords
13 | function: main
```

`slice` resolved.

Stack: 
```
2  | function: upperCaseFirst
8  | function: upperCaseWords
13 | function: main
```

`upperCaseFirst` is now resolved, putting us back on line 8.

Stack: 
```
8  | function: upperCaseWords
13 | function: main
```

The line 8 section repeats twice for the second word of our sentence, but we don't need to go over that again. Now we move to line 10 to join the words together.

Stack: 
```
?  | function: join
10 | function: upperCaseWords
13 | function: main
```

`join` is completed.

Stack: 
```
10 | function: upperCaseWords
13 | function: main
```

`upperCaseWords` is done.

Stack: 
```
13 | function: main
```

## setTimeout and setInterval

**Objectives:**
* Write asynchronous code using `setTimeout`
* Write asynchronous code using `setInterval`

### setTimeout

A function that asynchronously invokes a callback after a delay in millseconds.

``` javascript
// setTimeout usage
function callback() {
    console.log("callback function");
}

var delay = 1000; // 1000ms = 1s
setTimeout(callback, delay);
```

``` javascript
setTiemout(function() {
    console.log("Runs in approx. 2000ms");
}, 2000);
```

### clearTimeout

A function that cancels a setTimeout from invoking.

``` javascript
var timerId = setTimeout(function() {
    console.log("This function runs in 30 seconds");
}, 30000);

setTimeout(function() {
    console.log("Cancelling the first setTimeout", timerId);
    clearTimeout(timerId);
}, 2000);
```

### setInterval

A function that continually invokes a callback after every X milliseconds, where X is provided to setInterval.

``` javascript
// setInterval usage
function callback() {
    console.log("callback is called continuously");
}
var repeat = 3000;
setInterval(callback, repeat);
```

``` javascript
var num = 0;
setInterval(function() {
    num++;
    console.log("num: " + num);
}, 1000);
```

### clearInterval

A function that cancels a setInterval from running.

``` javascript
var num = 0;
var intervalId = setInterval(function() {
    num++;
    console.log("num: " + num);
    if (num === 3) {
        clearInterval(intervalId);
    }
}, 1000);
```

## Event Loop and The Queue

**Objectives:**
* Define the event loop and the queue
* Describe how the event loop and the queue work with the stack
* Define Javascript as a single threaded language

### The Queue

An ordered list of functions waiting to be placed on the stack. Functions in the queue are processed on a first in, first out basis (FIFO).

### The Event Loop

Functionality in the JavaScript runtime that checks the queue when the stack is empty. If the stack is empty, the front of the queue is placed in the stack.

#### Queue Example

``` javascript
setTimeout(function() {
    console.log("Hello World");
}, 0);
```

`setTimeout` is called and placed on the stack. All `setTimeout` does is take the callback function we gave, and place it in the queue.

Stack:
```
? | function: setTimeout
1 | function: main
```

Queue:
```
function()
```

Now, `setTimeout` is finished and is popped off the stack. Then the `main` function resolves as well.

Stack:
```
```

Queue:
```
function()
```

Now how do we get our callback function into the stack? That's where the **event loop** comes in. When the stack is empty, it's job is to know this and take the function first in the queue and place it on the stack.

Stack:
```
2 | function: function
```

Queue:
```
```

Then `console.log` is placed on the stack because of it being used inside our callback.

Stack:
```
? | function: console.log
2 | function: function
```

Queue:
```
```

"Hello World" is printed to the console. Then `console.log` is resolved, and finally our callback function is finished.

Stack:
```
```

Queue:
```
```

Done!

#### Queue Example 2

``` javascript
function square(n) {
    return n * n;
}
setTimeout(function() {
    console.log("Callback is placed", "on the queue");
}, 0);
console.log(square(2));
```

An important piece of information is that when we use setTimeout and give it a delay of 0, it doesn't actually run immediately. It waits until the stack is empty before executing.

Stack:
```
4 | function: main
```

Queue:
```
```

First, invoke `setTimeout`.

Stack:
```
? | function: setTimeout
4 | function: main
```

Queue:
```
```

Then, callback function is added to the queue

Stack:
```
? | function: setTimeout
4 | function: main
```

Queue:
```
function()
```

`setTimeout` finishes and pops off the stack.

Stack:
```
4 | function: main
```

Queue:
```
function()
```

We are done with the `setTimeout` function and move on to line 7. First we invoke `square` inside the `console.log` function.

Stack:
```
2 | function: square
7 | function: main
```

Queue:
```
function()
```

`square` returns 4 and is popped off the stack.

Stack:
```
7 | function: main
```

Queue:
```
function()
```

`console.log` is placed on the stack.

Stack:
```
? | function: console.log
7 | function: main
```

Queue:
```
function()
```

4 is added to the console and `console.log` is popped off the stack.

Stack:
```
7 | function: main
```

Queue:
```
function()
```

`main` is popped off the stack as well.

Stack:
```
```

Queue:
```
function()
```

No more work to be done. The event loops kicks in when the stack is emptied and now takes the first function in the queue and places it on the stack.

Stack:
```
5 | function: function
```

Queue:
```
```

`console.log` from the callback function is placed on the stack.

Stack:
```
? | function: console.log
5 | function: function
```

Queue:
```
```

`Callback was placed on the queue` is logged to the console.

As you can see, even though `setTimeout` with a delay of 0 was invoked before the `console.log` on `square`, `setTimeout`'s callback is the last thing to be processed in the program.

### JavaScript is Single Threaded

**Single Threaded:** Code execution is linear. Code that is running cannot be interrupted by something else going on in the program.

#### Single-threaded Example

``` javascript
setTimeout(function() {
    console.log("Hello from the timeout");
}, 0);

for (var i = 0; i < 100000000; i++) {
    var x = i * 2;
}
console.log("Done with loop");
```

The point is, this for-loop is going to take a while to run. Even though `setTimeout` says it's going to take 0 seconds, it actually has to wait until the stack is empty before it gets its turn to run. Without this knowledge we would expect the `setTimeout` function to print out its message before the message after the for-loop is printed.

## Promise Basics

**Objectives:**
* Define a promise
* Add a `.then` callback to a promise
* Add a `.catch` callback to a promise
* Wrap a `setTimeout` call in a promise

### Promise: Conceptually

A promise is an object that represents a task that will be completed in the future.

Analogy: Taking a number at a deli before you can be helped. The piece of paper you get is like your promise. The help you get at the counter is like the invocation of your callback.

### Creating a Promise

``` javascript
var p1 = new Promise(function(resolve, reject) {
    resolve([1, 2, 3, 4]);
});
p1.then(function(arr) {
    console.log("Promise p1 resolved with data:", arr);
});
```

### Promise: Handling Errors

``` javascript
var p1 = new Promise(function(resolve, reject) {
    reject("ERROR");
});

p1.then(function(data) {
    console.log("Promise p1 resolved with data:", data);
}).catch(function(data) {
    console.log("Promise p1 was rejected with data:", data);
});
```

### Promise: With Randomly Occuring Errors

``` javascript
var p1 = new Promise(function(resolve, reject) {
    var num = Math.random();
    if (num < 0.5) {
        resolve(num);
    } else {
        reject(num);
    }
});

p1.then(function(result) {
    console.log("Success:", result);
}).catch(function(error) {
    console.log("Error:", error);
});
```

### Wrap setTimeout With Promise

``` javascript
var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        var randomInt = Math.floor(Math.random() * 10);
        resolve(randomInt);
    }, 4000);
});

promise.then(function(data) {
    console.log("Random int passed to resolve:", data);
});
```

### Promise Chaining

**Objectives:**
* Describe the disadvantages of using nested callbacks
* Return a promise from a `.then` callback function
* Use a promise to make asynchronous code seem sequential

### Nested Async Callbacks

An example that *doesn't* use promises.

``` javascript
var counter = 0;
setTimeout(function() {
    counter++;
    console.log("Counter:", counter);
    setTimeout(function() {
        counter++;
        console.log("Counter:", counter);
        setTimeout(function() {
            counter++;
            console.log("Counter:", counter);
        }, 3000);
    }, 2000);
}, 1000);
```

console:
```
1
2
3
```

### Disadvantages of Nested Callbacks

* The code is hard to read
* Logic is difficult to reason about
* The code is not modular

### Returning a Promise: Promise Chaining

``` javascript
var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        randomInt = Math.floor(Math.random() * 10);
        resolve(randomInt);
    }, 500);
});

promise.then(function(data) {
    console.log("Random int passed to resolve:", data);
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(Math.floor(Math.random() * 10));
        }, 3000);
    });
}).then(function(data) {
    console.log("Second random int passed to resolve:", data);
});
```

### Promise Chaining: Returning Data

``` javascript
var promise = new Promise(function(resolve, reject) {
    resolve(5);
});

promise.then(function(data) {
    return data * 2;
}).then(function(data) {
    return data + 20;
}).then(function(data) {
    console.log(data);
});
```

### Nested Callbacks: To Be Refactored

Here are the nested `setTimeout` callbacks from earlier that we will refactor into promise chaining.

``` javascript
var counter = 0;
setTimeout(function() {
    counter++;
    console.log("Counter:", counter);
    setTimeout(function() {
        counter++;
        console.log("Counter:", counter);
        setTimeout(function() {
            counter++;
            console.log("Counter:", counter);
        }, 3000);
    }, 2000);
}, 1000);
```

Step 1: Create a Function Declaration

``` javascript
var counter = 0;
function incCounter() {
    counter++;
    console.log("Counter:", counter);
}
```

Step 2: Create a runLater Function

``` javascript
var counter = 0;
function incCounter() {
    counter++;
    console.log("Counter:", counter);
}

function runLater(callback, timeInMs) {
    var p = new Promise(function(resolve, reject) {
        setTimeout(function() {
            var res = callback();
            resolve(res);
        }, timeInMs);
    });
    return p;
}
```

Step 3: Chain Promises

``` javascript
var counter = 0;
function incCounter() {
    counter++;
    console.log("Counter:", counter);
}

function runLater(callback, timeInMs) {
    var p = new Promise(function(resolve, reject) {
        setTimeout(function() {
            var res = callback();
            resolve(res);
        }, timeInMs);
    });
    return p;
}

runLater(incCounter, 1000).then(function() {
    return runLater(incCounter, 2000);
}).then(function() {
    return runLater(incCounter, 3000);
});
```

### Promises in Practice

It is useful to understand how promises work (resolve, reject), but in practice you will often use promises that are returned to you.