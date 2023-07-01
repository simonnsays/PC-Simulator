class Component {
    constructor ({type, name, states, size, slots, isAttached = 'false'}) {
        this.type = type
        this.name = name
        this.size = size
        this.states = states
        this.slots = slots
        this.isAttached = isAttached

        for (let state in this.states) {
            states[state].image = new Image()
            states[state].image.src = states[state].imageSrc
        }
    }
}