/*
 * Note: The word file should do the following: (check out: https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/)
 *	-receive the chosen word as a param
 *	-compare the letters guessed to the letters in the word selected
 * Note: Reference for const, let, var: https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75#.onfm49mcm
 */
"use strict";

const Letter = require('./letter.js');

class Word {

	/**
	 * Convert the randomly chosen word into an array of letters
	 * @param {string} word The word randomly chosen by the computer
	 * @return N/A
	 */ 
	constructor (word, array) {
		this.word = word;
		//console.log("typeof this.word: " + typeof this.word);

		// Turn the word into an array (split) of letters, and run them through the Letter module
		this.letters = this.word
			.split("")
			.map(v => new Letter(v));

		// Establish the master word array
		this.masterAnswerArray = array;
	}

	/**
	 * Display the current word state to the user. Will show combo of blanks and letters guessed correctly
	 * Note: each item in the letters array has access to all methods in Letter module. show() will generate a letter or underscore,
	 * and join(" ") will display each item as a string, separated by the passed delimitter (in this case, a blank)
	 * @param N/A
	 * @return {string} word The current word in gameplay, including blanks and letters
	 * Note: this.letters =
	 * [ 
     *   Letter { letter: 'K', visible: false },
     *   Letter { letter: 'o', visible: true  },
     *   Letter { letter: 'r', visible: false },
     *   Letter { letter: 'o', visible: false },
     *   Letter { letter: 'l', visible: true  },
     *   Letter { letter: 'e', visible: false },
     *   Letter { letter: 'v', visible: true  } 
     * ]
	 */
	displayWordState() {
		var word = this.letters
			.map(v => v.show()).join("");
		//console.log("this.letters in displayWordState: " , this.letters);
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
		//}).some(b => b);
		//}).some(function(b) {
			//console.log('b: ' + b);
			//return b;
		});
	}

	/**
	 * Remove the word from the master word array if the round is complete (including both win and loss cases)
	 * @param N/A
	 * @return N/A
	 */
	removeWord() {
		var index = this.masterAnswerArray.indexOf(this.word);
		if(index != -1) {
			this.masterAnswerArray.splice(index, 1);
			//console.log('masterAnswerArray: ' + this.masterAnswerArray);
		}	
	}

	/**
	 * Determine if the round is finished or not.
	 * @param N/A
	 * @return {boolean} True if words match, false if they do not.
	 */
	roundFinished() {
		return this.displayWordState() == this.word;
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

// Test the code
//var word = new Word("Tesla");
//word.displayWordState();

// Make the entire class available to other files
module.exports = Word;


/*
 	var title = title || "Error";
	basically checks if title evaluates to false. If it does, it "returns" "Error", otherwise it returns title.
*/