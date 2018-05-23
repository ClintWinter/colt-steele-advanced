var $ = window.document;

var XHR = new XMLHttpRequest();

XHR.onreadystatechange = function() {
    if (XHR.readyState == 4 && XHR.status == 200) {
        console.log(XHR.responseText);

        var node = $.createElement("P");
        var textnode = $.createTextNode(XHR.responseText);
        node.appendChild(textnode);
        $.querySelector('main').appendChild(node);
        
    }
};

XHR.open("GET", "https://api.github.com/zen");
XHR.send();