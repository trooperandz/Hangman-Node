"use strict";

// Include all necessary modules
const inquirer = require('inquirer');

const Game = require('./game.js');

const Word = require('./word.js');

const Letter = require('./letter.js');

// Establish master array of answer choices
var masterAnswerArray = ["Tesla", "Einstein", "Farraday", "Korolev", "Turing"];

// Instantiate class instances, and set the initial word
var game = new Game(masterAnswerArray);
var word = new Word(game.pickRandomWord(), masterAnswerArray);

// Main gameplay object
var main = {
	// Establish the current word
	currentWord: game,

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
			"\nWords Remaining: " + masterAnswerArray.length +
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
			if(this.guessesRemaining > 0) {
				// If user's guess isn't yet inside of the userGuesses array, push it & decrement the guess count
				if(this.userGuesses.indexOf(answers.guess) == -1) {
					this.userGuesses.push(answers.guess);
					// Decrement guesses remaining, if they haven't guessed the letter yet
					this.guessesRemaining -= 1;
				}
				
				// Set letter property visible to true, if user guess is in the answer word string
				word.playerGuess(answers.guess);
	
				// Show the status messages, including the current word display (with blanks)
				this.printInfo();
	
				// Check to see if the word has been guessed all the way or not
				if(word.roundFinished()) {
					// User guessed the word. Now remove it from the master array
					word.removeWord();
	
					// If the master word array is empty, the game is over. Otherwise, initialize another round
					if(word.gameFinished()) {
						console.log("The game is over!");
					} else {
						// Increment win count
						this.winCount += 1;
	
						// Initialize inquirer prompt, and another round if user chooses to continue
						this.playAnotherRound("You got it! Would you like to keep playing (y/n)?");
					}
					return true;
				}
	
				// Recursively ask the question again
				this.playGame();
	
			} else {
				// User wasn't able to guess the word correclty. Remove the word from the master array
				word.removeWord();
				// There are no more guesses left.  Ask player if he/she wants to play again, if the master word array is not empty
				if(word.gameFinished()) {
						console.log("The game is over!");
				} else {
					// Increment losses
					this.lostCount += 1;
	
					// Initialize inquirer prompt, and another round if user chooses to continue
					this.playAnotherRound("Sorry, you missed that one! Would you like to keep playing (y/n)?");
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
	
		// Instantiate new objects
		game = new Game(masterAnswerArray);
		word = new Word(game.pickRandomWord(), masterAnswerArray);
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
					return (this.validYesNo.test(input)) ? true : false;
				}
			}
		]).then(function(answers) {
			if(this.validYes.test(answers.answer)) {
				// Start another round, instantiate new game items
				this.initializeRound();
				this.printInfo();
				this.playGame();
			} else {
				// User chose not to start another round.  Show goodbye msg
				console.log("Thanks for playing; better luck next time!");
			}
		});
	}
} // end var main

// Initialize the game!
main.getIntroMsg();
main.printInfo();
main.playGame();