/*
Objectives:
- Describe and use the findIndex function
- Implement findIndex on your own

findIndex - Returns the index of the first element in the array for which the callback returns a truthy value. -1 is returned if the callback never returns a truth value.
*/

function findIndex(array, callback) {
    // findIndex code to be implemented
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return i;
        }
    }
    return -1;
}

// Example
var arr = [3, 4, 6, 2, 1];
console.group("Example 1");
console.log(findIndex(arr, function(num, index, array) {
    return num === 6;
}));
console.groupEnd();

// Example 2
var arr = [5, 11, 13, 8, 6, 7];
console.group("Example 2");
console.log(findIndex(arr, function(num, index, array) {
    return num % 2 == 0;
}));
console.groupEnd();

// Example 3
var langs = ["Java", "C++", "Python", "Ruby"];
console.group("Example 3");
console.log(findIndex(langs, function(lang, index, arr) {
    return lang === "JavaScript";
}));
console.groupEnd();

// Example - Bad Callback
var langs = ["Java", "C++", "Python", "Ruby"];
console.group("Example - Bad Callback");
console.log(findIndex(langs, function(lang, index, arr) {
    lang === "JavaScript";
}));
console.groupEnd();
// Notice the callback doesn't return anything. If it doesn't return, it can't give the value to its parent function (findIndex).

