# Testing With Jasmine

Objectives:

* Understand what Jasmine and unit testing are
* Define describe, it, matchers, and spies
* Write better tests with before and after hooks
* Write asynchronous tests with clocks and done callbacks
* Compare and constrast TDD and BDD and differentiate between unit and other kinds of tests
* Write unit tests using Jasmine

## Why are we learning this?

Because everyone makes mistakes, but some of them are preventable. We can prevent them with tests.

Specifically unit tests.

**Unit Tests** test parts of an application (or units). Very commonly, each unit is tested individually and independently to ensure an application is running as expected.

## What we need

* A framework to write tests.
* A way of describing the code we are testing.
* A tool where we can make assertions or expectations about our code.

This is where **Jasmine** comes in.

## Introducing Jasmine

* Comes with everything we need to test our code.
* Works with all kinds of JavaScript environments (including the browser and node.js).
* Simple syntax to quickly get up and running with.

## How it works

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

## Essential Keywords

`describe`: this function is given to us by Jasmine, and is used to organize our tests. "Let me describe \_\_\_\_\_ to you."
`it`: the `it` function is used inside `describe` functions. Inside of the `it` function, we write in more detail what we expect this piece of functionality to do. "Let me tell you about \_\_\_\_\_." Often also called a *spec*.
`expect`: Lives inside the `it` function, where we make expectations about the functionality we are testing. "Here's what I expect."

### A conceptual Exercise

Let's unit test Earth (in pseudocode):

```
describe("Earth")
    it("is round")
        expect(earth.isRound.toBe(true))
    it("is the third planet from the sun")
        expect(earth.numberFromSun).toBe(3)
```

### In Code

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

### Putting It All Together

Refer to the first directory to see it all together.

## Matchers

* `toBe` / `not.toBe`: Uses `===` to compare
* `toBeCloseTo`: Compares 2 values, and accepts a second parameter for precision.
* `toBeDefined`: Make sure certain variables have a value and are not undefined.
* `toBeFalsey` / `toBeTruthy`: When converted to a boolean to be true or false.
* `toBeGreaterThan` / `toBeLessThan`: Obvious
* `toContain`: To see if a value is contained in an array
* `toEqual`: When comparing 2 arrays in javascript, if they are different references in memory, they will not be equal even if their contents are exactly the same. This is where `toEqual` comes in. When comparing two arrays, as long as the contents are the same they will be considered equal using this method.
* `jasmine.any()`: Checks the type.

### Examples

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

All of the examples will pass, I'll put it in first directory "1_jasmine-starter-code" to look at. Play around with it and get a feel for it.

## Anything Wrong Here?

Look at this code and see if you can tell why it isn't great:

``` javascript
describe("#push", function() {
    it("adds elements to an array", function() {
        var arr = [1,3,5];
        arr.push(7);
        expect(arr).toEqual([1,3,5,7]);
    });

    it("returns the new length of the array", function() {
        var arr = [1,3,5];
        expect(arr.push(7)).toBe(4);
    });

    it("adds anything into the array", function() {
        var arr = [1,3,5];
        expect(arr.push({})).toBe(4);
    });
});
```

The problem is there is too much repititon. We define the arr variable 3 times. Jasmine has a built in way to handle this, called `beforeEach`.

### beforeEach

Runs before each "it" callback

``` javascript
describe("Arrays", function() {
    var arr;
    beforeEach(function() {
        arr = [1,3,5];
    });
});
```

Our code now looks like this:

``` javascript
describe("#push", function() {
    var arr;
    beforeEach(function() {
        arr = [1,3,5];
    });

    it("adds elements to an array", function() {
        arr.push(7);
        expect(arr).toEqual([1,3,5,7]);
    });

    it("returns the new length of the array", function() {
        expect(arr.push(7)).toBe(4);
    });

    it("adds anything into the array", function() {
        expect(arr.push({})).toBe(4);
    });
});
```

### afterEach

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

Teardown ensures code stays the same between tests. You'll often see teardown code when testing databases to make sure they start and end with the same sample data.

### beforeAll / afterAll

Run before/after all tests. Does not reset in between. Not as commonly used as `beforeEach` and `afterEach`.

