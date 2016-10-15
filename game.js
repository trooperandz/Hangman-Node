/**
 * File: game.js
 * Created: 10/15/16
 * Purpose: Execute main gameplay functions
 * @author: Matt Holland
 */

// Enable ECMA6 methods
"use strict";

// Return a random word from the main answer choice game array
class Game {

	// Create the masterAnswerArray
	constructor() {
		// Create currentWord var holder
		this.currentWord = "";

		// State the main game array of word choices
		this.masterAnswerArray = ["Tesla", "Einstein", "Farraday", "Korolev", "Turing"];
	}
	
	/**
	 * Pick a random word from the masterAnswerArray
	 * @param N/A
	 * @return {string} A word to be used for main gameplay
	 */
 	pickRandomWord() {
 		this.currentWord = this.masterAnswerArray[Math.floor(Math.random() * this.masterAnswerArray.length + 1) - 1];
 		return this.currentWord;
	}

	/**
	 * Remove the word from the master word array if the round is complete (including both win and loss cases)
	 * @param N/A
	 * @return N/A
	 */
	removeWord() {
		var index = this.masterAnswerArray.indexOf(this.currentWord);
		console.log("this.currentWord: " + this.currentWord + " index of word to remove: " + index);
		this.masterAnswerArray.splice(index, 1);
		console.log("this.masterAnswerArray: " + this.masterAnswerArray);
	}

	/**
	 * Determine length of master array.  If 0, game is over
	 * @param N/A
	 * @return
	 */
	gameFinished() {
		return (this.masterAnswerArray.length == 0) ? true : false;
	}
}
// Make the module available to the main program
module.exports = Game;