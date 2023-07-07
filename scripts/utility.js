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

// Update Divs
function updateDivs(pattern, container, items) {
    //remove all divs
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }

    //search for match
    const results = components.filter(component => kmpSearch(component.name.toLowerCase(), pattern).length > 0)

    //only create divs for matches
    results.forEach(result => {
        const content = makeElement(result)

        //transfer to inv onclick
        content.onclick = transferToInv(result)

        shopContainer.appendChild(content)
    })
}

// Create Element
function makeElement(item) {
    //creaate div
    const element = document.createElement('div')
    element.className = 'content'
    element.id = item.name

    //attach image to div
    const image =  item.states.default.image
    image.style.width = '100%'
    image.style.height = '100%'
    image.alt = item.name
    element.appendChild(image)

    // make slider div
    slider = createSlider(element)
    element.appendChild(slider)

    return element
}

// Slider Div
function createSlider(item) {
    const slider = document.createElement('div')
    slider.className = 'slider'
    slider.textContent = item.id

    return slider
}