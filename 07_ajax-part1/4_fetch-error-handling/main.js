var $ = window.document;
var elBtc = $.querySelector("#btc");
var elBtn = $.querySelector("#btn");

elBtn.addEventListener("click", function() {
    var url = "https://api.coindesk.com/v1/bpi/currentprice.json";

    fetch(url)
    .then(function(res) {
        
        if (!res.ok) {
            throw Error(res.status);
        }

        return res.json();
    })
    .then(function(res) {
        elBtc.innerText = "$" + res.bpi.USD.rate_float.toFixed(2);
    })
    .catch(function(error) {
        console.log(error);
    });
});