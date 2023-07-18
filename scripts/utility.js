//KMP SEARCH
function kmpSearch(string, pattern) {
    const strLen = string.length
    const ptrnLen = pattern.length 
    const results = []

    // create the LPS array from the pattern
    lps = [0]
    prevLPS = 0

    for (let i = 1; i < ptrnLen; i++) {
        if (pattern[i] === pattern[prevLPS]) {
            lps[i] = prevLPS + 1
            prevLPS++
        } else if (prevLPS !== 0){
            prevLPS = lps[prevLPS - 1]
            i--
        } else {
            lps[i] = 0
        }             
    }

    // perform the search
    let i = 0 // for string
    let j = 0 // for pattern
    
    while (i < strLen) {
        if (string[i] === pattern[j]) {
            i++
            j++
        } else {
            if (j == 0) {
                i++
            } else {
                j = lps[j - 1]
            }
        }
        
        if (j === ptrnLen && j !== 0){
            results.push(string)
        }

    }
    return results
}

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
            fillInv(item)
        }

        contents.appendChild(content)
    })
}

/////////////// TRANSFER TO INV
function fillInv(component) {
    const contents = document.querySelector('#invContents')
    inventory.push(component)

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

/////////////// TRANSFER TO Canvas
function fillCanvas(item) {
    for (let i = 0; i < inventory.length; i++) {
        if (item === inventory[i]){
            removedItem = inventory.splice(i, 1)
            const invContainer = document.querySelector('#invContents')
            updateDivs(invContainer, inventory, fillCanvas)
            // separate pcCase inventory
            if(item.type === 'pcCase') {
                if(game.pcToBuild.length < 1) {
                    game.addToPcCaseArea(item)
                    return
                } 

                // Create warning when replacing Case
                message = showPopUp('01')
            
                const proceed = createBtn()
                proceed.innerHTML = 'Proceed'
                proceed.onclick = () => {
                    game.replacePC(item)
                    message.close()}
                message.appendChild(proceed)
    
                const cancel = createBtn()
                cancel.innerHTML = 'Cancel'
                cancel.onclick = () => {
                    popUp.close()
                    fillInv(removedItem[0])
                }
                message.appendChild(cancel)
                message.showModal()
   
            } else {
                game.addToCmponentArea(item)
            }
            // const invContainer = document.querySelector('#invContents')
            updateDivs(invContainer, inventory, fillCanvas)
            return
        }
    }
}

// Create Button
function createBtn() {
    btn = document.createElement('button')
    btn.className = 'button small'
    return btn
}

// Update Divs
function updateDivs(container, items, func) {
    //remove all divs
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
    
    //only create divs for matches
    const uniqueItems = findUnique(items)
    
    uniqueItems.forEach(result => {
        invCount = 0
        for (let i = 0; i < items.length; i++) {
            if (result == items[i]) {
                invCount++
            }
        }

        const content = makeElement(result)
        if (invCount > 1 ) {
            const countDiv = document.createElement('div')
            countDiv.className = 'item-count'
            countDiv.innerHTML = invCount

            content.appendChild(countDiv)
        }
        
        //operate funtion onclick
        content.onclick = () => func(result)

        container.appendChild(content)
    })
}

// Create Element
function makeElement(item) {
    //creaate div
    const element = document.createElement('div')
    element.className = 'content'
    element.id = item.name

    //attach image to div
    const image =  document.createElement('img')
    image.src = item.states.default.imageSrc
    image.style.width = '100%'
    image.style.height = '100%'
    image.alt = item.name
    element.appendChild(image)

    // make slider div
    slider = createSlider(item)
    element.appendChild(slider)

    return element
}

// Slider Div
function createSlider(item) {
    const slider = document.createElement('div')
    slider.className = 'slider'
    slider.textContent = item.name + ' (' + item.type + ')'

    return slider
}

// Find Unique Items
function findUnique(items) {
    const uniqueItems = []
    items.forEach(item => {
        if(!uniqueItems.includes(item)) uniqueItems.push(item)
    })
    return uniqueItems
}