let crossFields = [];
let circleFields = [];
let currentShape = 'cross';
let winnersFields = []
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]
                
const fillField = (field) => {
    if(!document.getElementById('field-' + field).classList.contains('disabled-td')) {
        if(currentShape == 'cross') {
            currentShape = 'circle'
            circleFields.push(field)
        } else {
            currentShape = 'cross';
            crossFields.push(field)
        }
        
        disableField(field)
        drawShapeAt(field)
        console.log(checkWin())
    }
}

const drawShapeAt = (field) => {
    if(crossFields.includes(field)) {
        document.getElementById('field-' + field).style.backgroundImage = 'url("res/cross.png")'
    } else {
        document.getElementById('field-' + field).style.backgroundImage = 'url("res/circle.png")'
    }
}

const disableField = (field) => {
    document.getElementById('field-' + field).classList.add('disabled-td')
}

const checkWin= () => {
    let winner = ''

    for(i = 0; i < winningCombinations.length; i++) {
        if(crossFields.includes(winningCombinations[i][0]) && crossFields.includes(winningCombinations[i][1]) && crossFields.includes(winningCombinations[i][2])){
            winner = 'cross'
            winnersFields = winningCombinations[i]
        } else if(circleFields.includes(winningCombinations[i][0]) && circleFields.includes(winningCombinations[i][1]) && circleFields.includes(winningCombinations[i][2])) {
            winner = 'circle'
            winnersFields = winningCombinations[i]
        }
    }

    if(winner){
        disableAllFields()
        return winner
    } else if(crossFields.length + circleFields.length == 9){
        disableAllFields()
        return 'draw'
    }
}

const drawLine = (lineNo) => {

}

const disableAllFields = () => {
    for(i = 0; i < 9; i++) {
        disableField(i)
    }
}