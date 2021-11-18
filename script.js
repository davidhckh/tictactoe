let crossFields = [];
let circleFields = [];
let currentShape = 'cross';
let winnersFields = []
const winningCombinations = [ 
    [0, 1, 2, 0], /**last number is winning line id */
    [3, 4, 5, 1],
    [6, 7, 8, 2],
    [0, 3, 6, 3],
    [1, 4, 7, 4],
    [2, 5, 8, 5],
    [0, 4, 8, 6],
    [6, 4, 2, 7]
]

const setup = () => {
    document.getElementById('line-0').style.transform = 'scaleX(0)'
    document.getElementById('line-1').style.transform = 'scaleX(0)'
    document.getElementById('line-2').style.transform = 'scaleX(0)'
    document.getElementById('line-3').style.transform = 'rotate(90deg) scaleX(0)'
    document.getElementById('line-4').style.transform = 'rotate(90deg) scaleX(0)'
    document.getElementById('line-5').style.transform = 'rotate(90deg) scaleX(0)'
    document.getElementById('line-6').style.transform = 'rotate(45deg) scaleX(0)'
    document.getElementById('line-7').style.transform = 'rotate(135deg) scaleX(0)'
}
                
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
        drawLine(winningCombinations[winningCombinations.indexOf(winnersFields)][3])
        return winner
    } else if(crossFields.length + circleFields.length == 9){
        disableAllFields()
        return 'draw'
    }
}

const drawLine = (lineNo) => {
    const line = document.getElementById('line-' + lineNo)
    line.classList.remove('hide')
    setTimeout(() => {
        line.style.transform = line.style.transform.replace('scaleX(0)', 'scaleX(1)')
    },0)
}

const disableAllFields = () => {
    for(i = 0; i < 9; i++) {
        disableField(i)
    }
}