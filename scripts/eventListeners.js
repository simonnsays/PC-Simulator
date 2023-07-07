//// SEARCH BAR USING KMP


// SHOP SEARCH BAR
const shopContainer = document.querySelector('#shopContents')
const shopSearch = document.querySelector('#shop-search')

//get user input
shopSearch.addEventListener('input', (e) => {
    //input will be considered pattern in KMP search
    const pattern = e.target.value

    //update divs according to search
    pattern.length == 0 ? fillShop(components) : updateDivs(pattern, shopContainer, components)
})

// Update Divs
function updateDivs(pattern, container, items) {
    //remove all divs
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }

    //search for match
    const results = components.filter(component => kmpSearch(component.name.toLowerCase(), pattern.toLowerCase()).length > 0)

    //only create divs for matches
    results.forEach(result => {
        const content = makeElement(result)

        //transfer to inv onclick
        content.onclick = transferToInv(result)

        shopContainer.appendChild(content)
    })
}

