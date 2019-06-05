var words = ["APPLE", "BANANA", "CHERRY"]  
var usableLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var playing = true;

var wins = 0;
var losses = 0;
var guess = 5;   //5 for test, change to 20
var guessRemain = guess;

var chosenWord = "";
var letters = [];
var underScore = [];

// choose random words and put _ on the page
function selectRandomWord() {
  var max = words.length - 1;
  var randomNum = Math.floor(Math.random() * max);  //return a random number of the array.
  chosenWord = words[randomNum].toLowerCase();  //return a random word from the array.
  letters = chosenWord.split('');   //split a word into an array of letters
  
  for (var i = 0; i < letters.length; i++) {   //iterate for as many times as the letters of the array. 
    underScore.push("_");  //push _ into an array of underScore.
  }

  for (var i = 0; i < underScore.length; i++) {  //iterate for as many times as the numbers of underscore.
    document.querySelector("#underScore").innerHTML += underScore[i] + " ";  //add "_ " to #underScore element. 
  }
}

//initialize the game
function initialize() {
  //set the numbers of guess remaining. 
  document.getElementById("guessRemain").textContent = guess; //20
  //show the starting message.
  document.getElementById("message").innerHTML = "Press any key to start!";
  //delete letters already guessed
  document.querySelector("#lettersGuessed").innerHTML = null;
  //delete the underscore and the letters      
  document.querySelector("#underScore").innerHTML = null;
  
  playing = true;

  underScore = [];

  //choose random words and put _ on the page
  selectRandomWord();  
  
  //once user clicks any key, start the game!
  document.addEventListener('keypress', getUserGuess, {passive: false} );

  //diable enter keypress eventlistener
  document.removeEventListener('keypress', resetGame);

  console.log(chosenWord);
  console.log(letters);
  console.log(underScore);
}

//logic of the game
function getUserGuess(event) {
  var userGuess = event.key;   //get a letter that user pressed. 
  if(usableLetters.indexOf(userGuess) >= 0 ) {   //when user press one of the usableLetters.
    document.getElementById("message").innerHTML = "Keep guessing!";
    result = chosenWord.indexOf(userGuess);  //get the index number of chosenWord. Get -1 if userGuess is not one of the letters of chosenWord.

    //if ueserGuess is correct (is one of the letters of the chosenWord),
    //need to fix a bug!
    if (result > -1) {  
      underScore.splice(result, 1, userGuess);  //remove underScore and replace with userGuess
      document.getElementById("underScore").innerHTML = underScore.join(" ").toUpperCase();  //print underScore array to the P tag as strings!  
      document.getElementById("guessRemain").textContent--;   //reduce the number of guess remaining by 1. //.textContent method gets the content of the element
    } 

    //if userGuess is wrong,
    var targetLettersGuessed = document.getElementById("lettersGuessed");  //to avoid showing the same letter to #lettersGuessed
    var resultForAlreadyGuessed = targetLettersGuessed.textContent.indexOf(userGuess);  //to avoid showing the same letter to #lettersGuessed
    if (result === -1 && resultForAlreadyGuessed < 0) {
      targetLettersGuessed.innerHTML += userGuess + " ";   //add userGuess to #lettersGuessed      
      document.getElementById("guessRemain").textContent--;   //reduce the number of guess remaining by 1. //.textContent method gets the content of the element.
    } 

    //if used up all guesses,
    if ((letters.toString() != underScore.toString()) && (document.getElementById("guessRemain").textContent == 0)) {
      //if letters != underScore && guessRemain === 0,
      document.getElementById("losses").textContent++;
      document.getElementById("message").innerHTML = "You lost :( Try again! Click Enter!";
      playing = false;
    }

    //if user guess a chosenWord correctly, 
    if (letters.toString() == underScore.toString() && (document.getElementById("guessRemain").textContent >= 0)) {  //if array of letters and array of underScore are the same,
      document.getElementById("wins").textContent++;
      document.getElementById("message").innerHTML = "You win :) Wanna try another word? Click Enter!";
      playing = false;
    }    

    //disable the game and enable the enter key to reset the game
    if (playing === false) { 
      document.removeEventListener('keypress', getUserGuess);
      document.addEventListener('keypress', resetGame);
      }
    }
}

//reset the game by pressing enter key
function resetGame(event) {
  if (event.keyCode === 13) {
    initialize();
  }
}

//when the DOM loaded, start the game!
document.addEventListener('DOMContentLoaded', function (){
  initialize();
  console.log("initialized!");
});




