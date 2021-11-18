let crossFields = [];
let circleFields = [];
let currentShape = 'cross';
let winner = '';
let winnersFields = [];
const winningCombinations = [ 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];


function setup() {
    showCurrentPlayer();

    /**to replace transform value when drawing line */
    document.getElementById('line-0').style.transform = 'scaleX(0)';
    document.getElementById('line-1').style.transform = 'scaleX(0)';
    document.getElementById('line-2').style.transform = 'scaleX(0)';
    document.getElementById('line-3').style.transform = 'rotate(90deg) scaleX(0)';
    document.getElementById('line-4').style.transform = 'rotate(90deg) scaleX(0)';
    document.getElementById('line-5').style.transform = 'rotate(90deg) scaleX(0)';
    document.getElementById('line-6').style.transform = 'rotate(45deg) scaleX(0)';
    document.getElementById('line-7').style.transform = 'rotate(135deg) scaleX(0)';
};
    

function fillField(field) {
    if(!document.getElementById('field-' + field).classList.contains('disabled-td')) {
        if(currentShape == 'cross') {
            currentShape = 'circle';
            circleFields.push(field);
        } else {
            currentShape = 'cross';
            crossFields.push(field);
        };
        
        disableField(field);
        drawShapeAt(field);
        checkWin();
        showCurrentPlayer();
    };
};


function showCurrentPlayer() {
    if(currentShape == 'cross') {
        document.getElementById('x-player-info').style.opacity = 0.5;
        document.getElementById('o-player-info').style.opacity = 1;
    } else {
        document.getElementById('x-player-info').style.opacity = 1;
        document.getElementById('o-player-info').style.opacity = 0.5;
    };
};


function drawShapeAt(field){
    if(crossFields.includes(field)) {
        document.getElementById('field-' + field).style.backgroundImage = 'url("res/cross.png")';
    } else {
        document.getElementById('field-' + field).style.backgroundImage = 'url("res/circle.png")';
    };
};


function disableField(field) {
    document.getElementById('field-' + field).classList.add('disabled-td');
};


function checkWin() {
    /**check for winner */
    for(i = 0; i < winningCombinations.length; i++) {
        if(crossFields.includes(winningCombinations[i][0]) && crossFields.includes(winningCombinations[i][1]) && crossFields.includes(winningCombinations[i][2])){
            winner = 'cross';
            winnersFields = winningCombinations[i];
        } else if(circleFields.includes(winningCombinations[i][0]) && circleFields.includes(winningCombinations[i][1]) && circleFields.includes(winningCombinations[i][2])) {
            winner = 'circle';
            winnersFields = winningCombinations[i];
        };
    };

    if(winner){
        drawLine(winningCombinations.indexOf(winnersFields));
        addScore(winner);
        showWinnerContainer(winner);
    } else if(crossFields.length + circleFields.length == 9){
        showWinnerContainer('draw');
    };
};


function drawLine(lineNo) {
    const line = document.getElementById('line-' + lineNo);

    line.style.transitionDuration = '225ms';
    
    setTimeout(() => {
        line.style.transform = line.style.transform.replace('scaleX(0)', 'scaleX(1)');
    },0);
};


function showWinnerContainer(winner) {
    const winnerContainer = document.getElementById('winning-container');

    /**animation */
    setTimeout(() => {
        document.getElementById('x-player-info').style.opacity = 1;
        document.getElementById('o-player-info').style.opacity = 1;
    }, 1);

    winnerContainer.classList.remove('hide');
    winnerContainer.style.opacity = 0;
    setTimeout(() => {
        winnerContainer.style.opacity = 1;
    }, 750);

    updateWinnerContainerGraphics(winner);
};

function updateWinnerContainerGraphics(winner) {
    const winnerContainerImage = document.getElementById('winning-container-img');
    const winnerTopLabel = document.getElementById('winning-container-top-label');
    const winnerBottomLabel = document.getElementById('winning-container-bottom-label');
    
    if(winner == 'draw') {
        winnerContainerImage.classList.add('hide');
        winnerTopLabel.innerHTML = `It's a`;
        winnerBottomLabel.innerHTML = 'Draw!';
    } else {
        winnerContainerImage.classList.remove('hide');
        winnerTopLabel.innerHTML = 'Player';
        winnerBottomLabel.innerHTML = 'won!';
        document.getElementById('winning-container-img').src = 'res/' + winner + '.png';
    };
};


function addScore(to) {
    document.getElementById(to + '-player-wins').innerHTML = Number(document.getElementById(to + '-player-wins').innerHTML) + 1;
};


function resetAll() {
    document.getElementById('winning-container').classList.add('hide');

    showCurrentPlayer();
    resetAllFields();
    resetAllValues();
};

function resetAllValues() { 
    crossFields = [];
    circleFields = [];
    currentShape = winner;
    winner = '';
    winnersFields = [];
}

function resetAllFields() {
    for(i = 0; i < 9; i++) {
        if(i != 8){
            document.getElementById('line-' + i).style.transitionDuration = '0ms';
            document.getElementById('line-' + i).style.transform = document.getElementById('line-' + i).style.transform.replace('scaleX(1)', 'scaleX(0)');
        };
        document.getElementById('field-' + i).style.backgroundImage = '';
        document.getElementById('field-' + i).classList.remove('disabled-td');
    };
};