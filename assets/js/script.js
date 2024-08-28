let introContainer = document.getElementById('intro-container');
let gameRulesContainer = document.getElementById('game-rules-container');
let rulesButton = document.getElementById('rules-button');


function showRules(){
    introContainer.classList.add('hide');
    gameRulesContainer.classList.remove('hide');
}

rulesButton.addEventListener('click', showRules);