``` javascript
var arr = [];
beforeAll(function() {
    arr = [1,2,3];
});

describe("Counting", function() {
    it("starts with an array", function() {
        arr.push(4);
        expect(1).toBe(1);
    });

    it("keeps mutating that array", function() {
        console.log(arr); // [1,2,3,4]
        arr.push(5);
        expect(1).toBe(1);
    });
});

describe("Again", function() {
    it("keeps mutating the array...again", function() {
        console.log(arr); // [1,2,3,4,5]
        expect(1).toBe(1);
    });
});
```

## Nesting Describe

``` javascript
// Describe Arrays
describe("Array", function() {
    var arr;
    beforeEach(function() {
        arr = [1,3,5];
    });

    // Describe individual Array methods
    describe("#unshift", function() {
        it("adds an element to the beginning of an array", function() {
            arr.unshift(17);
            expect(arr[0]).toBe(17);
        });

        it("returns the new length", function() {
            expect(arr.unshift(1000)).toBe(4);
        });
    });

    describe("#push", function() {
        it("adds elements to the end of an array", function() {
            arr.push(7);
            expect(arr[arr.length-1]).toBe(7);
        });

        it("returns the new length", function() {
            expect(arr.push(1000).toBe(4));
        });
    });
});
```

## Pending Tests

Commonly done when we don't know exactly what we'll be testing or if we do not want to run a specific test.

``` javascript
describe("Pending specs", function() {

    xit("can start with an xit", function() {
        expect(true).toBe(true);
    });

    it("is a pending test if there is no callback function");

    it("is pending if the pending function is invoked inside the callback", function() {
        expect(2).toBe(2);
        pending();
    });
})
```

## One or more expect

How many `expect` functions should we use per `it` block? There is no rule: *if the testing of one unit needs more than one expect, use more.*

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

You don't always need a single expect per it block, especially if you are testing the same piece of functionality.

## Spies

* Jasmine has test double functions called spies.
* A spy can stub (mimic) any function and track calls to it and all arguments.
* Spies only exist in the `describe` or `it` block in which it is defined.
* Spies are removed after each spec.
* There are special matchers for interacting with spies.

### Creating a Spy

When spying on an existing function, use `spyOn`.

Here, we spy on the `add` function and test to see if our spy has been called.

``` javascript
function add(a, b, c) {
    return a + b + c;
}

describe("add", function() {
    var addSpy, result;

    beforeEach(function() {
        addSpy = spyOn(window, 'add');
        result = addSpy();
    });

    it("is can have params tested", function() {
        expect(addSpy).toHaveBeenCalled();
    });
});
```

### Testing Parameters

Next we can make sure we are testing with the proper parameters using the `toHaveBeenCalledWith` matcher.

``` javascript
function add(a, b, c) {
    return a + b + c;
}

describe("add", function() {
    var addSpy, result;

    beforeEach(function() {
        addSpy = spyOn(window, "add");
        result = addSpy(1, 2, 3);
    });

    it("is can have params tested", function() {
        expect(addSpy).toHaveBeenCalled();
        expect(addSpy).toHaveBeenCalledWith(1, 2, 3);
    });
});
```

### Returning a Value

Now we can see if our spy actually returns the correct value. To do that we can use the `and.callThrough` function.

``` javascript
function add(a, b, c) {
    return a + b + c;
}

describe("add", function() {
    var addSpy, result;

    beforeEach(function() {
        addSpy = spyOn(window, "add").and.callThrough();
        result = addSpy(1, 2, 3);
    });

    it("is can have params tested", function() {
        expect(result).toEqual(6);
    });
});
```

Why use a spy to test a return value rather than the actual function?

It's possible that the original function takes a while to run, or depends on other objects that we cannot access. With unit testing we should be testing small units of our code, so we should not be invoking functions that depend on other ones. We should strive to use dummy data to speed up our tests.

### Testing Frequency

We can test how many times the function is called. This is useful to make sure a function is only called a certain amount of times.

``` javascript
function add(a, b, c) {
    return a + b + c;
}

describe("add", function() {
    var addSpy, result;

    beforeEach(function() {
        addSpy = spyOn(window, "add").and.callThrough();
        result = addSpy(1, 2, 3);
    });

    it("is can have params tested", function() {
        expect(addSpy.calls.any()).toBe(true);
        expect(addSpy.calls.count()).toBe(1);
        expect(result).toEqual(6);
    });
});
```

