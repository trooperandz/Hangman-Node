/* some() function
// Establish array
var numbers = [1, 15, 4, 10, 11, 22];

// Call the function. Set to result var
var result = numbers.some(checkIfEven);

// Log the result
console.log("result: " + result);

// The callback function
function checkIfEven(value, index, ar) {
    if (value % 2 == 0)
        return true;
}*/


/* map() function 
// Establish array
myArray = [1,2,3,4];
// Add one to every array element, the ECMA6 way
var newArr = myArray.map(element => element + 1);

// The ECMA5 way:
// var newArr = myArray.map(function (element) {
// 	return element + 1;
// });

console.log('myArray: ' + newArr); */

str1 = "Hey, man!";
str2 = "Hey, bra!";
str3 = " _ ";
str4 = null;
console.log("str1 before changes : " + str1 + "\nstr2 before changes: " + str2 + "\nstr3 before changes: " + str3);
var str1 = str4 || str2;  	// Will set str1 = "Hey, bra!"
var str2 = str3 || "nada!"; // Will set str2 = " _ "
var str3 = str4 || str1;    // Will set str3 = "Hey, bra!"
console.log("str1 after changes: " + str1 + "\nstr2 after changes: " + str2 + "\nstr3 after changes: " + str3);  