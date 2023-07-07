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



