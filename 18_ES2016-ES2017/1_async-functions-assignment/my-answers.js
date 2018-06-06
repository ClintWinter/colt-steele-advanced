/*

1. Write a function called hasMostFollowers, which accepts a variable number of arguments. You should then make an AJAX call to the Github User API (https://developer.github.com/v3/users/#get-a-single-user) to get the name and number of followers of each argument. The function should return a string which displays the username who has the most followers. 

Hint - Try to use Promise.all to solve this and remember that the jQuery AJAX methods ($.getJSON, $.ajax, etc.) return a promise.

*/

async function hasMostFollowers(...users) {
    let usersList = users.map(user => $.getJSON(`https://api.github.com/users/${user}`));
    let usersData = await Promise.all(usersList);

    let max = usersData.sort((a, b) => a.followers < b.followers)[0];

    return `${max.name} has the most followers with ${max.followers}`;
}

/*

2. Write a function called starWarsString, which accepts a number. You should then make an AJAX call to the Star Wars API (https://swapi.co/ ) to search for a specific character by the number passed to the function. Your function should return a promise that when resolved will console.log the name of the character. 

*/

async function starWarsString(num) {
    let character = await $.getJSON(`https://swapi.co/api/people/${num}`);
    
    return `${character.name}`;
}

/*

Bonus 1 -  Using the data from the previous AJAX call above, make another AJAX request to get the first film that character is featured in and return a promise that when resolved will console.log the name of the character and the film they are featured in  

*/

async function starWarsString(num) {
    let character = await $.getJSON(`https://swapi.co/api/people/${num}`);
    let firstFilm = await $.getJSON(character.films[0]);

    return `${character.name} is featured in ${firstFilm.title}, directed by ${firstFilm.director}`;
}

/*

Bonus 2 -  Using the data from Bonus 1 - make another AJAX call to get the information about the first planet that the film contains. Your function should return a promise that when resolved will console.log the name of the character and the film they are featured in and the name of the planet.  

*/

async function starWarsString(num) {
    let character = await $.getJSON(`https://swapi.co/api/people/${num}`);
    let firstFilm = await $.getJSON(character.films[0]);
    let planet = await $.getJSON(firstFilm.planets[0]);

    return `${character.name} is featured in ${firstFilm.title}, directed by ${firstFilm.director} and it takes place on ${planet.name}`;
}