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