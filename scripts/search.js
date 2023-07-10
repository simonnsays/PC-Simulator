//// SEARCH BAR USING KMP

/// SHOP SEARCH BAR
const shopContainer = document.querySelector('#shopContents')
const shopSearch = document.querySelector('#shop-search')

//get user input
shopSearch.addEventListener('input', (e) => {
    //input will be considered pattern in KMP search
    const pattern = e.target.value

    //update divs according to search
    pattern.length == 0 ? fillShop(shop) : updateDivs(pattern, shopContainer, shop, fillInv)
})

/// INVENTORY SEARCH BAR
const invContainer = document.querySelector('#invContents')
const invSearch = document.querySelector('#inv-search')

invSearch.addEventListener('input', (e) => {
    const pattern = e.target.value

    pattern.length == 0 ? fillInv(inventory) : updateDivs(pattern, invContainer, inventory, fillCanvas)
})

