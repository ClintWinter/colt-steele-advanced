var $ = window.document;
var elBtc = $.querySelector("#btc");
var elBtn = $.querySelector("#btn");

elBtn.addEventListener("click", function() {
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
});