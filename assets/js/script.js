let currentLocation = 0;
let energy = 3;

let introContainer = document.getElementById('intro-container');
let gameRulesContainer = document.getElementById('game-rules-container');
let rulesButton = document.getElementById('rules-button');
let playButton = document.getElementById('play-button');

let destinationAnswerA = document.getElementById('destination-A');
let destinationAnswerB = document.getElementById('destination-B');
let destinationAnswerC = document.getElementById('destination-C');
let destinationAnswerD = document.getElementById('destination-D');

let AnswerA = document.getElementById('A');
let AnswerB = document.getElementById('B');
let AnswerC = document.getElementById('C');
let AnswerD = document.getElementById('D');

let hint1 = document.getElementById('hint1');
let hint2 = document.getElementById('hint2');
let hint3 = document.getElementById('hint3');
let audio1 = document.getElementById('hint1-audio');
let audio2 = document.getElementById('hint2-audio');
let audio3 = document.getElementById('hint3-audio');


let destinationContainer = document.getElementById('destination-section');
let questionsContainer = document.getElementById('questions-section');
let mainScreenContainer = document.getElementById('main-screen')
let winContainer = document.getElementById('win-container');

let routeContainer = document.getElementById('route-container');
let energyContainer = document.getElementById('energy-container');


const route = ['meath', 'waterford', 'cork', 'kerry', 'donegal']
const destinationQuestions = [{
        question: "I can’t wait to see what we can do with that pot of gold when you get here. I’ve crafted us a wee cottage in Glenveagh National Park. On your way don’t forget to stop for some spuds. They’re on sale at the Aldi in Ballybofey.",
        choices: ["Mayo", "Donegal", "Kerry", "Waterford"],
        answer: 2
    },

    {
        question: "I’ve found a quiet wee spot for us in what’s left of one of the old servant cottages at Moore Hall. Perhaps when you arrive with all that gold we can holiday in Achill for a spell.    ",
        choices: ["Mayo", "Donegal", "Kerry", "Waterford"],
        answer: 1
    },

    {
        question: "I’ll meet you on the island where Betelgeuse exploded in 1979 claiming the lives of 51 souls. After that maybe we can scoot on over to Inchydoney for a dip in the sea.",
        choices: ["Wexford", "Galway", "Donegal", "Cork"],
        answer: 4
    },

    {
        question: "I’ve been around the “ring” a time or two already but have decided to settle down in a small farming town near the Shannon. Hurry up and get here soon. The Rose festival is about to begin.",
        choices: ["Cavan", "Tipperarry", "Kerry", "Kildare"],
        answer: 3
    },
]

//Questions for Donegal Path
const Questions = [{
        question: "In what famous Meath castle were scenes from the movie Braveheart filmed?",
        choices: ["Slane", "Trim", "Dunsany", "Fennor"],
        answer: 2
    },

    {
        question: `Louth is nicknamed the "wee" county because it is the smallest county in Ireland. How many square kilometers does County Louth cover? `,
        choices: ["821", "521", "1284", "992"],
        answer: 1
    },

    {
        question: "What river flows through Monaghan town?",
        choices: ["Dromore River", "Shannon River", "Liffey River", "Blackwater River"],
        answer: 4
    },

    {
        question: "What is the rock composed of in the famous County Fermanagh Marble Arch Caves?",
        choices: ["Granite", "Marble", "Limestone", "Sandstone"],
        answer: 3
    },
]


function showRules() {
    introContainer.classList.add('hide');
    gameRulesContainer.classList.remove('hide');
}

function playGame() {
    introContainer.classList.add('hide');
    gameRulesContainer.classList.add('hide');
    destinationContainer.classList.remove('hide');
    setDestinationQuestion();
}

function setDestinationQuestion() {
    document.getElementById('destination-question1').textContent = destinationQuestions[0].question;
    document.getElementById('destination-A').textContent = destinationQuestions[0].choices[0];
    document.getElementById('destination-B').textContent = destinationQuestions[0].choices[1];
    document.getElementById('destination-C').textContent = destinationQuestions[0].choices[2];
    document.getElementById('destination-D').textContent = destinationQuestions[0].choices[3];

}

function setRouteQuestion() {
    document.getElementById('question1').textContent = Questions[currentLocation].question;
    document.getElementById('A').textContent = Questions[currentLocation].choices[0];
    document.getElementById('B').textContent = Questions[currentLocation].choices[1];
    document.getElementById('C').textContent = Questions[currentLocation].choices[2];
    document.getElementById('D').textContent = Questions[currentLocation].choices[3];

}

function selectRoute(a) {
    destinationContainer.classList.add('hide');
    mainScreenContainer.classList.remove('hide');
    routeContainer.classList.remove('hide');
    setRouteQuestion();
}

// Code to get event target ID adapted from https://coreui.io/blog/how-to-get-element-id-in-javascript/
function playHint(event) {
    console.log(event.target.id);
    if (event.target.id === 'hint1-image') {
        audio1.src = `assets/audio/${route[currentLocation]}-hint1.mp3`;
        console.log(audio1.src);
        audio1.play();
    } else if (event.target.id === 'hint2-image') {
        audio2.src = `assets/audio/${route[currentLocation]}-hint2.mp3`;
        console.log(audio2.src);
        audio2.play();
    } else if (event.target.id === 'hint3-image') {
        audio3.src = `assets/audio/${route[currentLocation]}-hint3.mp3`;
        console.log(audio3.src);
        audio2.play();
    } else {
        alert("No Hint");
    }


}

// Code to get event target ID adapted from https://coreui.io/blog/how-to-get-element-id-in-javascript/
function checkDestinationAnswer(event) {
    let a = destinationQuestions[0].answer;
    let b;
    if (event.target.id === "destination-A") {
        b = 1;
    } else if (event.target.id === "destination-B") {
        b = 2;
    } else if (event.target.id === "destination-C") {
        b = 3;
    } else if (event.target.id === "destination-D") {
        b = 4;
    } else {
        alert("Error No Answer Chosen");
    }

    if (a === b) {
        alert("You Got It!");
        selectRoute(a);
    } else {
        alert("Try Again")
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
        alert("You Got It!");
        ++currentLocation;
        if (currentLocation < 4) {
            setRouteQuestion();
        } else {
            questionsContainer.classList.add('hide');
            winContainer.classList.remove('hide');
        }
    } else {
        decrementEnergy();
        if (energy === 0) {
            alert("Game Over");
        } else
            alert("Try Again");
    }

}

function decrementEnergy() {
    --energy;
}


rulesButton.addEventListener('click', showRules);
playButton.addEventListener('click', playGame);
destinationAnswerA.addEventListener('click', checkDestinationAnswer);
destinationAnswerB.addEventListener('click', checkDestinationAnswer);
destinationAnswerC.addEventListener('click', checkDestinationAnswer);
destinationAnswerD.addEventListener('click', checkDestinationAnswer);

AnswerA.addEventListener('click', checkAnswer);
AnswerB.addEventListener('click', checkAnswer);
AnswerC.addEventListener('click', checkAnswer);
AnswerD.addEventListener('click', checkAnswer);

hint1.addEventListener('click', playHint);
hint2.addEventListener('click', playHint);
hint3.addEventListener('click', playHint);