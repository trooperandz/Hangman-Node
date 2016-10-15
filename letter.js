/**
 * File: letter.js
 * Created: 10/13/16
 * Purpose: Show or hide letters based on boolean value
 * @author: Matt Holland
 */

"use strict";

class Letter {

	constructor(letter) {
		this.letter = letter;
		this.visible = false;
		// If the value/character is the space character, then make it automatically visible if it's a space
		//this.visible = (value === ' ');
	}

	show() {
		return(this.visible) ? this.letter : ' _ ';
	}
}

// Make the module available to the main program
module.exports = Letter;