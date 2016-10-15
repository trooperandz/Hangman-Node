var inquirer = require('inquirer');

const Game = require('./game.js');

const Word = require('./word.js');

const Letter = require('./letter.js');

// Establish master array of answer choices
var masterAnswerArray = ["Tesla", "Einstein", "Farraday", "Koralev", "Turing"];

// Establish total guesses possible
var guessesRemaining = 10;

// Keep track of correct guesses.  Once the count == tempGuessArray, current round has been concluded
var correctGuessCount = 0;

// Establish regex for Y, or y, or N, or n user answers (yes or no)
var validYesNo = /[YyNn]/;

var currentWordArray = game.currentWordArray;
console.log("currentWordArray: " + game.currentWordArray);
var blanksArray = game.blanksArray;

var blanks = "";
function printInfo() {
	game.blanksArray.forEach(function(blank, index) {
		blanks += " _ ";
	});
	console.log("Your current word: " + blanks + "\n");
}

console.log("************************** \nWelcome to Terminal Hangman! \nIt is ALL in the Terminal, NOT the browser! \nIsn't that awesome? \nThe theme is scientists.  \nPlase guess a letter, and we will tell you if you got it right!")

printInfo();

// Test the splice function. This works!
/*
var testArr = ["a", "b", "c", "d", "e", "f"];
console.log("testArr: " + testArr);
testArr.splice(1, 1, "c");
console.log("testArr after splice: " + testArr);*/

function askQuestion() {
inquirer.prompt(
	[
		{
			name: "guess",
			message: "Please guess a letter...",
			type: "input"
		}

	]).then(function(answers) {
		// Process the guess
		if(guessesRemaining > 0) {
			// Check to see if the letter guessed is anywhere in the array
			var index = game.currentWordArray.indexOf(answers.guess);

			// If the letter guessed was found, loop through the currentWordArray and replace blanks in blanksArray. Otherwise, don't run the loop.
			if(index != -1) {
				game.currentWordArray.forEach(function(letter, i, array) {
					// Get the index of the guess which was found.  Start at position i, so that check doesn't stop on first duplicate letter found
					var index = array.indexOf(answers.guess, i);
					if(index != -1) {
						console.log('index in indexOf if: ' + index);
						// Replace the blank with the letter found: splice(position, total replacements, letter to insert)
						game.blanksArray.splice(index, 1, letter);
						if(letter == answers.guess) {
							// Increment correctGuessCount, only if the current letter matches the guess (for tracking of end of round notice)
							correctGuessCount += 1;
							console.log('correctGuessCount: ' + correctGuessCount);
						}
					}
				});
				console.log('blanksArray: ' + blanksArray);
			} else {
				// User guessed an incorrect letter. Decrement the guessesRemaining count
				guessesRemaining -= 1;
			}

			// Prompt user for another question if correctGuessCount < currentWordArray length. (Will only run if guessesRemaining > 0)
			if(correctGuessCount < currentWordArray.length) {
				askQuestion();
			} else {
				// User guessed the word correctly.  Now take the word out of the masterAnswerArray, so that it cannot be selected again
				var removeIndex = game.masterAnswerArray.indexOf(game.currentWord);
				game.masterAnswerArray.splice(removeIndex, 1);
				// Use inquirer to ask the player if he/she would like to continue, only if masterAnswerArraylength > 0
				if(game.masterAnswerArray.length > 0) {
					inquirer.prompt(
							[
								{
									name: "answer",
									message: "Nice work, you got it right!  Would you like to continue (Y/N)?",
									type: "input",
									validate: function(input) {
										return (validYesNo.test(input)) ? true : false;
									}
								}
							]).then(function(answers) {
								if(answers.answer == 'Y' || answers.answer == 'y') {
									// start another round here
									console.log('Player wants to start another round.');
								} else {
									// end the game
									console.log("Player chose to discontinue gameplay");
								}
							});


					console.log("Nice! You guessed the word correctly!");
			}
		} else {
			// There are no more guesses left.  Ask player if he/she wants to play again
			inquirer.prompt(
				[
					{
						name: "answer",
						message:"You have no more guesses! Play again (Y/N)?",
						type: "input",
						validate: function(input) {
							return (validYesNo.test(input)) ? true : false;
						}
					}

				]).then(function(answers) {
					if(answers.answer == 'Y' || answers.answer == 'y') {
						askQuestion();
					} else {
						//console.clear("Thank you for playing! Have a nice day :) ");
						console.log("Thank you for playing! Have a nice day :) ");
					}
				});
		}

		//askQuestion();
	});
}

askQuestion();