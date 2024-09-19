let currentLocation = 0;
let currentEnergy = 2;
let correctAnswers = 0;
let incorrectAnswers = 0;

let introContainer = document.getElementById('intro-container');
let gameRulesContainer = document.getElementById('game-rules-container');
let rulesButton = document.getElementById('rules-button');
let playButton = document.getElementById('play-button');
let nextCountyButton = document.getElementById('nextCounty-button');
let tryAgainButton = document.getElementById('tryAgain-button');

let AnswerA = document.getElementById('A');
let AnswerB = document.getElementById('B');
let AnswerC = document.getElementById('C');
let AnswerD = document.getElementById('D');

let questionNumber = document.getElementById('question-number');
let hint1 = document.getElementById('hint1');
let hint2 = document.getElementById('hint2');
let hint3 = document.getElementById('hint3');
let audio1 = document.getElementById('hint1-audio');
let audio2 = document.getElementById('hint2-audio');
let audio3 = document.getElementById('hint3-audio');

let image1 = document.getElementById('stop1-image');
let image2 = document.getElementById('stop2-image');
let image3 = document.getElementById('stop3-image');
let image4 = document.getElementById('stop4-image');
let image5 = document.getElementById('stop5-image');

let questionsContainer = document.getElementById('questions-section');
let mainScreenContainer = document.getElementById('main-screen');
let correctAnswerContainer = document.getElementById('correct-answer-container');
let incorrectAnswerContainer = document.getElementById('incorrect-answer-container');
let winContainer = document.getElementById('win-container');

let routeContainer = document.getElementById('route-container');
let energyContainer = document.getElementById('energy-container');
let energyRemaining = document.getElementById('energy-remaining');



const route = ['meath', 'waterford', 'cork', 'kerry', 'donegal']

//Questions for Donegal Path
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
            "He was asking a lot of questions about crystal. Maybe he's planning anohter heist somewhere.",
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
        hints: ["I saw him at the pub last night. He asked if I had ever surfed in Bundoran. I told him I can barely balance standing up, nevermind on a surf board.", 
            "We were having a chat about how much we loved hiking. He mentioned heading to Glenveagh National Park and asked if I knew of any good trails there.",
            "He seems to be an adventurous little guy. Told me he was headed to climb to the top of the highest sea cliffs in Ireland.",
        ],
        choices: ["Sligo", "Donegal", "Mayo", "Leitrim"],
        answer: 2
    },
]


function showRules() {
    introContainer.classList.add('hide');
    gameRulesContainer.classList.remove('hide');
}

function playGame() {
    introContainer.classList.add('hide');
    gameRulesContainer.classList.add('hide');
    questionsContainer.classList.remove('hide');
    energyContainer.classList.remove('hide');
    routeContainer.classList.remove('hide');
    setRouteQuestion();
}


function setRouteQuestion() {
    mainScreenContainer.classList.remove('hide');
    correctAnswerContainer.classList.add('hide');
    incorrectAnswerContainer.classList.add('hide');
    updateRoute();
    if(currentLocation<5){
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

// Code to get event target ID adapted from https://coreui.io/blog/how-to-get-element-id-in-javascript/
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
        alert("No Hint");
    }


}

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
        correctAnswerContainer.classList.remove('hide');
        mainScreenContainer.classList.add('hide');
        ++currentLocation;
        ++currentEnergy;
        ++correctAnswers;
        updateEnergy();
        updateStats();
    } else {
        --currentEnergy;
        ++incorrectAnswers;
        updateEnergy();
        updateStats();
        if (currentEnergy === 0) {
            alert("Game Over");
        } else
            alert("Try Again");
    }

}

function updateStats(){
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('incorrectAnswers').textContent = incorrectAnswers;
}

function updateEnergy(){
    let energyHeight= 180 - (currentEnergy*20);
    console.log(energyHeight);
    energyRemaining.style.height = `${energyHeight}px`;
    console.log(currentEnergy);
}

function updateRoute(){
    console.log(currentLocation);
    if (currentLocation === 1) {
        image1.src = `assets/images/${route[currentLocation-1]}.jpg`;
        console.log(image1.src);
}else if (currentLocation === 2) {
    image2.src = `assets/images/${route[currentLocation-1]}.jpg`;
    console.log(image2.src);
} else if (currentLocation === 3) {
    image3.src = `assets/images/${route[currentLocation-1]}.jpg`;
    console.log(image3.src);
} else if (currentLocation === 4) {
    image4.src = `assets/images/${route[currentLocation-1]}.jpg`;
    console.log(image4.src);
} else if (currentLocation === 5) {
    image5.src = `assets/images/${route[currentLocation-1]}.jpg`;
    console.log(image5.src);
} else{
    console.log('error');
}
}


function decrementEnergy() {
    --energy;
}


rulesButton.addEventListener('click', showRules);
playButton.addEventListener('click', playGame);
nextCountyButton.addEventListener ('click', setRouteQuestion);

AnswerA.addEventListener('click', checkAnswer);
AnswerB.addEventListener('click', checkAnswer);
AnswerC.addEventListener('click', checkAnswer);
AnswerD.addEventListener('click', checkAnswer);

hint1.addEventListener('click', playHint);
hint2.addEventListener('click', playHint);
hint3.addEventListener('click', playHint);

