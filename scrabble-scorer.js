// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
};

let simpleScorer = function (word) {
   word = word.toUpperCase();
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    // Each letter is worth 1 point
    score += 1;
  }

  return score;
};

let vowelBonusScorer = function (word) {
   word = word.toUpperCase();
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    if ('AEIOU'.includes(letter)) {
      // Vowels are worth 3 points
      score += 3;
    } else {
      // Consonants are worth 1 point
      score += 1;
    }
  }

  return score;
};

let scrabbleScorer = function (word) {
  word = word.toLowerCase(); // Convert word to lowercase to avoid unnecessary errors
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    if (newPointStructure.hasOwnProperty(letter)) {
      score += newPointStructure[letter];
    }
  }

  return score;
};

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point",
    scorerFunction: simpleScorer, //REPLACE VS TEXTBOOK
  },
  {
    name: "Vowel Bonus Score",
    description: "Vowels are 3 pts, consonants are 1 pt",
    scorerFunction: vowelBonusScorer, //REPLACE VS TEXTBOOK
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer, //REPLACE VS TEXTBOOK
  },
];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?");
  console.log("0 - Simple Score: Each letter is worth 1 point");
  console.log("1 - Vowel Bonus Score: Each vowel is worth 3 points, and consonants are worth 1 point");
  console.log("2 - Scrabble Score: Use the traditional Scrabble scoring");

  const userInput = input.question("Enter the number of the scoring algorithm you want to use: ");
  const selectedAlgorithmIndex = parseInt(userInput);

  if (selectedAlgorithmIndex >= 0 && selectedAlgorithmIndex < scoringAlgorithms.length) {
    return scoringAlgorithms[selectedAlgorithmIndex];
  } else {
    console.log("Invalid choice. Please enter a valid number (0, 1, or 2).");
    return scorerPrompt(); 
  }
}

function transform(oldPointStructure) {
  const newPointStructure = {};

  for (const pointValue in oldPointStructure) {
    const letters = oldPointStructure[pointValue];
    for (const letter of letters) {
      newPointStructure[letter.toLowerCase()] = parseInt(pointValue);
    }
  }

  return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  initialPrompt();
  const selectedScoringAlgorithm = scorerPrompt();
  const word = input.question("Enter a word: ");
  const score = selectedScoringAlgorithm.scorerFunction(word);
  console.log("Algorithm Name: ", selectedScoringAlgorithm.name);
  console.log("Description: ", selectedScoringAlgorithm.description);
  console.log(`Score for '${word}': ${score}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
