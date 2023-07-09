//// SEARCH BAR USING KMP


/// SHOP SEARCH BAR
const shopContainer = document.querySelector('#shopContents')
const shopSearch = document.querySelector('#shop-search')

//get user input
shopSearch.addEventListener('input', (e) => {
    //input will be considered pattern in KMP search
    const pattern = e.target.value

    //update divs according to search
    pattern.length == 0 ? fillShop(components) : updateDivs(pattern, shopContainer, components, fillInv)
})

// Update Divs
function updateDivs(pattern, container, items, func) {
    //remove all divs
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
    
    //search for match
    const results = items.filter(item => kmpSearch(item.name.toLowerCase(), pattern.toLowerCase()).length > 0)

    //only create divs for matches
    const uniqueItems = findUnique(results)
    
    uniqueItems.forEach(result => {
        invCount = 0
        for (let i = 0; i < inventory.length; i++) {
            if (result == results[i]) {
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

/// INVENTORY SEARCH BAR
const invContainer = document.querySelector('#invContents')
const invSearch = document.querySelector('#inv-search')

invSearch.addEventListener('input', (e) => {
    const pattern = e.target.value

    pattern.length == 0 ? fillInv(inventory) : updateDivs(pattern, invContainer, inventory, fillInv)
})
