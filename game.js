"use strict";

// Return a random word from the main answer choice game array
class Game {
	// Receive the masterAnswerArray
	constructor(wordArray) {
		this.wordArray = wordArray;
	}
	
	/**
	 * Pick a random word from the masterAnswerArray
	 * @param N/A
	 * @return {string} A word to be used for main gameplay
	 */
 	pickRandomWord() {
		return this.wordArray[Math.floor(Math.random() * this.wordArray.length + 1) - 1];
	}
}

module.exports = Game;