"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 3

   Crossword Puzzle Script
   
   Author: Anthony S,A Gradillas
   Date:   3.25.19
   
   Global Variables
   ================
   allLetters
      References all of the letter cells in the crossword table#crossword
   
   currentLetter
      References the letter currently selected in the puzzleLetter
      
   wordLetters
      References the across and down letters in the word(s) associated with the current letter
   
   acrossClue
      References the across clue associated with the current letter
      
   downClue
      References the down clue associated with the current letter
      
         
   Functions
   =========
   
   init()
      Initializes the puzzle, setting up the event handlers and the variable values
       
   formatPuzzle(puzzleLetter)
      Formats the appearance of the puzzle given the selected puzzle letter
      
   selectLetter(e)
      Applies keyboard actions to select a letter or modify the puzzle navigation
      
   switchTypeDirection()
      Toggles the typing direction between right and down
      
   getChar(keyNum)
      Returns the text character associated with the key code value, keyNum


*/

// Will reference all letters in the crossword puzzle
var allLetters;
// Will reference the letter currently selected in the puzzle
var currentLetter;
// Will reference the letters used in the currently selected across and down clues
var wordLetters;
// Will reference the across clue currently selected in the puzzle
var acrossClue;
// Will refernce the down clue curretly selected in the puzzle
var downClue;
// Stores the current typing direvtion
var typeDirection = "right";

// Runs the init function when the page loads
window.onload = init;

// Sets up the initial conditions of the puzzle
function init() {
      // Sets allLetters to refrence the elements using the selector table#crossword span
      allLetters = document.querySelectorAll("table#crossword span");
      // Sets currentLetters to refrence the first object in allLetters collection
      currentLetter = allLetters[0];
      // The acrossId variable was declared, setting its value equal to the value of the data-clue-a attribute for currentLetter
      var acrossID = currentLetter.dataset.clueA;
      // The downId variable was declared, setting its value equal to the value of the data-clue-d attribute for currentLetter
      var downID = currentLetter.dataset.clueD;
      // The value of acrossClue was set to reference the element with the id attribute acrossID
      acrossClue = document.getElementById(currentLetter.dataset.clueA);
      // The value of downClue was set to reference the element with the id attribute downID
      downClue = document.getElementById(currentLetter.dataset.clueD);
      // Colors the crosswords puzzle first letter by calling the formatPuzzle function using the currentLetter as a parameter
      formatPuzzle(currentLetter);
      // Loops through the items within the allLetters object collection and should allow the user to select a puzzle cell using their mouse
      for (var i = 0; i < allLetters.length; i++) {
            // Changes the cursor style to a pointer
            allLetters[i].style.cursor = "pointer";
            // Adds onmousedown event handler that will run an anonymous function calling the formatPuzzle function using the event object target as the parameter
            allLetters[i].onmousedown = function (e) {
                  formatPuzzle(e.target);
            }
      }
      // Runs the selectLetter funtion in response to the keydown event occuring with the document
      document.onkeydown = selectLetter;
      //
      var typeImage = document.getElementById("directionImg");
      //
      typeImage.style.cursor = "pointer";
      typeImage.onclick = switchTypeDirection;
      //
      document.getElementById("showErrors").onclick = function () {
            for (var i = 0; i < allLetters.length; i++) {
                  if (allLetters[i].textContent !== allLetters[i].dataset.letter) {
                        allLetters[i].style.color = "red"
                        setTimeout(function () {
                              for (var i = 0; i < allLetters.length; i++) {
                                    allLetters[i].style.color = "";
                              }
                        }, 300);
                  }
            }
      }
      //
      document.getElementById("showSolution").onclick = function () {
            for (var i = 0; i < allLetters.length; i++) {
                  allLetters[i].textContent = allLetters[i].dataset.letter;
            }
      }
}

