let data = [
    new Component({
        type: 'pcCase',
        name: 'Nanoxia Deep Silence 3',
        size: 'mid-tower',
        states: {
            default: {imageSrc: '../assets/PC Case/Nanoxia Deep Silence 3/Side.png'},
            attached: {imageSrc: '../assets/PC Case/Nanoxia Deep Silence 3/Side.png'},
            front: {imageSrc: '../assets/PC Case/Nanoxia Deep Silence 3/Front.png'}
        },
        slotsOffset: [
            {name: 'MoBo', x: 37, y: 49, w: 197, h: 275},
            {name: 'psu', x: 18, y: 337, w: 129, h: 70}
        ]
    }),

    new Component({
        type: 'MoBo',
        name: 'ASUS P8P67',
        size: 'ATX',
        states: {
            default: {imageSrc: '../assets/MotherBoard/ASUS P8P67/Default.png'},
            attached: {imageSrc: '../assets/MotherBoard/ASUS P8P67/Default.png'}
        },
        slotsOffset: [
            {name: 'cpu', x:0, y:0, w:0, h:0}
        ]
    }),

    new Component({
        type: 'psu',
        name: 'Thermaltake Smart 500w',
        size: 'ATX',
        states: {
            default: {imageSrc: '../assets/Power Supply/Thermaltake Smart 500w/default.png'},
            attached: {imageSrc: '../assets/Power Supply/Thermaltake Smart 500w/attached.png'}
        },
        slotsOffset: [
            {name: 'none', x:0, y:0, w:0, h:0}
        ]
    })
]