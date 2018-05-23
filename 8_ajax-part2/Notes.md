# AJAX (Part 2)

jQuery & Axios

## jQuery AJAX

Skipping it, I use it so much for work that I don't need an introduction

## Axios

A 3rd party library for HTTP requests. Sometimes you don't want all the features of jQuery. If you only use it for the ajax calls, perhaps something lighter, like axios, is better.

The basic syntax:

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

There's a cdn link you can use, or you can pull it in through NPM. [Here is the github.](https://github.com/axios/axios)

### Axios Error Handling

``` javascript
axios.get(url)
.then(function(res) {
    console.log(res.data);
})
.catch(function(err) {
    if  (err.response) {
        console.log("Problem with Response!");
    } else if (err.request) {
        console.log("Problem with request!");
    } else {
        console.log("ERROR", err.message);
    }
});
```

We can differentiate between the a request and response error with axios. This way we can know if there is a problem with the url itself or if the api's server just doesn't know how to deal with the request.

* Response error: `https://jsonplaceholder.typicode.com/commentsasdfasdfasdf`
** The response error at least has a valid URL so it can make the request to the right place. The server just doesn't know what to do with it.
* Request error: `https://jsonasdfasdfplaceholder.typicode.com/comments`
** The request error has in invalid URL and therefore can't make a request to an existing place in the first place, unable to establish that connection.

