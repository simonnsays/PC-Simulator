const game = new UI
fillShop(components)
game.start()

///////////// FILL SHOP Function
function fillShop(items) {
    const contents = document.querySelector('#shopContents')
    
    while (contents.firstChild) {
        contents.removeChild(contents.firstChild)
    }

    items.forEach(item => {
        
        //create divs for each item
        const content = makeElement(item)

        //transfer to inv onclick
        content.onclick = transferToInv(item)

        contents.appendChild(content)
    })
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

