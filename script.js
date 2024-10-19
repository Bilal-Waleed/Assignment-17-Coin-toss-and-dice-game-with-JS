var currentPlayer = "";
var tossWinner = "";
var player1Name = "";
var player2Name = "";

function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function getPlayerChoice() {
    return prompt(player1Name + ", enter 'Head' or 'Tail'").trim().toLowerCase();
}

function isValidChoice(choice) {
    return ['head', 'tail'].includes(choice);
}
function performToss() {
    var randomValue = Math.random();
    return randomValue < 0.5 ? 'Head' : 'Tail';
}

function displayTossResult(result) {
    document.getElementById('tossResult').innerText = 'Toss Result: ' + result;
}
function displayTurnInfo() {
    document.getElementById('turnInfo').innerText = currentPlayer + "'s Turn";
}

function showDiceSection() {
    document.getElementById('diceContainer').style.display = 'block';
}

function displayMessage(message) {
    document.getElementById('tossResult').innerText = message;
}

function startGame() {
    if (!player1Name || !player2Name) {
        player1Name = prompt("Enter Player 1's Name:");
        player2Name = prompt("Enter Player 2's Name:");

        if (!player1Name || !player2Name) {
            alert("Both players must enter their names!");
            return;
        }

        player1Name = capitalizeFirstLetter(player1Name);
        player2Name = capitalizeFirstLetter(player2Name);

        document.getElementById('player1NameDisplay').innerText = player1Name;
        document.getElementById('player2NameDisplay').innerText = player2Name;
        document.getElementById('player1NameButton').innerText = player1Name;
        document.getElementById('player2NameButton').innerText = player2Name;
    }

    var player1Choice = getPlayerChoice();
    while (!isValidChoice(player1Choice)) {
        displayMessage('Please enter "Head" or "Tail" correctly.');
        player1Choice = getPlayerChoice();
    }

    var tossResult = performToss();
    displayTossResult(tossResult);

    tossWinner = (player1Choice === tossResult) ? player1Name : player2Name;
    currentPlayer = tossWinner;

    document.getElementById('tossWinnerDisplay').innerText = "Toss Winner: " + tossWinner;

    displayTurnInfo();
    showDiceSection();

    document.getElementById('tossBtn').disabled = true;

    if (tossWinner === player1Name) {
        document.getElementById('rollDiceBtnPlayer2').disabled = true;
    } else {
        document.getElementById('rollDiceBtnPlayer1').disabled = true;
    }
}

function rollSingleDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function displayDiceResults(player, dice1, dice2) {
    if (player === player1Name) {
        document.getElementById('player1Dice1').innerText = dice1;
        document.getElementById('player1Dice2').innerText = dice2;
    } else {
        document.getElementById('player2Dice1').innerText = dice1;
        document.getElementById('player2Dice2').innerText = dice2;
    }
}

function checkForWin(dice1, dice2) {
    return dice1 === 6 && dice2 === 6; 
}

function endGame(player) {
    document.getElementById('gameStatus').innerText = player + " wins! Both dice rolled 6!";
    document.getElementById('rollDiceBtnPlayer1').disabled = true;
    document.getElementById('rollDiceBtnPlayer2').disabled = true;
    // document.getElementById('tossBtn').disabled = false;
}

function switchPlayer() {
    if (currentPlayer === player1Name) {
        currentPlayer = player2Name;
        document.getElementById('rollDiceBtnPlayer1').disabled = true;
        document.getElementById('rollDiceBtnPlayer2').disabled = false;
    } else {
        currentPlayer = player1Name;
        document.getElementById('rollDiceBtnPlayer1').disabled = false;
        document.getElementById('rollDiceBtnPlayer2').disabled = true;
    }
    displayTurnInfo(); 
}

function rollDice(player) {
    if (player !== currentPlayer) {
        return; 
    }
    var dice1 = rollSingleDice();
    var dice2 = rollSingleDice();
    displayDiceResults(player, dice1, dice2);

    if (checkForWin(dice1, dice2)) {
        endGame(player);
    } else {
        switchPlayer();
    }
}

document.getElementById('tossBtn').addEventListener('click', startGame);
document.getElementById('rollDiceBtnPlayer1').addEventListener('click', function() {
    rollDice(player1Name);
});
document.getElementById('rollDiceBtnPlayer2').addEventListener('click', function() {
    rollDice(player2Name);
});
