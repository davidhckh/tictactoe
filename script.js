let fields = []

let currentShape = 'cross'
                
const fillShape = (id) => {
    if(currentShape == 'cross') {
        currentShape = 'circle'
    } else {
        currentShape = 'cross'
    }
    fields[id] = currentShape
    console.log(fields)
}

