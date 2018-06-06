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