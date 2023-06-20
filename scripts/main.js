const game = new UI
let components = []

components.push(new Component({
    type: 'pcCase',
    name: 'Nanoxia Deep Silence 3',
    size: 'mid-tower',
    states: {
        default: {imageSrc: '../assets/PC Case/Nanoxia/Side.png'},
        front: {imageSrc: '../assets/PC Case/Nanoxia/Front.png'}
    }
}))

components.push(new Component({
    type: 'MoBo',
    name: 'ASUS P8P67',
    size: 'ATX',
    states: {
        default: {imageSrc: '../assets/MotherBoard/ASUS/P8P67/Default.png'}
    }
}))

///////////// FILL SHOP Function
function fillShop(items) {
    const contents = document.querySelector('#shopContents')
    
    for (let item in items) {
        const content = document.createElement('a')
        content.className = 'content'
        content.id = items[item].name
        content.href = `javascript:transferToInv("${content.id}")`

        const image = document.createElement('img')
        image.src = items[item].states.default.imageSrc
        image.style.width = '150px'
        image.style.height = '150px'
        image.style.padding = '10px'
        content.appendChild(image)
        contents.appendChild(content)
    }
}

/////////////// TRANSFER TO INV
function transferToInv(name) {
    const contents = document.querySelector('#invContents')
    const content = document.createElement('a')
    content.className = 'content'
    content.id = name
    content.href = `javascript:transferToCanvas("${content.id}")`

    for (let component in components) {
        if(components[component].name === content.id) {
            const image = document.createElement('img')
            image.src = components[component].states.default.imageSrc
            image.style.width = '150px'
            image.style.height = '150px'
            image.style.padding = '10px'

            content.appendChild(image)
        }
    }
    contents.appendChild(content)
}

/////////////// TRANSFER TO UI
function transferToCanvas(name) {
    for (let component in components) {
        if(components[component].name === name) {
            if(components[component].type === 'pcCase') {
                game.addToPcCaseArea(components[component])
            } else {
                game.addToCmponentArea(components[component])
            }
        }

    }
}

game.start()
fillShop(components)



