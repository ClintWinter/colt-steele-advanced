# Advanced Array Methods in JavaScript

## forEach

* Iterates through an array
* Runs a callback function on each value in the array
* Returns `undefined`

`forEach` ALWAYS RETURNS `undefined`.

### Anatomy of forEach

``` javascript
// array . method ( callback ( value, index, array ) { body });
[1, 2, 3].forEach(function(index, value, array) {});

// This callback function will be ran 3 times for each value in the array. Hence the name "forEach"...
```

Remember we can call the parameters to the callback whatever we want.

An example:

``` javascript
var arr = [1, 2, 3];
arr.forEach(function(value, index, array) {
    console.log(value);
});

// 1
// 2
// 3
// undefined
```

Feel free to run this in the browser console.

### Using forEach in a function

``` javascript
function halfValues(arr) {
    var newArr = [];
    arr.forEach(function(val) {
        newArr.push(val / 2);
    });

    return newArr;
}

halfValues([2, 4, 6]); // [1, 2, 3]
```

## Map

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

### How does it work?

Let's implement our own version to see how it would work:

``` javascript
function map(array, callback) {
    var newArr = [],
        result;

    for(var i = 0; i < array.length; i++) {
        // retrieve the returned value of the callback
        result = callback(array[i], i, array);

        // push the new value into the new array
        newArr.push(result);
    }

    return newArr;
}
```

### Using Map in a Function

``` javascript
function tripleValues(arr) {
    return arr.map(function(value) {
        return value * 3;
    });
}

tripleValues([1, 2, 3]); // [3, 6, 9]
```

``` javascript
function onlyFirstName(arr) {
    return arr.map(function(val) {
        return val.first;
    });
}

onlyFirstName([{first: 'Tim'}, last:'Garcia'}, {first: 'Matt', last: 'Lane'}]);

// ['Tim', 'Matt']
```

## Filter

* Invoked on an array
* Creates a new array
* Itereates through an array
* Runs a callback function on each value in the array
* If the callback function returns true, that value will be added to the new array
* If the callback function returns false, that value will be ignored from the new array

The result of the *callback* will ALWAYS be a **boolean**.

An example:

``` javascript
var arr = [1, 2, 3];

arr.filter(function(value, index, array) {
    // no need for an if statement.
    // just return an expression that evaluates to true or false!
    return value > 2;
});

// [3]
```

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

### How Does it Work?

Implementing our own filter function.

``` javascript
function filter(array, callback) {
    var newArr = [];
    
    for (var i = 0; i < array.length; i++) {
        // if true, add to new array
        if (callback(array[i], i, array)) newArr.push(array[i]);
    }

    return newArr;
}
```

### Using Filter in a Function

``` javascript
function onlyFourLetterNames(arr) {
    return arr.filter(function(value) {
        return value.length == 4;
    });
}

onlyFourLetterNames(["Clint", "Ross", "Jake", "Danny"]); // ["Ross", "Jake"]
```

``` javascript
function divisibleByThree(arr) {
    return arr.filter(function(value) {
        return value % 3 === 0;
    });
}

divisibleByThree([1, 2, 3, 4, 5, 6, 7, 8, 9]); // [3, 6, 9]
```

## Some

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

### How Does it Work?

Implementing our own version.

``` javascript
function some(array, callback) {
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) return true;
    }
    return false;
}
```

### Using Some in a Function

``` javascript
function hasEvenNumber(arr) {
    return arr.some(function(val) {
        return val % 2 === 0;
    });
}

hasEvenNumber([1, 2, 3, 4]); // true
hasEvenNumber([1, 3, 5]); // false
```

``` javascript
function hasComma(str) {

    return str.split('').some(function(val) {
        return value === ',';
    });
}

hasComma('This is wonderful'); // false
hasComma('This, is wonderful'); // true
```

## Every

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

### How Does it Work?

Implementing our own version.

``` javascript
function every(array, callback) {
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i], i, array) === false) return false;
    }
    return true;
}
```

### Using Every in a Function

``` javascript
function allLowerCase(str) {
    return str.split('').every(function(val) {
        return val === val.toLowerCase();
    });
}

allLowerCase('this is really nice'); // true
allLowerCase('this is REALLY nice'); // false
```

``` javascript
function allArrays(arr) {
    // instead of writing our own callback function, we pass it the built in "isArray" method to clean up the code.
    return arr.every(Array.isArray);
}

allArrays([[1], [2], [3, 4]]); // true
allArrays([[1], [2], {}]); // false
```

## Reduce

Can convert an array to any other data type.

* Invoked on an array
* Accepts a callback function and an optional second parameter
* Iterates through an array
* Runs a callback on each value in the array
* The first parameter to the callback is either the first value in the array or the optional second parameter.
* The first parameter to the callback is often called "the accumulator"
* The returned value from the callback becomes the new value of the accumulator

Whatever is returned from the callback function, becomes the new value of the accumulator!

### Anatomy of Reduce

``` javascript
// array . method ( callback( accumulator, nextValue, index, array ) { body }, optional_second_parameter )

[1, 2, 3].reduce(function(accumulator, nextValue, index, array) {
    // whatever is returned inside here will be the value of accumulator in the next iteration.
}, optional);
```

Let's break it down

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

### How About Strings?

``` javascript
var names = ["Clint", "Ross", "Jake", "Danny"];

names.reduce(function(accumulator, nextValue) {
    return accumulator += ' ' + nextValue;
}, 'The instructors are');
```

| `accumulator` | `nextValue` | returned value |
| --- | --- | --- |
| "The instructors are" | " Clint" | "The instrucors are Clint" |
| "The instructors are Clint" | " Ross" | "The instrucors are Clint Ross" |
| "The instructors are Clint Ross" | " Jake" | "The instrucors are Clint Ross Jake" |
| "The instructors are Clint Ross Jake" | " Danny" | "The instrucors are Clint Ross Jake Danny" |

### How About Objects?

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

### Using Reduce in a Function

``` javascript
function sumOddNumbers(arr) {
    return arr.reduce(function(accumulator, nextValue) {
        if (nextValue % 2 !== 0) {
            accumulator += nextValue;
        }
        return accumulator;
    }, 0);
}

sumOddNumbers([1, 2, 3, 4, 5]); // 9
```

``` javascript
function createFullName(arr) {
    return arr.reduce(function(accumulator, nextValue) {
        accumulator.push(nextValue.first + " " + nextValue.last);
        return accumulator;
    }, []);
}

createFullName([{first: "Clint", last: "Summer"}, {first: "Ross", last: "Smith"}]);
// ["Clint Summer", "Ross Smith"]
```

## Recap

| Method | Usage | Return Type |
| --- | --- | --- |
| `forEach` | iterates over an array, runs a callback on each value | returns `undefined` |
| `map` | pushes callback result in a new array | returns `array` |
| `filter` | if callback result is true, added to new array | returns `array` |
| `some` | if at least 1 callback result is true, returns true, otherwise false | returns `boolean` |
| `every` | if at least 1 callback result is false, returns false, otherwise true | returns `boolean` |
| `reduce` | returns an accumulated value which is determined by the result of what is returned each callback | returns any value type |