## Clock

* The Jasmine Clock is available for testing time dependent code.
* It is installed by invoking `jasmine.clock().install()`
* Be sure to uninstall the clock after you are done to restore the original functions. (Commonly done after each callback)

### setTimeout

``` javascript
describe("a simple setTimeout", function() {
    var sample;
    beforeEach(function() {
        sample = jasmine.createSpy("sample");
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("is only invoked after 1000 milliseconds", function() {
        setTimeout(function() {
            sample();
        }, 1000);
        jasmine.clock().tick(999);
        expect(sample).not.toHaveBeenCalled();
        jasmine.clock().tick(1);
        expect(sample).toHaveBeenCalled();
    });
});
```

### setInterval

``` javascript
describe("a simple setInterval", function() {
    var dummyFunction;
    
    beforeEach(function() {
        dummyFunction = jasmine.createSpy("dummyFunction");
        jasmine.clock.install();
    });

    afterEach(function() {
        jasmine.clock.uninstall();
    });

    it("checks to see the number of times the function is invoked", function() {
        setInterval(function() {
            dummyFunction();
        }, 1000);

        jasmine.clock().tick(999);
        expect(dummyFunction.calls.count()).toBe(0);
        jasmine.clock().tick(1000);
        expect(dummyFunction.calls.count()).toBe(1);
        jasmine.clock().tick(1);
        expect(dummyFunction.calls.count()).toBe(2);
    });
});
```

### Testing Async Code

Examples of this include `setTimeout`/`setInterval` as well as HTTP requests with something like AJAX.

* Jasmine also has support for running specs that require testing async code.
* `beforeAll`, `afterAll`, `beforeEach`, `afterEach`, and `it` take an optional single argument (commonly called `done`) that should be called when the asnyc work is complete.
* A test will not complete until its `done` is called.

``` javascript
function getUserInfo(username) {
    return $.getJSON("https://api.github.com/users/" + username);
}

describe("#getUserInfo", function() {
    it("returns the correct name for the user", function(done) {
        getUserInfo("clintw").then(function(data) {
            expect(data.name).toBe("Clint Summer");
            done();
        });
    });
});
```

## TDD - Test Driven Development

**Test Driven Development (TDD)** is where you write your tests *before* you write your code. With TDD, we follow a pattern called **red, green, refactor**. This means we develop products by starting with the tests:

1. Write the tests - Because we haven't written the code yet, we should see the tests fail
2. See the tests fail - Once we see the code fail, we write the code necessary to pass the tests.
3. Write code to pass the tests
4. Refactor code as necessary
5. Repeat

## BDD - Behavior Driven Development

When looking at the Jasmine website, one of the first things you'll see is that jasmine self describes as a BDD framework. **Behavior Driven Development (BDD)** is actually a subset of **TDD**. BDD is not mutually exclusive with TDD. It involves being verbose with our style and describing the behavior of the functionality. This is helpful when testing the design of the software.

## Other Kinds of Tests

We have so far learned about **unit testing**. This is good for testing small pieces of our project, but sometimes when we combine these pieces, it no longer works. This is what **integration testing** is for: testing the *integration* of our units or large parts of our application. Integration testing builds off of unit testing.

**Appcetance testing** involves performing tests on the whole system, which could be using the application on the browser or on a device to see whether the functionality satisfies a specification provided.

**Stress testing** is to determine how effective our applications can be under unfavorable conditions. These conditions can include systems going down, high traffic, or other uncommon scenarios.

## Recap

* Unit testing involves testing pieces of functionality
* Jasmine is a testing framework that allows us to easily write unit tests
* Jasmine has quite a few matchers for testing almost any kind of expectation
* Using `beforeEach`/`afterEach`/`beforeAll`/`afterAll` hooks can help reduce duplication and confusion.
* Jasmine provides spies for mimicking the behavior of a function.
* Jasmine provides a clock object for testing timers and a callback function for testing asynchronous code.
* Unit testing is just one part of testing applications.