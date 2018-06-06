# AJAX (Part 1)

**A**synchronous  
**J**avaScript  
**a**nd  
**X**ML  

## AJAX is Not...

1. A library
2. A framework
3. A technology

## AJAX is...

An approach to web development. That's it. Using existing tools and structuring them in a unique way.

## Back in 2005ish

We had all the pieces for AJAX, it just took a little while to realize it.

* HTML
* JavaScript
* The DOM
* CSS
* XMLHTTP Requests

"Hey wait, we have all that we need here for us to make web apps that can update without refreshing!"

[The first documented use of the word AJAX!](adaptivepath.org/ideas/ajax-new-approach-web-application)

## It Boils Down To

With AJAX, websites can send and request data from a server in the background without disturbing the current page.

## Making Requests with JavaScript

1. XMLHTTP Request
2. The Fetch API
3. 3rd Part Libraries: jQuery, Axios, etc.

## Misnomer

AJAX is kind of a misnomer because XML has basically been replaced by JSON.

## Data Formats

XML and JSON are different *data formats*. **XML** is extended markup language. **JSON** is JavaScript Object Notation.

API's don't respond with HTML. API's respond with pure data, not structure. They use more efficient data formats like XML and JSON.

## XML

Extended Markup Language

``` XML
<pin>
    <title>Adorable Maine Coon</title>
    <author>Cindy S</author>
    <num-saves>1800</num-saves>
</pin>
```

XML is syntactically similar to HTML, but it does not describe presentation like HTML does.

## JSON

JavaScript Object Notation

``` JSON
'pin': {
    'title': 'Adorable Maine Coon',
    'author': 'Cindy S',
    'num-saves': 1800
}
```

JSON looks (almost) exactly like Javascript objects.

JSON is more popular now because it works so well with JavaScript.

# XHR

This is javascripts standard built-in AJAX system. Here is what it looks like:

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

### Problems with XHR

* It's horribly ugly and bulky and verbose
* It's **16** years old!
* No streaming

The replacement to XHR is **Fetch**

## Fetch

[A streaming demo](https://domenic.github.io/streams-demo)

This is the cleanliness of fetch:

``` javascript
fetch(url)
.then(function(res) {
    console.log(res);
})
.catch(function(error) {
    console.log(error);
});
```

### Parsing JSON with Fetch

``` javascript
fetch(url).then(function(res) {
    return res.json();
}).then(function(data) {
    console.log(data);
}).catch(function() {
    console.log("problem!");
});
```

If this looks familiar, you may recognize that this looks an awful lot like promises. In fact, it looks exactly like promises because that's exactly what they are. The first `.then` returns data that the next `.then` catches and uses. Returning `.json()` gives the actual response data you're looking for back to the next `.then`. It could also look like this:

``` javascript
fetch(url).then(function(res) {
    return response.json().then(fucntion(data) {
        console.log(data);
    });
});
```

### Fetch Options

``` javascript
fetch(url, {
    method: "POST",
    body: JSON.stringify({
        name: "Clint",
        age: 24
    })
})
.then(function(res) {
    return res.json();
});
```

### Fetch Error Handling

``` javascript
var btn = document.querySelector("button");
btn.addEventListener("click", function() {
    var url = 'https://api.example.com/data';
    
    fetch(url)
    .then(function(response) {
        console.log("Everything is fine!");
    })
    .catch(function() {
        console.log("There is a problem!");
    });
});
```

A 404 error won't actually be caught by fetch. So when will the catch function trigger? It will trigger when there is a problem with the request itself. Maybe the user's internet is off, or there is a credentials issue.

We can use the response param to check the status of the request (404 or 200, etc.). There's a property called `ok` we can use like so:

``` javascript
var btn = document.querySelector("button");
btn.addEventListener("click", function() {
    var url = 'https://api.example.com/data';
    
    fetch(url)
    .then(function(response) {
        if (!response.ok) {
            // throw error
            console.log("Error with response status!");
        }
        console.log("Everything is fine!");
    })
    .catch(function() {
        console.log("There is a problem!");
    });
});
```

We can actually put the error handling in its own `.then`

``` javascript
fetch(url)
.then(function(response)) {
    if (!response.ok) {
        // throw error
        throw Error(404);
    }
    return response;
})
.then(function(response) {
    console.log("ok");
})
.catch(function(error) {
    console.log(error);
});
```

### The Problem with Fetch

Browser support. IE11 does not support fetch at all. Other browsers started suporting it only fairly recently (2016ish).