var $ = window.document;

var elBtn = $.querySelector("button.block"),
    elImg = $.querySelector("img#pic"),
    elName = $.querySelector("#name"),
    elUsername = $.querySelector("#username"),
    elEmail = $.querySelector("#email"),
    elCity = $.querySelector("#city"),
    url = "https://randomuser.me/api/";

elBtn.addEventListener("click", function() {
    
    fetch(url)
        .then(handleErrors)
        .then(parseJson)
        .then(updateProfile)
        .catch(printError);

});

function handleErrors(res) {
    if (res.ok) {
        return res;
    }
    throw Error();
}

function parseJson(res) {
    return res.json().then(function(parsedData) {
        return parsedData.results[0];
    });
}

function updateProfile(result) {
    elImg.src = result.picture.large;
    elName.innerText = jsUcfirst(result.name.first) + " " + jsUcfirst(result.name.last);
    elUsername.innerText = result.login.username;
    elEmail.innerText = result.email;
    elCity.innerText = result.location.city;
}

function printError(error) {
    console.log(error);
}

function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}