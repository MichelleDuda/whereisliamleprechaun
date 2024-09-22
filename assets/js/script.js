// Variables
let currentLocation = 0;
let currentEnergy = 2;
let correctAnswers = 0;
let incorrectAnswers = 0;

// DOM Element References for Main Containers
let introContainer = document.getElementById('intro-container');
let gameRulesContainer = document.getElementById('game-rules-container');
let mainScreenContainer = document.getElementById('main-screen');
let statsContainer = document.getElementById('stats-container');

// DOM Element References for General Buttons
let rulesButton = document.getElementById('rules-button');
let playButton = document.getElementById('play-button');
let playAgainButton = document.getElementsByClassName('play-again-button');
let nextCountyButton = document.getElementById('nextCounty-button');
let tryAgainButton = document.getElementById('tryAgain-button');

// DOM Element References for Question & Hints Section Containers
let questionsContainer = document.getElementById('questions-section');
let hintContainer = document.getElementById('hints');
let correctAnswerContainer = document.getElementById('correct-answer-container');
let incorrectAnswerContainer = document.getElementById('incorrect-answer-container');
let winContainer = document.getElementById('win-container');
let gameOverContainer = document.getElementById('game-over-container');

// DOM Element References for Question & Hint Display
let questionNumber = document.getElementById('question-number');
let hint1 = document.getElementById('hint1');
let hint2 = document.getElementById('hint2');
let hint3 = document.getElementById('hint3');
let audio1 = document.getElementById('hint1-audio');
let audio2 = document.getElementById('hint2-audio');
let audio3 = document.getElementById('hint3-audio');

// DOM Element References for Answer Choices
let AnswerA = document.getElementById('A');
let AnswerB = document.getElementById('B');
let AnswerC = document.getElementById('C');
let AnswerD = document.getElementById('D');

// DOM Element References for Route Update
let routeContainer = document.getElementById('route-container');
let image1 = document.getElementById('stop1-image');
let image2 = document.getElementById('stop2-image');
let image3 = document.getElementById('stop3-image');
let image4 = document.getElementById('stop4-image');
let image5 = document.getElementById('stop5-image');

// DOM Element References for Energy Meter
let energyContainer = document.getElementById('energy-container');
let energyRemaining = document.getElementById('energy-remaining');



//Array to determine Route
const route = ['meath', 'waterford', 'cork', 'kerry', 'donegal'];

//Array to hold Questions
const Questions = [{
        hints: ["My cousin Danny said he saw him visiting the ancient ruins where the high kings once ruled.",
            "I met him just the other day. I told him I hate history class and he said he loved it. In fact, he was heading out to see some ancient tomb older than the pyramids of Giza.",
            "He was rambling on about a magical stone on a Hill. Thought if he could go there he'd be granted kingship.",
        ],
        choices: ["Roscommon", "Meath", "Wexford", "Carlow"],
        answer: 2
    },

    {
        hints: ["He told me he was headed to Ireland's oldest city to see if any Viking ships were still there.",
            "He was asking a lot of questions about crystal. Maybe he's planning another heist somewhere.",
            "I'm not sure where he went, but he was asking me if I knew where some guy named Reginald lived. He said it was some old tower but I had no idea what he was talking about.",
        ],
        choices: ["Waterford", "Wexford", "Wicklow", "Tipperary"],
        answer: 1
    },

    {
        hints: ["He was rambling on and on and on about kissing a magical stone meant to bestow upon him the gift of the gab. It didn't sound to me like he needed that.",
            "He asked for directions to a famous harbor where the Titanic had set sail.",
            "He asked if I wanted to come with him. He was headed for a walk over a bridge where the cliffs meet the sea in a dramatic clash at the most south-westerly point in the country. I told him no; I'm afraid of heights. ",
        ],
        choices: ["Mayo", "Kerry", "Sligo", "Cork"],
        answer: 4
    },

    {
        hints: ["He mentioned trying to slip away into the natural wonders of the forest and maybe take a horse-drawn carriage ride to the 1840s home of Henry Arthur Herbert.",
            "I heard him talking about heading out to see the ring. Perhaps there's a lucky soon to be Mrs. Leprechaun.",
            "He told me he was headed out to see King Puck before he ventured on to the Slea Head Drive.",
        ],
        choices: ["Galway", "Donegal", "Kerry", "Leitrim"],
        answer: 3
    },

    {
        hints: ["I saw him at the pub last night. He asked if I had ever surfed in Bundoran. I told him I can barely balance standing up, nevermind on a surfboard.",
            "We were having a chat about how much we loved hiking. He mentioned heading to Glenveagh National Park and asked if I knew of any good trails there.",
            "He seems to be an adventurous little guy. Told me he was headed to climb to the top of the highest sea cliffs in Ireland.",
        ],
        choices: ["Sligo", "Donegal", "Mayo", "Leitrim"],
        answer: 2
    },
];

/**
 * Displays game rules by hiding introduction container and displaying game rules container
 * 
 * This function adds the 'hide' class to the introContainer to make it not display
 * and removes the 'hide' class from the gameRulesContainter to display it. 
 */
