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

let playerWins = 0;
let computerWins = 0;

const MAX_ROUNDS = 5;
let currentRound = 1;

const rockButtonElement = document.getElementById('rock-button');
const paperButtonElement = document.getElementById('paper-button');
const scissorsButtonElement = document.getElementById('scissors-button');

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

function initializeRound(playerSelection) {
    console.log('Round ' + currentRound);
    console.log('You play: ' + playerSelection);
    const computerSelection = computerPlay();
    console.log('Computer plays: ' + computerSelection);
    console.log(playRound(playerSelection, computerSelection));
    outputCurrentWins();
    console.log('\n');
    currentRound++;
}

// function startGame() {

//     if (playerWins === computerWins) {
//         console.log('TIE GAME');
//     } else if (playerWins > computerWins) {
//         console.log('PLAYER WINS!!!');
//     } else {
//         console.log('COMPUTER WINS!!!');
//     }
// }

function outputCurrentWins() {
    console.log(
        'Player Wins: ' + playerWins + ' vs. Computer Wins: ' + computerWins
    );
}
// startGame();

rockButtonElement.addEventListener('click', () => {
    initializeRound(MOVES.ROCK);
});

paperButtonElement.addEventListener('click', () => {
    initializeRound(MOVES.PAPER);
});

scissorsButtonElement.addEventListener('click', () => {
    initializeRound(MOVES.SCISSORS);
});
