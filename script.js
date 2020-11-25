const MOVES = {
    ROCK: 'ROCK',
    PAPER: 'PAPER',
    SCISSORS: 'SCISSORS',
};

const ROUND_STATEMENTS = {
    WIN_STATEMENT: 'You Win!',
    LOSE_STATEMENT: 'You Lose!',
    TIE_STATEMENT: 'Tie. No winner.',
    ERROR_STATEMENT: 'ERROR. Game ended.',
};

const ROUND_DESCRIPTIONS = {
    ROCK_WIN_DESCRIPTION: getWinDescription(MOVES.ROCK, MOVES.SCISSORS),
    PAPER_WIN_DESCRIPTION: getWinDescription(MOVES.PAPER, MOVES.ROCK),
    SCISSORS_WIN_DESCRIPTION: getWinDescription(MOVES.SCISSORS, MOVES.PAPER),
};

const GAME_END_STATEMENTS = {
    PLAYER_WIN: 'PLAYER WINS!!! GAME OVER!!!',
    COMPUTER_WIN: 'COMPUTER WINS!!! GAME OVER!!!',
    TIE_GAME: 'TIE GAME!!! GAME OVER!!!',
    RESTART_GAME_INFO: 'Refresh page to play again.',
};

let playerWins = 0;
let computerWins = 0;

const MAX_ROUNDS = 5;
let currentRound = 1;

const rockButtonElement = document.getElementById('rock-button');
const paperButtonElement = document.getElementById('paper-button');
const scissorsButtonElement = document.getElementById('scissors-button');
const currentRoundNumberElement = document.getElementById(
    'current-round-number'
);
const playerPointsTotalElement = document.getElementById('player-points-total');
const computerPointsTotalElement = document.getElementById(
    'computer-points-total'
);
const roundInfoListElement = document.getElementById('round-info-list');