function showRules() {
    introContainer.classList.add('hide');
    gameRulesContainer.classList.remove('hide');
}

/** 
 * Resets the game to initial state to allow for new session.
 * 
 * Restores variables (currentLocation, currentEnergy, correctAnswers, incorrectAnswers) to default values
 * by utilizing updateEnergy, updateStats, and updateRoute functions.
 * 
 * Hides the Win or Lose Container from previous game by adding 'hide' class to those elements. 
 * 
 * Starts game without displaying rules again by calling playGame function.
*/
function resetGame() {
    currentLocation = 0;
    currentEnergy = 2;
    correctAnswers = 0;
    incorrectAnswers = 0;
    updateEnergy();
    updateStats();
    updateRoute();
    winContainer.classList.add('hide');
    gameOverContainer.classList.add('hide');
    playGame();
}


/** 
 * Starts game by hiding the intro and rules containers and displaying the main game elements
 * 
 * This function calls the setRouteQuestion function to display the first question.
 */
function playGame() {
    introContainer.classList.add('hide');
    gameRulesContainer.classList.add('hide');
    questionsContainer.classList.remove('hide');
    energyContainer.classList.remove('hide');
    routeContainer.classList.remove('hide');
    setRouteQuestion();
}

/**
 * 
 * Displays the current game question based on the players progress and energy level
 * 
 * This function displays the main screen, question, and hint containers by removing the 'hide' class
 * If a correct or incorrect answer screen was displayed from a previous question it hides them by adding the 'hide' class to those containers.
 * 
 * If currentEnergy is <1 an alert is displayed indicating the game is over.
 * If currentLocation reaches 5, an alert is displayed indicating that the player has won the game.
 *  * If currentEnergy is 1 or more, and currentLocation is less than 5, the next question and choices are displayed
 */
function setRouteQuestion() {
    mainScreenContainer.classList.remove('hide');
    questionsContainer.classList.remove('hide');
    energyContainer.classList.remove('hide');
    statsContainer.classList.remove('hide');
    hintContainer.classList.remove('hide');
    questionNumber.classList.remove('hide');
    correctAnswerContainer.classList.add('hide');
    incorrectAnswerContainer.classList.add('hide');
    if (currentEnergy < 1) {
        gameOverContainer.classList.remove('hide');
    } else if (currentLocation < 5) {
        document.getElementById('question-number').innerText = `Question ${currentLocation + 1}`;
        document.getElementById('hint-text').textContent = "";
        document.getElementById('A').textContent = Questions[currentLocation].choices[0];
        document.getElementById('B').textContent = Questions[currentLocation].choices[1];
        document.getElementById('C').textContent = Questions[currentLocation].choices[2];
        document.getElementById('D').textContent = Questions[currentLocation].choices[3];
    } else {
        questionsContainer.classList.add('hide');
        winContainer.classList.remove('hide');
    }
}
/**
 * 
 * Plays an audio hint and updates the hint text displayed based on which witness image the player clicks.
 * 
 * @param {Event} event - The event object triggered by the user's click which determines which hint to play/display. 
 * 
 * This function determines if the event.target.id is hint1-image, hint2-image, or hint3-image and retrieves the corresponding hint data. 
 */
// Code to get event target ID adapted from https://coreui.io/blog/how-to-get-element-id-in-javascript/
// Code to update audio source was adapted from https://stackoverflow.com/questions/10792163/change-audio-src-with-javascript
function playHint(event) {
    console.log(event.target.id);
    if (event.target.id === 'hint1-image') {
        document.getElementById('hint-text').textContent = Questions[currentLocation].hints[0];
        audio1.src = `assets/audio/${route[currentLocation]}-hint1.mp3`;
        console.log(audio1.src);
        audio1.play();
    } else if (event.target.id === 'hint2-image') {
        document.getElementById('hint-text').textContent = Questions[currentLocation].hints[1];
        audio2.src = `assets/audio/${route[currentLocation]}-hint2.mp3`;
        console.log(audio2.src);
        audio2.play();
    } else if (event.target.id === 'hint3-image') {
        document.getElementById('hint-text').textContent = Questions[currentLocation].hints[2];
        audio3.src = `assets/audio/${route[currentLocation]}-hint3.mp3`;
        console.log(audio3.src);
        audio3.play();
    } else {
       console.log('error playing hint');
    }
}

/**
 * 
 * Checks the players answer selection against the correct answer for the current question and updates game accordingly. 
 * 
 * @param {Event} event - The event object triggered by the user's answer choice.
 * 
 * This function determins if the target.event.id is answer choice A, B, C, or D. 
 * It then compares that choice (variable b) to the correct answer from the questions array (variable a).
 * 
 * If the answer is correct:
 * -Increment currentLocation, currentEnergy, and correctAnswers
 * -Update route, engery container, and stats container.
 * -Displays a correct answer message if the currentLocation is less than 5.
 * -Displays a Game Win screen if the currentLocation is now 5. 
 * 
 * If the answer is incorrect:
 * -Decrements currentEnergy and incrememnts incorrectAnswers.
 * -Updates energy and stats containers.
 * -Displays incorrect answer message if currentEnergy is greater than 0.
 * -Displays Game Over alert if currentEnergy is 0.
 * 
 */
