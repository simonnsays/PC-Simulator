//// Create Element
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

//// Slider Div
function createSlider(item) {
    const slider = document.createElement('div')
    slider.className = 'slider'
    slider.textContent = item.id

    return slider
}