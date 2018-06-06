var _ = window.document;

var elXHR = _.querySelector("#xhr"),
    elFetch = _.querySelector("#fetch"),
    eljQuery = _.querySelector("#jQuery"),
    elAxios = _.querySelector("#axios"),
    elQuote = _.querySelector("#quote"),
    url = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

elXHR.addEventListener("click", function() {
    var XHR = new XMLHttpRequest();

    XHR.onreadystatechange = function() {
        if (XHR.status == 200 && XHR.readyState == 4) {
            var response = JSON.parse(XHR.responseText);
            var quote = response[0];
            
            elQuote.innerText = '"' + quote + '"';
        }
    }

    XHR.open("GET", url);
    XHR.send();
});

elFetch.addEventListener("click", function() {

    fetch(url)
    .then(function(res) {
        if (res.ok) {
            return res.json().then(function(data) {
                return data[0];
            });
        } else {
            throw Error("NOPE!");
        }
    })
    .then(function(res) {
        elQuote.innerText = '"' + res + '"';
    })
    .catch(function(err) {
        console.log(err);
    });

});

$('#jQuery').on('click', function(e) {
    var $el = $(e.currentTarget);

    $.ajax({
        type: "GET",
        url: url,
        success: function(res) {
            $('#quote').text('"' + res[0] + '"');
        }
    });

});

elAxios.addEventListener("click", function() {

    axios.get(url)
    .then(function(res) {
        return res.data[0];
    })
    .then(function(res) {
        elQuote.innerText = '"' + res + '"';
    })
    .catch(function(err) {
        console.log(err.message);
    });

});