function checkAnswer(event) {
    let a = Questions[currentLocation].answer;
    let b;
    if (event.target.id === "A") {
        b = 1;
    } else if (event.target.id === "B") {
        b = 2;
    } else if (event.target.id === "C") {
        b = 3;
    } else if (event.target.id === "D") {
        b = 4;
    } else {
        alert("Error No Answer Chosen");
    }

    if (a === b) {
        ++currentLocation;
        ++currentEnergy;
        ++correctAnswers;
        updateRoute();
        updateEnergy();
        updateStats();
        if (currentLocation < 5) {
            correctAnswerContainer.classList.remove('hide');
            questionsContainer.classList.add('hide');
            energyContainer.classList.add('hide');
            statsContainer.classList.add('hide');
        } else {
            winContainer.classList.remove('hide');
            mainScreenContainer.classList.add('hide');
        }

    } else {
        questionsContainer.classList.add('hide');
        energyContainer.classList.add('hide');
        statsContainer.classList.add('hide');
        --currentEnergy;
        ++incorrectAnswers;
        updateEnergy();
        updateStats();
        if (currentEnergy > 0) {
            incorrectAnswerContainer.classList.remove('hide');
        } else {
            gameOverContainer.classList.remove('hide');
            mainScreenContainer.classList.add('hide');
        }
    }

}

/**
 * Updates the game statistics container with the current correct and incorrect answer count.
 * 
 */
function updateStats() {
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('incorrectAnswers').textContent = incorrectAnswers;
}

/**
 * Updates the fuel container based on currentEnergy.
 * 
 * The function calculates the height of the energy bar based on the container size and the currentEnergy count. 
 * It also updates the energy-count number displayed below the gauge. 
 */
function updateEnergy() {
    let energyHeight = 210 - (currentEnergy * 30);
    energyRemaining.style.height = `${energyHeight}px`;
    document.getElementById('energy-count').innerText=currentEnergy;
}

/**
 * 
 * Updates the image source to display flag for the current location based on players progress on route.
 * 
 * The function allows for the dynamic update of flags along the route as the player progresses.
 * It achieves this by checking the value of 'currentLocaiton' and then updating the corresponding image source to the appropriate resource.
 */
function updateRoute() {
    console.log(currentLocation);
     if (currentLocation === 0){
        image1.src = `assets/images/mysteryflag.jpg`;
        image2.src = `assets/images/mysteryflag.jpg`;
        image3.src = `assets/images/mysteryflag.jpg`;
        image4.src = `assets/images/mysteryflag.jpg`;
        image5.src = `assets/images/mysteryflag.jpg`;
        image1.alt = `mystery flag`;
        image2.alt = `mystery flag`;
        image3.alt = `mystery flag`;
        image4.alt = `mystery flag`;
        image5.alt = `mystery flag`;
     }else if (currentLocation === 1) {
        image1.src = `assets/images/${route[currentLocation-1]}.jpg`;
        image1.alt=`${route[currentLocation-1]} flag`;        
    } else if (currentLocation === 2) {
        image2.src = `assets/images/${route[currentLocation-1]}.jpg`;
        image2.alt=`${route[currentLocation-1]} flag`;       
    } else if (currentLocation === 3) {
        image3.src = `assets/images/${route[currentLocation-1]}.jpg`;
        image3.alt=`${route[currentLocation-1]} flag`; 
    } else if (currentLocation === 4) {
        image4.src = `assets/images/${route[currentLocation-1]}.jpg`;
        image4.alt=`${route[currentLocation-1]} flag`; 
    } else if (currentLocation === 5) {
        image5.src = `assets/images/${route[currentLocation-1]}.jpg`;
        image5.alt=`${route[currentLocation-1]} flag`; 
    } else {
        console.log('error updating route flags');
    }
}

//Event Listeners

//Event Listeners for General Buttons
rulesButton.addEventListener('click', showRules);
playButton.addEventListener('click', playGame);
nextCountyButton.addEventListener('click', setRouteQuestion);
tryAgainButton.addEventListener('click', setRouteQuestion);

//Code for Class Name Event listener adapted from: https://stackoverflow.com/questions/19655189/javascript-click-event-listener-on-class
for (let i = 0; i < playAgainButton.length; i++) {
    playAgainButton[i].addEventListener('click', resetGame, false);
}


//Event Listeners for Answer Buttons
AnswerA.addEventListener('click', checkAnswer);
AnswerB.addEventListener('click', checkAnswer);
AnswerC.addEventListener('click', checkAnswer);
AnswerD.addEventListener('click', checkAnswer);

//Event Listeners to Play Hints When Witness is Selected
hint1.addEventListener('click', playHint);
hint2.addEventListener('click', playHint);
hint3.addEventListener('click', playHint);