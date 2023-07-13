//// SEARCH BAR USING KMP

/// SHOP SEARCH BAR
const shopContainer = document.querySelector('#shopContents')
const shopSearch = document.querySelector('#shop-search')

//get user input
shopSearch.addEventListener('input', (e) => {
    //input will be considered pattern in KMP search
    const pattern = e.target.value

    //search for match
    const results = shop.filter(item => kmpSearch(item.name.toLowerCase(), pattern.toLowerCase()).length > 0)
    console.log(results)
    
    //update divs according to search
    if (pattern.length == 0) {
        updateDivs(shopContainer, shop, fillInv)
    } else {
        updateDivs(shopContainer, results, fillInv)
    }
})

/// INVENTORY SEARCH BAR
const invContainer = document.querySelector('#invContents')
const invSearch = document.querySelector('#inv-search')

invSearch.addEventListener('input', (e) => {
    const pattern = e.target.value

    //search for match
    const results = inventory.filter(item => kmpSearch(item.name.toLowerCase(), pattern.toLowerCase()).length > 0)

    //update divs according to search
    if (pattern.length == 0) {
        updateDivs(invContainer, inventory, fillCanvas)
    } else {
        updateDivs(invContainer, results, fillCanvas)
    }
})

