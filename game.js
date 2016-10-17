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
		// Create currentWord and currentHint vars
		this.currentWord = "";
		this.currentHint = "";

		// State the main game array of word choices
		this.masterAnswerArray = [
			{
				name: "TESLA",
				hint: "He is responsible for our entire AC electrical system."
			},

			{
				name: "EINSTEIN",
				hint: "He won the Nobel Prize for the photoelectric effect."
			},

			{
				name: "FARADAY",
				hint: "Established the basis for the concept of the electromagnetic field."
			},

			{
				name: "KOROLEV",
				hint: "The lead Soviet rocket engineer during the Space Race with the U.S."
			},

			{
			 	name: "TURING",
			 	hint: "The father of theoretical computer science and artificial intelligence."
			}
		];
	}
	
	/**
	 * Pick a random word from the masterAnswerArray
	 * @param N/A
	 * @return {object} The current word and the current hint
	 */
 	pickRandomWord() {
 		var index = Math.floor(Math.random() * this.masterAnswerArray.length);
 		this.currentWord = this.masterAnswerArray[index].name;
 		this.currentHint = this.masterAnswerArray[index].hint;
 		return { currentWord: this.currentWord, currentHint: this.currentHint };
	}

	/**
	 * Remove the word from the master answer array if the round is complete (including both win and loss cases)
	 * @param N/A
	 * @return N/A
	 */
	removeWord() {
		var index;
		// Note: had to establish w for scoping error
		var w = this.currentWord;
		this.masterAnswerArray.forEach(function(obj, i, arr) {
			if(w == obj.name){
				index = i;
			}
		});
		this.masterAnswerArray.splice(index, 1);
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