// The following function will format the colors of the crossword table cells and the clues in the clues list based on the letter that is selected by the user
function formatPuzzle(puzzleLetter) {
      // Changes the value of the currentLetter to puzzleLetter
      currentLetter = puzzleLetter;
      // Removes the current colors in the puzzle by looping through all items in the allLeters object collection, changing the background-color style of each to an empty text string
      for (var i = 0; i < allLetters.length; i++) {
            allLetters[i].style.backgroundColor = "";
      }
      // Removes the highlighting of the current clue by changing the color style of the acrossClue and the downClue to an empty text string
      acrossClue.style.color = "";
      downClue.style.color = "";
      // Determines wether or not ther exists an across clue for the current letter by testing wether currentLetter.dataset.clueA is not equal to undefined
      if (currentLetter.dataset.clueA != undefined) {
            // References the element with the ID value of currentLetter.dataset.clueA in order to reference the across clue for the current letter
            acrossClue = document.getElementById(currentLetter.dataset.clueA);
            // Changes the acrossClue color to blue
            acrossClue.style.color = "blue";
            // Refrences all elements selected by the CSS selector where clue is the value of data-clue-A for the cuurentLetter
            wordLetters = document.querySelectorAll("[data-clue-a = " + currentLetter.dataset.clueA + "]");
            // Changes the style of the background color to a light blue
            for (var i = 0; i < wordLetters.length; i++) {
                  wordLetters[i].style.backgroundColor = "rgb(231, 231, 255)";
            }
      }
      if (currentLetter.dataset.clueD != undefined) {
            // References the element with the ID value of currentLetter.dataset.clueD in order to reference the down clue for the current letter
            downClue = document.getElementById(currentLetter.dataset.clueD);
            // Changes the downClue color to red
            downClue.style.color = "red";
            // Refrences all elements selected by the CSS selector where clue is the value of data-clue-A for the cuurentLetter
            wordLetters = document.querySelectorAll("[data-clue-d = " + currentLetter.dataset.clueD + "]");
            // Changes the style of the background color to a light blue
            for (var i = 0; i < wordLetters.length; i++) {
                  wordLetters[i].style.backgroundColor = "rgb(255, 231, 231)";
            }
      }
      // If the typeDirection = "right", then the backgroundColor will be changed to the given rgb color and if it is not right then it will change the currentLetter to a red rgb that was given
      if (typeDirection === "right") {
            currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
      } else {
            currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
      }
}

// The purpose of this function is to allow the user to select puzzle cells using the keyboard
function selectLetter(e) {
      // The leftLetter, upLetter, rightLetter, and downLetter variables were declared to have the values refrence the letters to left, up, right, and down the current letter selected in the table
      var leftLetter = document.getElementById(currentLetter.dataset.left);
      var upLetter = document.getElementById(currentLetter.dataset.up);
      var rightLetter = document.getElementById(currentLetter.dataset.right);
      var downLetter = document.getElementById(currentLetter.dataset.down);
      // Stores the code of the key pressed by the user in the userKey variable
      var userKey = e.keyCode;
      // Determines the program response based on the value of the userKey
      if (userKey === 37) {
            formatPuzzle(leftLetter);
      } else if (userKey === 38) {
            formatPuzzle(upLetter);
      } else if (userKey === 39 || userKey === 9) {
            formatPuzzle(rightLetter);
      } else if (userKey === 40 || userKey === 13) {
            formatPuzzle(downLetter);
      } else if (userKey === 8 || userKey === 46) {
            currentLetter.textContent = "";
      } else if (userKey === 32) {
            switchTypeDirection();
      } else if (userKey >= 65 && userKey <= 90) {
            currentLetter.textContent = getChar(userKey);
            if (typeDirection === "right") {
                  formatPuzzle(rightLetter);
            } else {
                  formatPuzzle(downLetter);
            }
      }
      // Prevents the browser from performing the default action in response to the keyboard event
      e.preventDefault();
}

// Toggles the typing direction between right and down
function switchTypeDirection() {
      //
      var typeImage = document.getElementById("directionImg");
      //
      if (typeDirection === "right") {
            typeDirection = "down";
            typeDirection = "pc_down.png";
            currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
      } else {
            typeDirection = "right";
            typeImage.src = "pc_right.png";
            currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
      }
}

/*====================================================*/

function getChar(keyNum) {
      return String.fromCharCode(keyNum);
}