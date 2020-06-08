import {
    fifaData
} from "./fifa.js";
console.log(fifaData);

console.log("its working");
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

const finalsTeam = fifaData.filter((item) => {
    return item.Year === 2014 && item.Stage === "Final";
});

console.log(finalsTeam[0]);

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {
    return data.filter((final) => final["Stage"] === "Final"); /* 'data' stands in for the callback array */
} /* used 'final' as keyword. created anonymous function to point to the array object and give it a true/false */

console.log(getFinals(fifaData)); /* getFinals pulls data directly from the array to populate */

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(data, callBack) {
    return callBack(data).map((years) => years["Year"]); /* callBack takes the place of getFinals since it is being passed into another function */
} /* spent way too much time trying to get this to work properly when all I had to do was tell the map function to use the keyword 'years' to populate the new array with the object values */

console.log(getYears(fifaData, getFinals)); /* we have to invoke fifaData otherwise we get callBack is not a function */

/* Task 5: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */

function getWins(item) { /* needed to create a global function to call on so I can use it later for the next task. plus it makes things cleaner */
    if (item['Home Team Goals'] > item['Away Team Goals']) {
        return item['Home Team Initials']; /* would like to use full team names here, but initials were necessary to make it work on next task */
    } else return item["Away Team Initials"];
}

function getWinners(data, callBack) {
    return callBack(data).map((wins) => getWins(wins));
}

console.log(getWinners(fifaData, getFinals));


/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(data) {
    const winYrs = []; /* forEach doesn't create new array, so needed to declare that here */
    getFinals(data).forEach(arr => {
        winYrs.push(`In ${arr['Year']}, ${(getWinners([arr], getFinals))} won the World Cup!`) /* created anon function to push values into winYrs. took a while to figure out syntax. */
    })
    return winYrs;
}

console.log(getWinnersByYear(fifaData, getWinners, getYears));

/* Task 7: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
    return ({
        'Home Average': (data.map(goals => goals['Home Team Goals']).reduce((total, current) => total += current, 0) / data.length).toFixed(2),
/* mapped data for specific object output, reduced and created anon func to perform calculations. total = total + current / array.length */
        'Away Average': (data.map(goals => goals['Away Team Goals']).reduce((total, current) => total += current, 0) / data.length).toFixed(2)
    });
}

console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
    
    let countWins = getFinals(data).reduce((total, current) => {
        if (getWins(current) === teamInitials) {
            total++;
        }
        return total;
    }, 0);   
    return `${teamInitials} has won ${countWins} World Cups!` 
}

console.log(getCountryWins(fifaData, "USA"));

/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals( /* code here */ ) {
    /* code here */
}

getGoals();

/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense( /* code here */ ) {
    /* code here */
}

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */