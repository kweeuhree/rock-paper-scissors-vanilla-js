let gameStarted = false;
let roundCount = 0;
let userScore = 0;
let computerScore = 0;

// populate game start button
const populateStartBtn = () => {
    let startBtn = document.createElement("div");
    startBtn.setAttribute("class", "sBtn");
    startBtn.innerHTML = "Start Game";
    document.body.append(startBtn);
    startBtn.addEventListener("click", clickStartButton);
  };

function clickStartButton() {
    const startBtn = document.querySelector(".sBtn");
    const displayGameResult = document.querySelector('.game-result');
     
    displayGameResult.innerHTML = '';
    startBtn.remove();

    gameStarted = true;
    populateChoiceBox();
}

    //populate choice box
function populateChoiceBox() {
    //define choice box
    let choicer = document.createElement("div");
    choicer.setAttribute("class", "choicerBtn");

    //define and attach small rock icon
    let smRock = document.createElement("img");
    smRock.setAttribute("class", "icon");
    smRock.setAttribute('id', 'rock');
    smRock.setAttribute("src", choices.rock.image);

    //define and attach small paper icon
    let smPaper = document.createElement("img");
    smPaper.setAttribute("class", "icon");
    smPaper.setAttribute('id', 'paper');
    smPaper.setAttribute("src", choices.paper.image);

    //define and attach small scissors icon
    let smSza = document.createElement("img");
    smSza.setAttribute("class", "icon");
    smSza.setAttribute('id', 'scissors');
    smSza.setAttribute("src", choices.sza.image);

    //append all icons to choicer
    choicer.append(smRock);
    choicer.append(smPaper);
    choicer.append(smSza);

    //append choicer
    document.body.append(choicer);

        // listen to a user click
    const userChoices = document.getElementsByClassName('icon');

    for (let userChoice of userChoices) {
        userChoice.onclick = function() {
            startRound(this.id);
        };
  }
}

// create and define choices for choice box
let choices = {
    rock: {
      name: "Rock",
      image:
        "https://static.vecteezy.com/system/resources/previews/023/289/772/original/a-lifelike-rock-formation-inspired-by-nature-set-against-a-transparent-background-generative-ai-png.png",
    },
    paper: {
      name: "Paper",
      image:
        "https://static.vecteezy.com/system/resources/previews/009/340/337/original/white-crumpled-paper-balls-for-design-element-png.png",
    },
    sza: {
      name: "Scissors",
      image:
        "https://www.pngall.com/wp-content/uploads/2016/03/Scissor-High-Quality-PNG.png",
    },
  };


// define and declare startRound that takes icon id as an argument, the function should 
// display user choice as a larger icon, display computer choice as a larger icon
// call game result
function startRound(choiceId) {
    //accept and console log user choice
    let userChoice = document.getElementById(`${choiceId}`);
    userChoice = userChoice.id;
    const computerChoice = getComputerChoice();
    
    //display larger user choice icon
    displayUserChoice(userChoice);

    //display larger user computer icon
    displayComputerChoice(computerChoice);

    //increment round
    incrementRound();

    determineWinner(userChoice, computerChoice);
}

//generate computer choice 
const getComputerChoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomNumber];
    return computerChoice;
  }

 //define and declare a function that will display a larger user choice icon
 function displayUserChoice(userChoice) {
    // Get the userSpace element
    const userSpace = document.querySelector('.oneSpace');

    // Check if an img element already exists in userSpace
    removeExistingImage(userSpace);

    // Create a new img element
    imgElement = document.createElement('img');
    
    
    // Set the src attribute based on the userChoice id
    switch (userChoice) {
        case 'rock':
            imgElement.src = choices.rock.image;
            break;
        case 'paper':
            imgElement.src = choices.paper.image;
            break;
        case 'scissors':
            imgElement.src = choices.sza.image;
            break;
        default:
            // Handle other cases if needed
            break;
    }
    
    // Append the img element to the userSpace
    userSpace.appendChild(imgElement);
}

//define and declare a function that will display a larger user choice icon
function displayComputerChoice(computerChoice) {
    // Get the userSpace element
    const computerSpace = document.querySelector('.twoSpace');

    removeExistingImage(computerSpace);
    
    // Create an img element
    const imgElement = document.createElement('img');
    
    // Set the src attribute based on the userChoice id
    switch (computerChoice) {
        case 'rock':
            imgElement.src = choices.rock.image;
            break;
        case 'paper':
            imgElement.src = choices.paper.image;
            break;
        case 'scissors':
            imgElement.src = choices.sza.image;
            break;
        default:
            // Handle other cases if needed
            break;
    }
    
    // Append the img element to the userSpace
    computerSpace.appendChild(imgElement);
}  

function removeExistingImage(spaceElement) {
    const imgElement = spaceElement.querySelector('img');
    if (imgElement) {
        // If an img element exists, remove it
        imgElement.remove();
    }
}

//define and declare incrementRound function, it should increment round, display it 
// in the browser and console
function incrementRound() {
    let count = document.querySelector('.rndNum');

    ++roundCount;
    count.innerHTML = roundCount;

    console.log(`Current round count is: ${roundCount}`);
}

// define and declare determineWinner function that takes userChoice and ComputerChoice as arguments
// the function should compare choices and display who won
// it should call adjust scores function that will adjust scores accordingly

function determineWinner(userChoice, computerChoice) {
    const displayGameResult = document.querySelector('.game-result');
    let result;
  
    if (userChoice === computerChoice) {
      result = 'Game is a tie.';
    } else if (
      (userChoice === 'rock' && computerChoice === 'scissors') 
      || (userChoice === 'paper' && computerChoice === 'rock')
      || (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
      result = 'User won!'
    } else {
      result = 'Computer won.'
    }
  
    displayGameResult.innerHTML = result;
    console.log(`Player: ${userChoice}   Computer: ${computerChoice}\n\n${result}`);
    setScore(result);
}

//declare and define a function that takes result of a game as an argument 
// based on result, adjust scores
function setScore(result) {

    const userSpace = document.querySelector('.oneSpace');
    const computerSpace = document.querySelector('.twoSpace');

    if(result.includes('tie')) {
        userSpace.style.border = 'solid yellow';
        computerSpace.style.border = 'solid yellow';
        adjustScore('tie');
    } else if (result.includes('Computer won.')) {
        computerSpace.style.border = 'solid red';
        adjustScore('computer');
    } else if(result.includes('User won!')) {
        userSpace.style.border = 'solid purple';
        adjustScore('user');
    }

    setTimeout(() => {
        userSpace.style.border = 'solid white';
        computerSpace.style.border = 'solid white';
    }, 520);
}

function adjustScore(winner) {

    const displayUserScore = document.querySelector('.pt1');
    const displayComputerScore = document.querySelector('.pt2');

    if(winner === 'user') {
        userScore += 10;
    } else if(winner === 'computer') {
        computerScore+= 10;
    }

    displayUserScore.innerHTML = userScore;
    displayComputerScore.innerHTML = computerScore;

    if (displayUserScore.innerHTML >= 30) {
        gameOver('User');
    } else if(displayComputerScore.innerHTML >= 30) {
        gameOver('Computer')
    }
}

function gameOver(winner) {
    const displayGameResult = document.querySelector('.game-result');
    let gameResultString = `Game over<br>${winner} won<br>Total rounds: ${roundCount}`;
    
    displayGameResult.innerHTML = gameResultString;

    gameStarted = false;
    resetGame();

    //console log game result
    console.log('Game over');
    console.log(`${winner} won`);
    console.log(`Total rounds: ${roundCount}`);
}

function resetGame() {
    const displayUserScore = document.querySelector('.pt1');
    const displayComputerScore = document.querySelector('.pt2');
    let choicer = document.querySelector(".choicerBtn");

    roundCount = 0;
    computerScore = 0;
    userScore = 0;
    displayUserScore.innerHTML = 0;
    displayComputerScore.innerHTML = 0;

    choicer.remove();
    populateStartBtn(); 
}

// StartGame
if (gameStarted) {
    populateChoiceBox();
} else {
    populateStartBtn();
}



