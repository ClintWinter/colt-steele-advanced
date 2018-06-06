/*
- Describe and use the forEach function
- Implement the forEach function
*/

// Print Array Values Doubled
var arr = [1, 2, 3, 4, 5, 6];
function double(arr) {
    console.group("Print Array Values Doubled");
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i] * 2);
    }
    console.groupEnd();
}
double(arr);

// Refactored to use forEach
function forEach(arr, callback) {
    for (var i = 0; i < arr.length; i++) {
        callback(arr[i], i, arr);
    }
}

console.group("forEach refactor");
forEach(arr, function(number) {
    console.log(number * 2);
});
console.groupEnd();