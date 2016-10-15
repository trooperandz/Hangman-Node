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
		//console.log('this.letter inside of class Letter: ' + this.letter);
	}

	show() {
		//console.log((this.visible) ? 'true' : 'false');
		return(this.visible) ? this.letter : ' _ ';
	}
}

// Make the entire class available to other files
module.exports = Letter;