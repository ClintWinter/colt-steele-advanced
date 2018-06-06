var $ = window.document;
var elBtc = $.querySelector("#btc");
var elBtn = $.querySelector("#btn");

elBtn.addEventListener("click", function() {
    var url = "https://api.coindesk.com/v1/bpi/currentprice.json";

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        elBtc.textContent = "$" + data.bpi.USD.rate_float.toFixed(2);
    })
    .catch(function(err) {
        console.log(err);
    });
});