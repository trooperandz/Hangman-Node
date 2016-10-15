/**
 * File: word.js
 * Created: 10/15/16
 * Purpose: Receive the current word in gameplay, display it to the user, and check to see if the round is finished
 * @author: Matt Holland
 */

// Enable ECMA6 methods
"use strict";

const Letter = require('./letter.js');

class Word {

	/**
	 * Convert the randomly chosen word into an array of letters
	 * @param {string} word The word randomly chosen by the computer
	 * @return N/A
	 */ 
	constructor (word) {
		this.word = word;
		//console.log("typeof this.word: " + typeof this.word);

		// Turn the word into an array (split) of letters, and run them through the Letter module
		this.letters = word
			.split('')
			.map(v => new Letter(v));
	}

	/**
	 * Display the current word state to the user. Will show combo of blanks and letters guessed correctly
	 * Note: each item in the letters array has access to all methods in Letter module. show() will generate a letter or underscore,
	 * and join(" ") will display each item as a string, separated by the passed delimitter (in this case, a blank)
	 * @param N/A
	 * @return {string} word The current word in gameplay, including blanks and letters
	 */
	displayWordState() {
		var word = this.letters
			// Collect results into a new array
			.map(v => v.show())
			// Call join to return a string
			.join("");
		return word;
	}

	/**
	 * See if the letter guessed exists in the curent word.  If so, set visible to true, so that letter shows instead of a " _ ".
	 * Note: some() function does stuff
	 */
	playerGuess(guess) {
		this.letters.map(function(a) {
			if(guess == a.letter) {
				a.visible = true;
				return true;
			} else {
				return false;
			}
		});
		/* Alternative code to implement:
		return this.letters
			.map(a => {
				var match = (guess === a.value);
				a.visible = a.visible || match;
				return match;
			});*/
	}

	revealWord() {
		// Code here
	}

	/**
	 * Determine if the round is finished or not.
	 * @param N/A
	 * @return {boolean} True if words match, false if they do not.
	 */
	roundFinished() {
		return this.displayWordState() == this.word;
	}
}

// Make the module available to the main program
module.exports = Word;