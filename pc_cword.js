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
var typeDirection;

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
      acrossClue = document.getElementById("acrossID");
      // The value of downClue was set to reference the element with the id attribute downID
      downClue = document.getElementById("downID");
}

// The following function will format the colors of the crossword table cells and the clues in the clues list based on the letter that is selected by the user
function formatPuzzle(puzzleLetter) {
      // Changes the value of the currentLetter to puzzleLetter
      currentLetter = puzzleLetter;
      // Removes the current colors in the puzzle by looping through all items in the allLeters object collection, changing the background-color style of each to an empty text string
      for (var i = 0; i < allLetters.length; i++) {
            allLetters[i].style.backgroundColor = "";
      }
}


/*====================================================*/

function getChar(keyNum) {
      return String.fromCharCode(keyNum);
}