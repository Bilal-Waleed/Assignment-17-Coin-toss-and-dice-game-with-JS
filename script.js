var currentPlayer = "";
var tossWinner = "";
var player1Name = "";
var player2Name = "";

function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function startGame() {
    // Prompt players for their names only once
    if (!player1Name || !player2Name) {
        player1Name = prompt("Enter Player 1's Name:");
        player2Name = prompt("Enter Player 2's Name:");

        if (!player1Name || !player2Name) {
            alert("Both players must enter their names!");
            return;
        }

        // Capitalize the first letter of both names
        player1Name = capitalizeFirstLetter(player1Name);
        player2Name = capitalizeFirstLetter(player2Name);

        // Update player names in the UI
        document.getElementById('player1NameDisplay').innerText = player1Name;
        document.getElementById('player2NameDisplay').innerText = player2Name;
        document.getElementById('player1NameButton').innerText = player1Name;
        document.getElementById('player2NameButton').innerText = player2Name;
    }

    // Keep asking Player 1 for their toss choice until it's valid
    let player1Choice = getPlayerChoice();
    while (!isValidChoice(player1Choice)) {
        displayMessage('Please enter "Head" or "Tail" correctly.');
        player1Choice = getPlayerChoice(); // Keep asking until it's valid
    }

    // Perform the toss
    var tossResult = performToss();
    displayTossResult(tossResult);

    tossWinner = (player1Choice === tossResult) ? player1Name : player2Name;
    currentPlayer = tossWinner;

    // Display the toss winner's name once at the top and don't change it
    document.getElementById('tossWinnerDisplay').innerText = "Toss Winner: " + tossWinner;

    displayTurnInfo();
    showDiceSection();

    // Disable the toss button after the toss
    document.getElementById('tossBtn').disabled = true;

    // Disable the non-toss-winning player's roll button
    if (tossWinner === player1Name) {
        document.getElementById('rollDiceBtnPlayer2').disabled = true;
    } else {
        document.getElementById('rollDiceBtnPlayer1').disabled = true;
    }
}

function getPlayerChoice() {
    return prompt(player1Name + ", enter 'Head' or 'Tail'").trim().toLowerCase();
}

function isValidChoice(choice) {
    return ['head', 'tail'].includes(choice);
}

function performToss() {
    var randomValue = Math.random();
    return randomValue < 0.5 ? 'head' : 'tail';
}

function displayTossResult(result) {
    document.getElementById('tossResult').innerText = 'Toss Result: ' + result.toUpperCase();
}

function displayTurnInfo() {
    document.getElementById('turnInfo').innerText = currentPlayer + "'s Turn";
}

function showDiceSection() {
    document.getElementById('diceContainer').style.display = 'block';
}

function rollDice(player) {
    if (player !== currentPlayer) {
        return; // Ignore if it's not the current player's turn
    }

    var dice1 = rollSingleDice();
    var dice2 = rollSingleDice();
    displayDiceResults(player, dice1, dice2);

    // Check for win immediately after the roll
    if (checkForWin(dice1, dice2)) {
        endGame(player);
    } else {
        // Switch to the other player after the current player's turn
        switchPlayer();
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
    return dice1 === 6 && dice2 === 6;  // Win condition: both dice show 6
}

function endGame(player) {
    document.getElementById('gameStatus').innerText = player + " wins! Both dice rolled 6!";
    document.getElementById('rollDiceBtnPlayer1').disabled = true;
    document.getElementById('rollDiceBtnPlayer2').disabled = true;
    // Re-enable the toss button after the game ends
    document.getElementById('tossBtn').disabled = false;
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

    displayTurnInfo(); // Update the turn display after switching
}

function displayMessage(message) {
    document.getElementById('tossResult').innerText = message;
}

document.getElementById('tossBtn').addEventListener('click', startGame);
document.getElementById('rollDiceBtnPlayer1').addEventListener('click', function() {
    rollDice(player1Name);
});
document.getElementById('rollDiceBtnPlayer2').addEventListener('click', function() {
    rollDice(player2Name);
});
