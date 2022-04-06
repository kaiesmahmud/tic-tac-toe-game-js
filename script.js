window.addEventListener('DOMContentLoaded', () => {

const tile = Array.from(document.querySelectorAll('.tile'));
const playerDisplay = document.querySelector('.display-player');
const resetButton = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');

/*
index in board -
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
*/
let board = ["", "" , "", "", "" , "", "", "" ,""];
let currentPlayer = 'X';
let isGameActive = true;
const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
];
const playerXwon = 'PlayerXwon';
const playerOwon = 'PlayerOwon';
const tie = 'Tie';

handleResultValidation = () => {
    let roundWon = false ;
    for(let i = 0 ; i <= 7 ; i++){
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if(a === '' || b === '' || c === ''){
            continue ;
        }
        if(a === b && b === c){
            roundWon = true ;
            break;
        }
    }
    if(roundWon) {
        announce(currentPlayer === 'X' ? playerXwon : playerOwon);
        isGameActive = false ;
        return ;
    }
    if (!board.includes('')) {
        announce(tie);
    }
}

const announce = (type)=>{
    switch(type){
        case playerOwon :
            announcer.innerHTML = 'Player <span class="playerO">O</span> Won .';
            break;
        case playerXwon :
            announcer.innerHTML = 'Player <span class="playerX">X</span> Won .';
            break; 
        case tie :
            announcer.innerHTML = 'Tie';
    }
    announcer.classList.remove('hide');
}

const isValidAction = (tile) => {
    if(tile.innerText === 'X' || tile.innerText === 'O'){
        return false;
    }
    return true ;
}
const updateBoard = (index)=>{
    board[index] = currentPlayer ;
} 
    

const changePlayer = () => {
    console.log(playerDisplay);
    playerDisplay.classList.remove(`player${currentPlayer}`);

    console.log(playerDisplay);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer ;
    playerDisplay.classList.add(`player${currentPlayer}`);
}

const userAction = (tile,index)=> {
    
    if(isValidAction(tile) && isGameActive ) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}

tile.forEach( (tile,index)=> {
    tile.addEventListener( 'click' , ()=> userAction(tile,index));
})

const resetBoard = () => {
    board = ["", "" , "", "", "" , "", "", "" ,""];
    isGameActive = true;
    announcer.classList.add('hide');
    if (currentPlayer === 'O'){
        changePlayer();
    }
    tile.forEach( tile => {
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });
}

resetButton.addEventListener("click",resetBoard);

})
