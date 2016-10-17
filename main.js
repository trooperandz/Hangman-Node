"use strict";

// Include all necessary modules
const inquirer = require('inquirer');

const Game = require('./game.js');

const Word = require('./word.js');

const Letter = require('./letter.js');

// Instantiate class instances
var game = new Game();
var word = new Word(game.pickRandomWord());

// Main gameplay object
var main = {
	// Establish total guesses possible
	guessesRemaining: 10,
	
	// Keep track of correct guesses.  Once the count == tempGuessArray, current round has been concluded
	correctGuessCount: 0,
	
	// Show the user all guesses which had been they doned!
	userGuesses: [],
	
	// Establish user round lost and won counts
	winCount: 0,
	lostCount: 0,
	
	// Establish regex for Y, or y, or N, or n user answers (yes or no)
	validYesNo: /[YyNn]/,
	validYes: /[Yy]/,

	// Display the intro message, to be used on initial program load
	getIntroMsg: function() {
		console.log(
			"**************************" + 
			"\nWelcome to Terminal Hangman!" +
			"\nIt is ALL in the Terminal, NOT the browser!" + 
			"\nIsn't that like a really great thing?" +
			"\nThe theme is scientists." +
			"\nPlease guess a letter, and we will tell you if you got it right!"
		);
	},

	// Display all necessary info for ongoing gameplay
	printInfo: function() {
		console.log(
			"*********************************" +
			"\nWin Count: " + this.winCount + " Loss Count: " + this.lostCount +
			"\nGuesses Remaining: " + this.guessesRemaining +
			"\nWords Remaining: " + (game.masterAnswerArray.length - 1) +
			"\n** Hint: " + game.currentHint +
			"\nLetters guessed: " + this.userGuesses.join(" ") + 
			"\nYour current word to guess: " + word.displayWordState()
		);
	},

	// The main gameplay question series, using inquirer
	playGame: function() {
		inquirer.prompt(
			[
				{
					name: "guess",
					message: "Please guess a letter...",
					type: "input"
				}
		
		]).then(function(answers) {
			// Note: could not use the this keyword in here without the code ceasing
			if(main.guessesRemaining > 0) {
				// If user's guess isn't yet inside of the userGuesses array, push it & decrement the guess count
				if(main.userGuesses.indexOf(answers.guess) == -1) {
					main.userGuesses.push(answers.guess);
					// Decrement guesses remaining, if they haven't guessed the letter yet
					main.guessesRemaining -= 1;
				}

				// Set letter property visible to true, if user guess is in the answer word string
				word.playerGuess(answers.guess);

				// Show the status messages, including the current word display (with blanks)
				main.printInfo();
	
				// Check to see if the word has been guessed all the way or not
				if(word.roundFinished()) {
					// User guessed the word. Now remove it from the master array
					game.removeWord();
	
					// If the master word array is empty, the game is over. Otherwise, initialize another round
					if(game.gameFinished()) {
						// The game is over. Show win status and instruct the user to restart the program again if he/she wishes to play again
						console.log(main.getGameFeedback() + "If you would like to play again, please restart the program!");
					} else {
						// Increment win count
						main.winCount += 1;
	
						// Initialize inquirer prompt, and another round if user chooses to continue
						main.playAnotherRound("You got it! The correct word was: " + word.revealWord() + ". Would you like to keep playing (y/n)?");
					}
					return true;
				}
	
				// Recursively ask the question again
				main.playGame();
	
			} else {
				// User wasn't able to guess the word correclty. Remove the word from the master array
				game.removeWord();
				// There are no more guesses left.  Ask player if he/she wants to play again, if the master word array is not empty
				if(game.gameFinished()) {
					// The game is over. Show win status and instruct the user to restart the program again if he/she wishes to play again
					console.log(main.getGameFeedback() + "If you would like to play again, please restart the program!");
				} else {
					// Increment losses
					main.lostCount += 1;
	
					// Initialize inquirer prompt, and another round if user chooses to continue
					main.playAnotherRound("Sorry, you missed that one! The correct word was: " + word.revealWord() + ". Would you like to keep playing (y/n)?");
				}
			}
		});
	},

	// Initialize a new round
	initializeRound: function() {
		// Reset guesses remaining
		this.guessesRemaining = 10;
	
		// Clear out the guesses array
		this.userGuesses = [];
	
		// Instantiate new word object
		word = new Word(game.pickRandomWord());
	},

	// Ask user to play another round, and process accordingly
	playAnotherRound: function(msg) {
		// User won the round, and there are still more words to guess.  Ask if they want to play again
		inquirer.prompt(
		[
			{
				name: "answer",
				message: msg,
				type: "input",
				validate: function(input) {
					return (main.validYesNo.test(input)) ? true : false;
				}
			}
		]).then(function(answers) {
			if(main.validYes.test(answers.answer)) {
				// Start another round, instantiate new game items
				main.initializeRound();
				main.printInfo();
				main.playGame();
			} else {
				// User chose not to start another round.  Show goodbye msg
				console.log("Thanks for playing; ya'll come back now, ya here?");
			}
		});
	},

	// Get the final game result message, based on win and loss counts
	getGameFeedback: function() {
		var msg = "";
		var answer = "The correct word was: " + word.revealWord() + ". ";
		if(this.winCount > this.lostCount) {
			msg += "Congratulations, you won! " + answer;
		} else if (this.winCount < this.lostCount) {
			msg += "Sorry, but you lost! " + answer;
		} else {
			msg += "It was a tied game! " + answer;
		}
		return msg;
	}
} // end var main

// Initialize the game!
main.getIntroMsg();
main.printInfo();
main.playGame();