/*

1. Write a function called getMostFollowers, which accepts a variable number of arguments. You should then make an AJAX call to the Github User API (https://developer.github.com/v3/users/#get-a-single-user) to get the name and number of followers of each argument. The function should return a promise, which when resolved, returns a string which displays the username who has the most followers. 

Hint - Try to use Promise.all to solve this and remember that the jQuery AJAX methods ($.getJSON, $.ajax, etc.) return a promise.

*/

// the api didn't work for me, so I'm basing my answer off of zero error checking...
function getMostFollowers(...userNames) {
	let promiseArr = [];
	for (let name of userNames) {
		promiseArr.push($.getJSON(`https://api.github.com/users/${name}`));
	}

	return Promise.all(promiseArr).then(function(users) {
		let max = users.sort((a, b) => a.followers < b.followers)[0];
		return `${max.name} has the most followers with ${max.followers}`;
	});
}

getMostFollowers("elie", "tigarcia", "colt").then(function(data) {
	console.log(data);
});

/*

2. Write a function called starWarsString, which accepts a number. You should then make an AJAX call to the Star Wars API (https://swapi.co/ ) to search for a specific character by the number passed to the function. Your function should return a promise that when resolved will console.log the name of the character.

*/

function starWarsString(num) {
	return $.getJSON(`https://swapi.co/api/people/${num}`).then(function(person) {
		return person.name;
	});
}

starWarsString(1).then(function(name) {
	console.log(name);
});

/*

Bonus 1 -  Using the data from the previous AJAX call above, make another AJAX request to get the first film that character is featured in and return a promise that when resolved will console.log the name of the character and the film they are featured in 

*/

function starWarsString(num) {
	return $.getJSON(`https://swapi.co/api/people/${num}`).then(function(person) {
		return $.getJSON(person.films[0]).then(function(film) {
			return `${person.name} is featured in ${film.title}, directed by ${film.director}`;
		});
	});
}

starWarsString(1).then(function(name) {
	console.log(name);
});

/*

Bonus 2 -  Using the data from Bonus 1 - make another AJAX call to get the information about the first planet that the film contains. Your function should return a promise that when resolved will console.log the name of the character and the film they are featured in and the name of the planet. 

*/

function starWarsString(num) {
	return $.getJSON(`https://swapi.co/api/people/${num}`).then(function(person) {
		return $.getJSON(person.films[0]).then(function(film) {
			return $.getJSON(film.planets[0]).then(function(planet) {
				return `${person.name} is featured in ${film.title}, directed by ${film.director} and it takes place on ${planet.name}`;
			});
		});
	});
}

starWarsString(1).then(function(data) {
	console.log(data);
});
