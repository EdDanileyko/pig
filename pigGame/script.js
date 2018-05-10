var scores, roundScore, activePlayer, isActive;


reset();


// Starts a new game. Clears all values
function reset() {
    "use strict";
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    isActive = true;
    
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// Changes active player
function turnover() {
    "use strict";
    // Switch the active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
    // Reset the round score
    roundScore = 0;
    document.getElementById('current-0').textContent = roundScore;
    document.getElementById('current-1').textContent = roundScore;
    
    // Toggles active class from active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
}

document.querySelector('.btn-roll').addEventListener('click', function () {
    "use strict";
    if (isActive) {
        // 1. Get random dice value
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display dice
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Game logic
        if (dice !== 1) {
            // Add score
            roundScore += dice;
        } else {
            // Next player
            turnover();
        }
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    "use strict";
    if (isActive) {
        // 1. Update the player's global score
        scores[activePlayer] += roundScore;

        // 2. Update the UI with the global score
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // 3. Check if the game has been won or is there a turnover
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            isActive = false;
        } else {
            turnover();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', reset);