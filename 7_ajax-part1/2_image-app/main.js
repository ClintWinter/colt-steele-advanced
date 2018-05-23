var $ = window.document;
var elBtn = $.querySelector("#btn");
var elImg = $.querySelector("#photo");

// listen for clicks
elBtn.addEventListener("click", function() {
    // make request
    var XHR = new XMLHttpRequest();
    var url = "https://dog.ceo/api/breeds/image/random";

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {
            var response = JSON.parse(XHR.responseText);
            var photo = response.message;

            elImg.src = photo;
        }
    }
    
    XHR.open("GET", url);
    XHR.send();
});