function getWinDescription(winnerMove, loserMove) {
    return `${winnerMove} beats ${loserMove}.`;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function computerPlay() {
    switch (getRandomInt(3)) {
        case 0:
            return MOVES.ROCK;
        case 1:
            return MOVES.PAPER;
        case 2:
            return MOVES.SCISSORS;
        default:
            return null;
    }
}

function playRound(playerSelection, computerSelection) {
    let roundStatement = '';
    const finalPlayerSelection = playerSelection;

    if (computerSelection === null || computerSelection === undefined) {
        roundStatement = ROUND_STATEMENTS.ERROR_STATEMENT;
    } else if (finalPlayerSelection === computerSelection) {
        roundStatement = ROUND_STATEMENTS.TIE_STATEMENT;
    } else {
        switch (finalPlayerSelection) {
            case MOVES.ROCK:
                switch (computerSelection) {
                    case MOVES.SCISSORS:
                        roundStatement =
                            ROUND_STATEMENTS.WIN_STATEMENT +
                            ' ' +
                            ROUND_DESCRIPTIONS.ROCK_WIN_DESCRIPTION;
                        playerWins++;
                        break;
                    case MOVES.PAPER:
                        roundStatement =
                            ROUND_STATEMENTS.LOSE_STATEMENT +
                            ' ' +
                            ROUND_DESCRIPTIONS.PAPER_WIN_DESCRIPTION;
                        computerWins++;
                        break;
                    default:
                        roundStatement = ROUND_STATEMENTS.ERROR_STATEMENT;
                        break;
                }
                break;
            case MOVES.PAPER:
                switch (computerSelection) {
                    case MOVES.ROCK:
                        roundStatement =
                            ROUND_STATEMENTS.WIN_STATEMENT +
                            ' ' +
                            ROUND_DESCRIPTIONS.PAPER_WIN_DESCRIPTION;
                        playerWins++;
                        break;
                    case MOVES.SCISSORS:
                        roundStatement =
                            ROUND_STATEMENTS.LOSE_STATEMENT +
                            ' ' +
                            ROUND_DESCRIPTIONS.SCISSORS_WIN_DESCRIPTION;
                        computerWins++;
                        break;
                    default:
                        roundStatement = ROUND_STATEMENTS.ERROR_STATEMENT;
                        break;
                }
                break;
            case MOVES.SCISSORS:
                switch (computerSelection) {
                    case MOVES.PAPER:
                        roundStatement =
                            ROUND_STATEMENTS.WIN_STATEMENT +
                            ' ' +
                            ROUND_DESCRIPTIONS.SCISSORS_WIN_DESCRIPTION;
                        playerWins++;
                        break;
                    case MOVES.ROCK:
                        roundStatement =
                            ROUND_STATEMENTS.LOSE_STATEMENT +
                            ' ' +
                            ROUND_DESCRIPTIONS.ROCK_WIN_DESCRIPTION;
                        computerWins++;
                        break;
                    default:
                        roundStatement = ROUND_STATEMENTS.ERROR_STATEMENT;
                        break;
                }
                break;
            default:
                roundStatement = ROUND_STATEMENTS.ERROR_STATEMENT;
                break;
        }
    }

    return roundStatement;
}

function setCurrentRoundNumberElement(currentRoundNumber) {
    currentRoundNumberElement.textContent = currentRoundNumber;
}

function addChildItemToRoundInfoList(newChildItem) {
    roundInfoListElement.appendChild(newChildItem);
}

function getChildRoundInfoItem(textContent) {
    let newChildItem = document.createElement('li');

    newChildItem.textContent = textContent;
    newChildItem.classList.add('round-info-item');

    return newChildItem;
}

function setPlayerInfo(playerSelection) {
    const newChildItem = getChildRoundInfoItem(`You play: ${playerSelection}`);

    addChildItemToRoundInfoList(newChildItem);
}

function setComputerInfo(playerSelection) {
    const newChildItem = getChildRoundInfoItem(
        `Computer plays: ${playerSelection}`
    );

    addChildItemToRoundInfoList(newChildItem);
}

function setRoundPlayInfo(playerSelection, computerSelection) {
    const newChildItem = getChildRoundInfoItem(
        'RESULT: ' + playRound(playerSelection, computerSelection)
    );

    addChildItemToRoundInfoList(newChildItem);
}

function setWinnerInfo() {
    let newChildItem;

    if (playerWins === computerWins) {
        newChildItem = getChildRoundInfoItem(GAME_END_STATEMENTS.TIE_GAME);
    } else if (playerWins > computerWins) {
        newChildItem = getChildRoundInfoItem(GAME_END_STATEMENTS.PLAYER_WIN);
    } else {
        newChildItem = getChildRoundInfoItem(GAME_END_STATEMENTS.COMPUTER_WIN);
    }

    addChildItemToRoundInfoList(newChildItem);
    addChildItemToRoundInfoList(
        getChildRoundInfoItem(GAME_END_STATEMENTS.RESTART_GAME_INFO)
    );
}

function disableButtons() {
    rockButtonElement.setAttribute('disabled', '');
    paperButtonElement.setAttribute('disabled', '');
    scissorsButtonElement.setAttribute('disabled', '');
}

function scrollToBottom() {
    roundInfoListElement.scrollIntoView(false);
}

function initializeRound(playerSelection) {
    setCurrentRoundNumberElement(currentRound);

    setPlayerInfo(playerSelection);

    const computerSelection = computerPlay();
    setComputerInfo(computerSelection);

    setRoundPlayInfo(playerSelection, computerSelection);
    outputCurrentWins();

    if (currentRound !== 5) {
        currentRound++;
    } else {
        setWinnerInfo();
        disableButtons();
    }
    scrollToBottom();
}

function outputCurrentWins() {
    playerPointsTotalElement.textContent = playerWins;
    computerPointsTotalElement.textContent = computerWins;
}

rockButtonElement.addEventListener('click', () => {
    initializeRound(MOVES.ROCK);
});

paperButtonElement.addEventListener('click', () => {
    initializeRound(MOVES.PAPER);
});

scissorsButtonElement.addEventListener('click', () => {
    initializeRound(MOVES.SCISSORS);
});
