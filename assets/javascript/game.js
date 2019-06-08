var words = ["LEONALD", "GASOL", "LOWRY", "GREEN", "IBAKA", "SIAKAM", "VANVLEET", "ANUNOBY", "LIN", "POWELL", "NURSE"]  
var usableLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var playing = true;

var wins = 0;
var losses = 0;
var guess = 10;   
var guessRemain = guess;

var chosenWord = "";
var letters = [];
var underScore = [];

// choose random words and put _ on the page
function selectRandomWord() {
  var max = words.length;
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
  document.getElementById("guessRemain").textContent = guess; 
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

    var result = chosenWord.indexOf(userGuess);  //get the index number of chosenWord. Get -1 if userGuess is not one of the letters of chosenWord.

    //if ueserGuess is correct (is one of the letters of the chosenWord),
    if (result > -1) { 

      for (var j = 0; j < chosenWord.length; j++) {
        var resultCorrect = chosenWord.indexOf(userGuess, j); 

        if (resultCorrect > -1){
          underScore.splice(resultCorrect, 1, userGuess);  //remove underScore and replace with userGuess
          document.getElementById("underScore").innerHTML = underScore.join(" ").toUpperCase();  //print underScore array to the P tag as strings!  
        } 
      }
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
      document.getElementById("message").innerHTML = "You lost :( <br> Click Enter to try again!";
      playing = false;
    }

    //if user guess a chosenWord correctly, 
    if (letters.toString() == underScore.toString() && (document.getElementById("guessRemain").textContent >= 0)) {  //if array of letters and array of underScore are the same,
      document.getElementById("wins").textContent++;
      document.getElementById("message").innerHTML = "You win :) Way to go! <br> Click Enter to try again!";
      playing = false;
      changeImage(chosenWord);
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

//change image when user get correct word
function changeImage(chosenWord) {
  if (chosenWord == "leonald") {
    document.querySelector("#image").setAttribute("src", "assets/images/leonard.png");
    document.querySelector("#image").setAttribute("alt", "leonald");
  } else if (chosenWord == "gasol") {
    document.querySelector("#image").setAttribute("src", "assets/images/gasol.png");
    document.querySelector("#image").setAttribute("alt", "gasol");
  } else if (chosenWord == "lowry") {
    document.querySelector("#image").setAttribute("src", "assets/images/lowry.png");
    document.querySelector("#image").setAttribute("alt", "lowry");
  } else if (chosenWord == "green") {
    document.querySelector("#image").setAttribute("src", "assets/images/green.png");
    document.querySelector("#image").setAttribute("alt", "green");
  } else if (chosenWord == "ibaka") {
    document.querySelector("#image").setAttribute("src", "assets/images/ibaka.png");
    document.querySelector("#image").setAttribute("alt", "ibaka");
  } else if (chosenWord == "siakam") {
    document.querySelector("#image").setAttribute("src", "assets/images/siakam.png");
    document.querySelector("#image").setAttribute("alt", "siakam");
  } else if (chosenWord == "vanvleet") {
    document.querySelector("#image").setAttribute("src", "assets/images/vanvleet.png");
    document.querySelector("#image").setAttribute("alt", "vanvleet");
  } else if (chosenWord == "anunoby") {
    document.querySelector("#image").setAttribute("src", "assets/images/anunoby.png");
    document.querySelector("#image").setAttribute("alt", "anunoby");
  } else if (chosenWord == "lin") {
    document.querySelector("#image").setAttribute("src", "assets/images/lin.png");
    document.querySelector("#image").setAttribute("alt", "lin");
  } else if (chosenWord == "powell") {
    document.querySelector("#image").setAttribute("src", "assets/images/powell.png");
    document.querySelector("#image").setAttribute("alt", "powell");
  } else if (chosenWord == "nurse") {
    document.querySelector("#image").setAttribute("src", "assets/images/nurse.png");
    document.querySelector("#image").setAttribute("alt", "nurse");
  }
}

//when the DOM loaded, start the game!
document.addEventListener('DOMContentLoaded', function (){
  initialize();
  console.log("initialized!");
});
