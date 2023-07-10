const game = new UI
fillShop(shop)

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
            fillInv()
        }

        contents.appendChild(content)
    })
}


/////////////// TRANSFER TO INV
function fillInv() {
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
        content.onclick = () => fillCanvas(item)

        contents.appendChild(content)
    })
}

/////////////// TRANSFER TO UI
function fillCanvas(item) {

    for (let i = 0; i < inventory.length; i++) {
        if (item === inventory[i]){
            inventory.splice(i, 1)
            fillInv()

            if(item.type === 'pcCase') {
                game.addToPcCaseArea(item)
            } else {
                game.addToCmponentArea(item)
            }
            return
        }
    }
    
    // for (let component in components) {
    //     if(components[component].name === name) {
    //         if(components[component].type === 'pcCase') {
    //             game.addToPcCaseArea(components[component])
    //         } else {
    //             game.addToCmponentArea(components[component])
    //         }
    //     }

    // }
}

