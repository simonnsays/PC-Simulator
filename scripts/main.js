const game = new UI

const inventory = []
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
        content.onclick = () => {
            inventory.push(item)
            fillInv(item)
        }

        contents.appendChild(content)
    })
}


/////////////// TRANSFER TO INV
function fillInv(item) {
    const contents = document.querySelector('#invContents')

    //find unique items
    const uniqueItems = findUnique(inventory)

    while (contents.firstChild) {
        contents.removeChild(contents.firstChild)
    }
    //make divs for element
    uniqueItems.forEach(item => {
        invCount = 0
        for (let i = 0; i < inventory.length; i++) {
            if (item == inventory[i]) {
                invCount++
            }
        }

        const content = makeElement(item)
        if (invCount > 1 ) {
            const countDiv = document.createElement('div')
            countDiv.className = 'item-count'
            countDiv.innerHTML = invCount

            content.appendChild(countDiv)
        }
        contents.appendChild(content)
    })
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

