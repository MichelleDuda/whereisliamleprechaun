let introContainer = document.getElementById('intro-container');
let gameRulesContainer = document.getElementById('game-rules-container');
let rulesButton = document.getElementById('rules-button');
let playButton = document.getElementById('play-button');

let destinationAnswerA = document.getElementById('destination-A');
let destinationAnswerB = document.getElementById('destination-B');
let destinationAnswerC = document.getElementById('destination-C');
let destinationAnswerD = document.getElementById('destination-D');


let destinationContainer = document.getElementById('destination-section');

let routeContainer = document.getElementById('route-container');

const destinationQuestions = [
    {
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



function showRules(){
    introContainer.classList.add('hide');
    gameRulesContainer.classList.remove('hide');
}

function playGame(){
    introContainer.classList.add('hide');
    gameRulesContainer.classList.add('hide');
    destinationContainer.classList.remove('hide');
    setDestinationQuestion();
}

function setDestinationQuestion(){
    document.getElementById('destination-question1').textContent = destinationQuestions[0].question;
    document.getElementById('destination-A').textContent=destinationQuestions[0].choices[0];
    document.getElementById('destination-B').textContent=destinationQuestions[0].choices[1];
    document.getElementById('destination-C').textContent=destinationQuestions[0].choices[2];
    document.getElementById('destination-D').textContent=destinationQuestions[0].choices[3];

}

function selectRoute(a){
    routeContainer.classList.remove('hide');        
    }

// Code to get event target ID adapted from https://coreui.io/blog/how-to-get-element-id-in-javascript/
function checkDestinationAnswer(event){
    let a = destinationQuestions[0].answer;
    let b;
    if (event.target.id === "destination-A"){
        b = 1;
    } else if (event.target.id === "destination-B"){
         b = 2;
    } else if (event.target.id === "destination-C"){
        b = 3;
    }else if (event.target.id === "destination-D"){
        b = 4;
    }
    else {
        alert("Error No Answer Chosen");
    }  

    if (a === b){
        alert("You Got It!");
        selectRoute(a);
    } else {
        alert("Try Again")
    }

}


rulesButton.addEventListener('click', showRules);
playButton.addEventListener('click', playGame);
destinationAnswerA.addEventListener('click', checkDestinationAnswer);
destinationAnswerB.addEventListener('click', checkDestinationAnswer);
destinationAnswerC.addEventListener('click', checkDestinationAnswer);
destinationAnswerD.addEventListener('click', checkDestinationAnswer);
