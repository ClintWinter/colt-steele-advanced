# Cheat Sheet for "The Advanced Web Dev Boot Camp"

## CSS Transforms & Transitions

### Pseudo-classes

A CSS **pseudo-class** is a keyword added to a selector that specifies a special state of the selected element(s). For example, `:hover` can be used to apply a style when the user hovers over a button.

[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)

``` css
div:hover {
    background: purple;
}
```

### Transforms

The **transform** CSS property lets you modify the coordinate space of the CSS visual formatting model. Using it, elements can be translated, rotated, scaled, and skewed.

[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

* translation - Move or shift an object. [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate)

``` css
div {
    transform: translate(20px, 20px); 
    /* First number is x, second number is y */
}
```

* scaling - [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale). Scale, by default, scales from the element's center. It expands or shrinks evenly on both or all sides. This can be changed by a propery called **transform-origin**. This will put the origin in the top left of the element, so it from that point, making the element grow down and to the right:

``` css
div {
    transform: scale(2);
    transform-origin: 0 0;
}

div {
    transform: scale(2);
    transform-origin: top left;
    /* Same as above example, written in an alternate form */
}
```

* rotate - **Transform-origin** also applies to rotate. By default, things rotate around their center, but we can change it to rotate around a side or a corner. It functions exactly the same as when we used it with `scale()`. [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate)

Multiple transforms:

``` css
/* WRONG */
div {
    transform: rotate(90deg);
    transform: scale(0.5);
}

/* RIGHT */
div {
    transform: rotate(90deg) scale(0.5);
}
```

### Transitions

Allow us to control animation speed when changing CSS properties.

1. `transition-duration` - How long the transition should last.
2. `transition-property` - What properties that will be transitioned.
3. `transition-timing-function` - The "acceleration curve" for the transition.
4. `transition-delay` - How long of a delay before the transition starts.

``` css
div {
    transition-duration 4s, 0.5s;
    transition-property: background, border-radius;
    /* The background transition happens over 4 seconds, the border-radius transition happens over 0.5 seconds. */
}
```

Refer to [this site](http://easings.net/) for all different types of easings. When clicking on one, it will give you the function to use to make it.

Shorthand:

``` css
.animated {
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1s, background-color 0.5s linear;
}
```

What performs best? These 4:

* `transform: translate();`
* `transform: scale();`
* `transform: rotate();`
* `opacity`

## Keyframes

With transitions we can have a circle go from state A to state B, like red to orange. With keyframes we can have that circle go from state A to state B to state C to state D ... to state Z.

[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)


**Step 1: Define**

You must define the animation itself by using `@keyframes` and naming it. In this case it's name is "rainbowtext".

``` css
@keyframes rainbowtext {
    0% {
        color: red;
        font-size: 20px;
    }
    25% {
        color: orange;
    }
    50% {
        color: yellow;
        font-size: 40px;
    }
    75% {
        color: green;
    }
    100% {
        color: blue;
        font-size: 20px;
    }
}
```

**Step 2: Apply**

``` css
p {
    animation-name: rainbowtext;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
}
```

All the usual suspects are here:
* `animation-name`
* `animation-duration`
* `animation-timing-function`
* `animation-delay`

Let's look at some of the other "newer" animation properties:
* `animation-iteration-count` - How many times an animation should repeat.
* `animation-fill-mode` - Specifies how an animation should apply styles before and after the animation.
* `animation-direction` - The `animation-direction` CSS property specifies whether an animation should play forwards, backwards, or alternating back and forth.
* `animation-play-state` - Specifies whether the animation is running or paused.

shorthand: `animation: 3s ease-in 1s 2 reverse both paused slidein;`, `animation: changecolor 3s linear 1s infinite;`, `animation: jiggle 4s`

## Flexbox

* [The Best Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)

2 types of properties:

| Container Properties | Flex Item Properties |
| --- | --- |
| `flex-direction` | `order` |
| `justify-content` | `flex` |
| `flex-wrap` | `flex-grow` |
| `align-items` | `flex-shrink` |
| `align-content` | `align-self` |

Flex-grow confusion:

Let's say container = 1000px. We have 2 boxes, each 100px. That means 800px of leftover space. If `flex-grow` is not set, those 2 boxes will be 100px and not fill up the container.

If we set both boxes to `flex-grow: 1;`, they evenly share the free space. Both boxes gain 400px of the 800px, making them 500px in width each.

If we set box 1 to `flex-grow: 1'` and box 2 to `flex-grow: 4;`, we have split up the free space into 5 total chunks. 1 allocated to box 1 and 4 allocated to box 2. It isn't how you may think, which is 1/4 to box 1 and 3/4 to box 2. Box 1 gets 1/5 of 800px, which is 160px. Box 2 gets 4/5 of 800px, which is 640px. This puts box 1 at 260px and box 2 at 740px.

## Async Foundations

* Callback function - A **callback function** is a function that is passed into another function as a parameter then invoked by that other function.
* Higher Order Function - A **higher order function** is a function that accepts a callback as a parameter.

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

### Stack and Heap

Stack:

* An ordered data structure
* Keeps track of the function invocations
* Part of the JavaScript runtime (you don't access it directly)

Each one of those lines in the stack that keeps track of the functions are called **stack frames**. They keep track of:

* The function that was invoked
* The parameters that were passed to the function
* Current line number

Now knowing this, we can describe the **stack** as: An ordered set of stack frames. The most recently invoked function is on the top of the stack. The bottom of the stack is the first function invoked. The stack is processed from top to bottom.

Heap:

An area in memory where your data is stored.

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

### Event loop and the Queue

* The Queue - An ordered list of functions waiting to be placed on the stack. Functions in the queue are processed on a first in, first out basis (FIFO).
* The Event Loop - Functionality in the JavaScript runtime that checks the queue when the stack is empty. If the stack is empty, the front of the queue is placed in the stack.

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

### Single Threaded

**Single Threaded:** Code execution is linear. Code that is running cannot be interrupted by something else going on in the program.

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

### Promises

A promise is an object that represents a task that will be completed in the future.

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

Disadvantages of nested callbacks:

* The code is hard to read
* Logic is difficult to reason about
* The code is not modular

Promise chaining:

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

Here is a nested `setTimeout` callbacks example that we will refactor into promise chaining.

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

## AJAX

**A**synchronous  
**J**avaScript  
**a**nd  
**X**ML

An approach to web development. That's it. Using existing tools and structuring them in a unique way. With AJAX, websites can send and request data from a server in the background without disturbing the current page.

**XHR** - This is javascripts standard built-in AJAX system. Here is what it looks like:

``` javascript
var XHR = new XMLHttpRequest();
var url = "https://api.coindesk.com/v1/bpi/currentprice.json";

XHR.onreadystatechange = function() {
    if (XHR.readyState == 4 && XHR.status == 200) {
        var response = JSON.parse(XHR.responseText);
        var rate = response.bpi.USD.rate_float.toFixed(2);

        elBtc.textContent = "$" + rate;

    }
}

XHR.open("GET", url);
XHR.send();
```

**Axios** - A 3rd party library for HTTP requests. Sometimes you don't want all the features of jQuery. If you only use it for the ajax calls, perhaps something lighter, like axios, is better.

``` javascript
// Makes a GET request!

axios.get(url)
.then(function(res) {
    console.log(res.data);
})
.catch(function(e) {
    console.log(e);
});
```

[Here is the github.](https://github.com/axios/axios)

We can differentiate between the a request and response error with axios. This way we can know if there is a problem with the url itself or if the api's server just doesn't know how to deal with the request.

* Response error: `https://jsonplaceholder.typicode.com/commentsasdfasdfasdf`
** The response error at least has a valid URL so it can make the request to the right place. The server just doesn't know what to do with it.
* Request error: `https://jsonasdfasdfplaceholder.typicode.com/comments`
** The request error has in invalid URL and therefore can't make a request to an existing place in the first place, unable to establish that connection.

## Testing With Jasmine

**Unit Tests** test parts of an application (or units). Very commonly, each unit is tested individually and independently to ensure an application is running as expected.

* A framework to write tests.
* A way of describing the code we are testing.
* A tool where we can make assertions or expectations about our code.

This is where **Jasmine** comes in.

How it works:

* Create an html file
* Link CSS and JavaScript tags
* Start writing tests!

Here is the Jasmine starter code:

``` HTML
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Jasmine Tests</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.0.0/jasmine.css">
</head>
<body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.0.0/jasmine.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.0.0/jasmine-html.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.0.0/boot.js"></script>
</body>
</html>
```

* `describe`: this function is given to us by Jasmine, and is used to organize our tests. "Let me describe \_\_\_\_\_ to you."
* `it`: the `it` function is used inside `describe` functions. Inside of the `it` function, we write in more detail what we expect this piece of functionality to do. "Let me tell you about \_\_\_\_\_." Often also called a *spec*.
* `expect`: Lives inside the `it` function, where we make expectations about the functionality we are testing. "Here's what I expect."

``` javascript
var earth = {
    isRound: true,
    numberFromSun: 3
};
```

We then use the describe function to wrap all of our tests

``` javascript
describe("Earth", function() {
    it("is round", function() {
        expect(earth.isRound).toBe(true);
    });
    it("is the third planet from the sun", function() {
        expect(earth.numberFromSun).toBe(3)
    });
})
```

These methods we attach onto the result of the `expect` function are called **matchers**. `toBe` is the first matcher we use here. It uses the `===` comparison operator to compare the result of the `expect` function to the argument we pass to the `toBe` function.

* `toBe` / `not.toBe`: Uses `===` to compare
* `toBeCloseTo`: Compares 2 values, and accepts a second parameter for precision.
* `toBeDefined`: Make sure certain variables have a value and are not undefined.
* `toBeFalsey` / `toBeTruthy`: When converted to a boolean to be true or false.
* `toBeGreaterThan` / `toBeLessThan`: Obvious
* `toContain`: To see if a value is contained in an array
* `toEqual`: When comparing 2 arrays in javascript, if they are different references in memory, they will not be equal even if their contents are exactly the same. This is where `toEqual` comes in. When comparing two arrays, as long as the contents are the same they will be considered equal using this method.
* `jasmine.any()`: Checks the type.

``` javascript
describe("Jasmine Matchers", function() {
    it("allows for === and deep equality", function() {
        expect(1+1).toBe(2);
        expect([1,2,3]).toEqual([1,2,3]);
    });
    it("allows for easy precision checking", function() {
        expect(3.1415).toBeCloseTo(3.14,2);
    });
    it("allows for easy truthy / falsey checking", function() {
        expect(0).toBeFalsy();
        expect([]).toBeTruthy();
    });
    it("allows for checking contents of an object", function() {
        expect([1,2,3]).toContain(1);
        expect({name: 'Clint'}).toEqual(jasmine.objectContaining({name: 'Clint'}));
    });
    it("allows for easy type checking", function() {
        expect([]).toEqual(jasmine.any(Array));
        expect(function(){}).toEqual(jasmine.any(Function));
    });
});
```

`beforeEach`:

Runs before each "it" callback

``` javascript
describe("Arrays", function() {
    var arr;
    beforeEach(function() {
        arr = [1,3,5];
    });
});
```

`afterEach`:

Runs after each "it" callback - useful for teardown.

``` javascript
describe("Counting", function() {
    var count = 0;

    beforeEach(function() {
        count++;
    });

    afterEach(function() {
        count = 0;
    });

    it("has a counter that increments", function() {
        expect(count).toBe(1);
    });

    it("gets reset", function() {
        expect(count).toBe(1);
    });
});
```

Just make sure you aren't testing several aspects of the unit that should not belong together in a single test case.

Not good:

``` javascript
describe("Earth", function() {
    it("is round and has a method to check what number it is from the sun", function() {
        expect(earth.isRound()).toBe(true);
        expect(earth.howFarFromSun).toBe(jasmine.any(Function));
        expect(earth.howFarFromSun()).toBe(3);
    });
});
```

Better:

``` javascript
describe("Earth", function() {
    it("is round", function() {
        expect(earth.isRound()).toBe(true);
    });
    
    it("has a method to check what number it is from the sun", function() {
        expect(earth.howFarFromSun).toBe(jasmine.any(Function));
        expect(earth.howFarFromSun()).toBe(3);
    });
});
```

Spies: 

* Jasmine has test double functions called spies.
* A spy can stub (mimic) any function and track calls to it and all arguments.
* Spies only exist in the `describe` or `it` block in which it is defined.
* Spies are removed after each spec.
* There are special matchers for interacting with spies.


### Test Driven Development

**Test Driven Development (TDD)** is where you write your tests *before* you write your code. With TDD, we follow a pattern called **red, green, refactor**. This means we develop products by starting with the tests:

1. Write the tests - Because we haven't written the code yet, we should see the tests fail
2. See the tests fail - Once we see the code fail, we write the code necessary to pass the tests.
3. Write code to pass the tests
4. Refactor code as necessary
5. Repeat

### Behavior Driven Development

When looking at the Jasmine website, one of the first things you'll see is that jasmine self describes as a BDD framework. **Behavior Driven Development (BDD)** is actually a subset of **TDD**. BDD is not mutually exclusive with TDD. It involves being verbose with our style and describing the behavior of the functionality. This is helpful when testing the design of the software.


We have so far learned about **unit testing**. This is good for testing small pieces of our project, but sometimes when we combine these pieces, it no longer works. This is what **integration testing** is for: testing the *integration* of our units or large parts of our application. Integration testing builds off of unit testing.

**Acceptance testing** involves performing tests on the whole system, which could be using the application on the browser or on a device to see whether the functionality satisfies a specification provided.

**Stress testing** is to determine how effective our applications can be under unfavorable conditions. These conditions can include systems going down, high traffic, or other uncommon scenarios.

## Advanced Array Methods

### forEach

* Iterates through an array
* Runs a callback function on each value in the array
* Returns `undefined`

`forEach` ALWAYS RETURNS `undefined`.

``` javascript
// array . method ( callback ( value, index, array ) { body });
[1, 2, 3].forEach(function(index, value, array) {});

// This callback function will be ran 3 times for each value in the array. Hence the name "forEach"...
```

### Map

* Invoked on an array (obviously) and the first thing it does is create a new array.
* Iterates through the array
* Runs a callback function for each value in the array
* Adds the result of that callback function to the new array
* Returns the new array

Kind of like what we were doing with the `foreach` exercises, expect it'll end up a lot cleaner and shorter.

`map` **always** returns a **new array** of the **same length**.

An example:

``` javascript
var arr = [1, 2, 3];

arr.map(function(value, index, array) {
    return value * 2;
});

// [2, 4, 6]
```

### Filter

* Invoked on an array
* Creates a new array
* Itereates through an array
* Runs a callback function on each value in the array
* If the callback function returns true, that value will be added to the new array
* If the callback function returns false, that value will be ignored from the new array

The result of the *callback* will ALWAYS be a **boolean**.

An example:

``` javascript
var instructors = [
    {name: "Clint"},
    {name: "Ross"},
    {name: "Jake"},
    {name: "Danny"}
];

// filter so only instructors with names more than 4 characters are in the array
instructors.filter(function(value, index, array) {
    return value.name.length > 4;
});

// [{name: "Clint"}, {name: "Danny"}]
```

### Some

* Invoked on an array
* Iterates through the array
* Runs a callback function on each value in the array
* If the callback returns true for at least one single value, the entire function returns true
* Otherwise, return false

The result of the *callback* will ALWAYS be a **boolean**.

An example:

``` javascript
var arr = [1, 2, 3];

arr.some(function(value, index, array) {
    return value < 2;
});

// true
```

As long as 1 value is less than 2, the entire function returns true.

&nbsp;

``` javascript
var arr = [1, 2, 3];

arr.some(function(value, index, array) {
    return value > 4;
});

// false
```

### Every

* Invoked on an array
* Iterates through the array
* Runs a callback function on each value in the array
* If the callback returns false for at least one single value, the entire function returns false
* Otherwise, return true

Basically the reverse of `some`. If we want to return true, they must all be true.

The result of the *callback* will ALWAYS be a **boolean**.

An example:

``` javascript
var arr = [-1, -2, -3];

arr.every(function(value, index, array) {
    return value < 0;
});

// true
```

``` javascript
var arr = [1, 2, 3];

arr.every(function(value, index, array) {
    return value > 2;
});

// false
```

### Reduce

Can convert an array to any other data type.

* Invoked on an array
* Accepts a callback function and an optional second parameter
* Iterates through an array
* Runs a callback on each value in the array
* The first parameter to the callback is either the first value in the array or the optional second parameter.
* The first parameter to the callback is often called "the accumulator"
* The returned value from the callback becomes the new value of the accumulator

Whatever is returned from the callback function, becomes the new value of the accumulator!

``` javascript
// array . method ( callback( accumulator, nextValue, index, array ) { body }, optional_second_parameter )

[1, 2, 3].reduce(function(accumulator, nextValue, index, array) {
    // whatever is returned inside here will be the value of accumulator in the next iteration.
}, optional);
```

``` javascript
var arr = [1, 2, 3, 4, 5];

arr.reduce(function(accumulator, nextValue) {
    return accumulator + nextValue;
});
```

| `accumulator` | `nextValue` | returned value |
| --- | --- | --- |
| 1 | 2 | 3 |
| 3 | 3 | 6 |
| 6 | 4 | 10 |
| 10 | 5 | 15 |

Adding a second parameter:

``` javascript
var arr = [1, 2, 3, 4, 5];

arr.reduce(function(accumulator, nextValue) {
    return accumulator + nextValue;
}, 10);
```

Notice `nextValue` starts with 1 this time because it isn't defaulted to the accumulator.

| `accumulator` | `nextValue` | returned value |
| --- | --- | --- |
| 10 | 1 | 11 |
| 11 | 2 | 13 |
| 13 | 3 | 16 |
| 16 | 4 | 20 |
| 20 | 5 | 25 |

``` javascript
var arr = [5, 4, 1, 4, 5];

arr.reduce(function(accumulator, nextValue) {
    if (nextValue in accumulator) {
        accumulator[nextValue]++;
    } else {
        accumulator[nextValue] = 1;
    }
}, {});
```

| `accumulator` | `nextValue` | returned value |
| --- | --- | --- |
| `{}` | 5 | `{5: 1}` |
| `{5: 1}` | 4 | `{5: 1, 4: 1}` |
| `{5: 1, 4: 1}` | 1 | `{5: 1, 4: 1, 1: 1}` |
| `{5: 1, 4: 1, 1: 1}` | 4 | `{5: 1, 4: 2, 1: 1}` |
| `{5: 1, 4: 2, 1: 1}` | 5 | `{5: 2, 4: 2, 1: 1}` |

### Summary

| Method | Usage | Return Type |
| --- | --- | --- |
| `forEach` | iterates over an array, runs a callback on each value | returns `undefined` |
| `map` | pushes callback result in a new array | returns `array` |
| `filter` | if callback result is true, added to new array | returns `array` |
| `some` | if at least 1 callback result is true, returns true, otherwise false | returns `boolean` |
| `every` | if at least 1 callback result is false, returns false, otherwise true | returns `boolean` |
| `reduce` | returns an accumulated value which is determined by the result of what is returned each callback | returns any value type |


## Closures

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

### Recap

* Closure exists when an inner function makes use of variables declared in an outer function which has previously returned
* Closure does not exist if you do not return an inner function and if that inner function does not make use of variables returned by an outer function.
* JavaScript will only remember values that are being used inside of the inner function, not all variable defined in the outer function.
* We can use closures to create private variables and write better code that isolates our logic and application.


## The Keyword `this`

* A reserved keyword in JavaScript
* Usually determined by how a function is called (what we call 'execution context')
* Every time a function is run, 2 special keywords are given to that function: `this` and `arguments`
* Can be determined using four rules (global, object/implicit, explicit, new)

### Rule 1: Global Context

When `this` is not inside of a declared object, `this` refers to the global object. Which, in the browser's case, is `window`.

``` javascript
console.log(this); // window
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

### Rule 2: Object/Implicit Context

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

``` javascript
var person = {
    firstName: "Clint",
    determineContext: this;
};

person.determineContext === person; // false
```

Why isn't `this` equal to the object?

**A keyword `this` is defined when a function is run!** There is not a function being run here to create a new value of the keyword `this` so the value of `this` is still the window.

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

person.sayHi(); // "Hi Clint"
person.determineContext(); // true

person.dog.sayHello(); // "Hello undefined"
person.dog.determineContext(); // false
```

> **The implicit rule states that the closest object is the one that determines the definition of `this`, so therefore `dog` is the object that `this` refers to in this instance.**

### Rule 3: Explicit Binding

Choose what we want the context of `this` to be using `call`, `apply` or `bind`. **These methods can _only_ be used by functions.**

| Name of Method | Parameters | Invoke Immediately? |
| --- | --- | --- |
| `call()` | thisArg, a, b, c, d, ...| Yes |
| `apply()` | thisArg, [a, b, c, d, ...] | Yes |
| `bind()` | thisArg, a, b, c, d,... | No |

`thisArg` is the value we pass for what we want `this` to be. The other parameters are the arguments we are passing to the function.

#### Call

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

#### Apply

The difference between `call` and `apply` is apparent when we start adding parameters.

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

#### Bind

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

### Recap

* The keyword `this` is a reserved keyword in JavaScript and its value is determined at execution.
* It is either set using the global context, object binding, explicit binding, or the `new` keyword.
* When set in the global context in a function, it is either the global object (window if in the browser) or undefined (if we are using strict mode).
* To explicitly set the value of the keyword `this`, we can use `call`, `apply`, or `bind`.
* We can also use the `new` keyword to set the context of `this`, which we will discuss when we talk about Object Oriented Programming.

## Object Oriented Programming with JavaScript

* A programming model based around the idea of objects.
* These objects are constructed from what are called *classes*, which we can think of like a blueprint. We call these objects created from classes *instances*.
* We strive to make our classes abstract and modular.

### Constructor Functions

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

### The `new` Keyword

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

### Using `call`/`apply`

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

### Constructor Function Recap

* Object Oriented Programming is a model based on objects constructed from a blueprint. We use OOP to write more modular and shareable code.
* In languages that have built-in support for OOP, we call these blueprints `classes` and the objects created from them `instances`.
* Since we do not have built-in class support in JavaScript, we mimic classes by using functions. These constructor functions create objects through the use of the `new` keyword.
* We can avoid duplication in multiple constructor functions by using `call` or `apply`.

* Every constructor function has a property on it called "prototype", which is an object.
* The prototype object has a property on it called "constructor", which points back to the constructor function.
* Anytime an object is created using the `new` keyword, a property called `__proto__` (dunder proto) gets created, linking the object and the prototype property of the constructor function.

### Prototype

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

### Prototype Chaining

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

**Refactoring**

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

Refactoring above, to what's below. This defines `sayHi` once so it isn't inefficiently being defined every time an instance is created.

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

### Inheritance

The passing of methods and properties from one class to another.

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

Let's now add something onto the Student prototype object.

``` javascript
Student.prototype.status = function() {
    return "I am currently a student!";
}

var clint = new Person("Clint", "Summer");
clint.status(); // "I am currently a student!"
```

We want `student` to inherit from `person`. A `person` shouldn't get a status like a `student` does. The problem is when we assign one prototype to the other we are creating a reference.

When we assign one object to another, we don't create a new object. We just create a reference (or a link) to the same object. That means when we change the `student` prototype, we also change the `person` prototype.

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

One missing piece:

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

### Recap

* Every time the `new` keyword is used, a link between the object created and the prototype property of the constructor is established - this link can be accessed using `__proto__`.
* The prototype object contains a property called constructor, which points back to the constructor function.
* To share properties and methods for objects created by a constructor function, place them in the prototype as it is the most efficient.
* To pass methods and properties from one prototype object to another, we can use inheritance which involves setting the prototype property to be a newly created object using `Object.create` and resetting the constructor property.

## ES2015

**JavaScript Timeline**
1995/1996 - Start  
1997 - ES1
1998 - ES2
1999 - ES3
2009 - ES5
2015 - ES6/ES2015
2016 - ES2016
2017 - ES2017

### Const

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

You may not be able to change the value of a constant with a primitive value, but if set to an array it can be modified. Even though it can be mutated, it still cannot be redeclared.

``` javascript
const numbers = [1, 2, 3, 4];

numbers.push(10); // 5

numbers; // [1, 2, 3, 4, 5]

numbers = "no!"; // TypeError
```

### Let

`let` allows the reassignment of a variable, but not the redeclaration.

``` javascript
let anotherInstructor = "Clint";

anotherInstructor = "Ross"; // no problem

let anotherInstructor = "Clint"; // SyntaxError
```

``` javascript
var instructor = "Clint";

if (instructor === "Clint") {
    let funFact = "Plays the Cello";
}

funFact; // ReferenceError!
```

`let` creates a new scope called **block scope**. Before ES2015, there was *global* and *function* scope, variables declared in the global scope could be used anywhere while variables declared (using the `var` keyword) in the function scope could only be used in that function. There are a few keywords that allow us to create blocks in JavaScript. Some of those are `if`, `for`, `while`, `do`, `try`, `catch`. If we use the `let` keywords inside those blocks, we create our own type of scope.

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

### Template/Multi-line Strings

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

``` javascript
"
Hello
" 
// Does not work!

`
Hello
How
Nice
Is
This!
` // Works well!
```

### Arrow functions

Replace the keyword `function` with `=>`.

``` javascript
// ES2015
var add = (a, b) => {
    return a + b;
};
```

* You can put arrow functions on one line.
* But you must omit the return keyword as well as curly braces.

``` javascript
var add = (a, b) => a + b;
```

We can go from:

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

* Arrow functions are not exactly the same as regular functions.
* Arrow functions do not get their own `this` keyword.
* Inside of an arrow function, the keyword `this` has its original meaning from the enclosing context.
* The fact that arrow functions do not have their own `this` keyword can be quite helpful - you just need to understand when you might NOT want that.

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

Arrow functions do not get their own keyword arguments.

``` javascript
var add = (a, b) => {
    return arguments;
};

add(2, 4); // ReferenceError: arguments is not defined
```

Arrow functions should NEVER be used as methods in objects since we will get the incorrect value of the keyword `this`. ES2015 provides a better alternative we will see soon.

``` javascript
var instructor = {
    firstName: "Clint",
    sayHi: () => `Hello ${this.firstname}`
};

instructor.sayHi(); // "Hello undefined"
```

### Default Parameters