class UI {
    constructor() {
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = 1260
        this.canvas.height = 670
        this.pcCaseArea = {x:10, y:10, w:700, h:650}
        this.componentAreas = [
            {x:720, y:10, w:530, h:210},
            {x:720, y:230, w:530, h:210},
            {x:720, y:450, w:530, h:210},
        ]
        this.buttons = document.querySelectorAll(".gameBtn")
        this.shop = document.querySelector("#shop")
        this.inv = document.querySelector("#inv")

        this.buttons.forEach((button) => {
            switch(button.id) {
                case 'openShop':
                    button.addEventListener('click', () => {
                        this.shop.showModal()
                    })
                    break
                case 'closeShop':
                    button.addEventListener('click', () => {
                        this.shop.close()
                    })
                    break
                case 'openInv':
                    button.addEventListener('click', () => {
                        this.inv.showModal()
                    })
                    break
                case 'closeInv':
                    button.addEventListener('click', () => {
                        this.inv.close()
                    })
                    break
            }
        })
        this.pcToBuild = []
        this.componentsToAdd = []      
     
        this.selectedComponent = undefined
        this.availableSlots = []
        this.drawHighlights = false
        this.origin = undefined
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e))
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e))
        this.canvas.addEventListener('mouseup', () => this.handleMouseUp())
    }   

    // MOUSE DOWN EVENT
    handleMouseDown(e) {
        //get mouse position and boundingBox of the component
        const mousePosition = this.getMousePosition(e)
        this.selectedComponent = this.getPiece(mousePosition)

        if (this.selectedComponent != undefined){
            //declare origin for reference
            this.origin = {
                x: this.selectedComponent.box.x,
                y: this.selectedComponent.box.y
            }
            console.log(this.origin)

            //image to cursor offset
            this.selectedComponent.offset = {
              x: mousePosition.x - this.selectedComponent.box.x,
              y: mousePosition.y - this.selectedComponent.box.y
            }
            
            //get available slots for the selected component
            if (this.pcToBuild.length != 0){
                this.availableSlots = (this.getSlots(this.selectedComponent, this.pcToBuild))
            }
        }
    }

    //MOUSE MOVE EVENT
    handleMouseMove(e) {
        const mousePosition = this.getMousePosition(e)
        if (this.selectedComponent !== undefined) {
            this.selectedComponent.box.x = mousePosition.x - this.selectedComponent.offset.x
            this.selectedComponent.box.y = mousePosition.y - this.selectedComponent.offset.y

            this.availableSlots.forEach((slot) => {
                if (this.partsAreClose(this.selectedComponent, slot)) {
                    this.drawHighlights = true
                }
            })
        } 
    }

    //MOUSE UP EVENT
    handleMouseUp() {
        if(this.selectedComponent == undefined){
            return
        }
        if(this.pcToBuild.length == 0) {
            this.selectedComponent.box.x = this.origin.x
            this.selectedComponent.box.y = this.origin.y
        }

        this.availableSlots.forEach((slot) => {
            if (this.partsAreClose(this.selectedComponent, slot)) {
                
                this.snap(this.selectedComponent, slot)
                this.pcToBuild.push(this.selectedComponent)
                
                this.componentsToAdd.forEach((component, index) => {
                    if (this.selectedComponent == component) {
                        console.log('hit')
                        this.componentsToAdd.splice(index, 1)
                        console.log(this.componentsToAdd)
                    }
                })
            } else {
                this.selectedComponent.box.x = this.origin.x
                this.selectedComponent.box.y = this.origin.y
            }
        })
        
        this.drawHighlights = false
        this.selectedComponent = undefined
        this.origin = undefined
    }

    getMousePosition(e) {
        const rect = this.canvas.getBoundingClientRect()
        return {
          x: Math.round(e.clientX - rect.left),
          y: Math.round(e.clientY - rect.top),
        }
    }

    getPiece(mouse) {
        for (let i = this.componentsToAdd.length - 1; i >= 0; i--) {
            if (mouse.x >= this.componentsToAdd[i].box.x &&
                mouse.x <= this.componentsToAdd[i].box.x + this.componentsToAdd[i].box.w && 
                mouse.y >= this.componentsToAdd[i].box.y &&
                mouse.y <= this.componentsToAdd[i].box.y + this.componentsToAdd[i].box.h) {
                    return this.componentsToAdd[i]
            }
        }
    }

    getSlots(component1, component2) {
        const availableSlots = []
        component2.forEach((obj) => {
            obj.slots.forEach((slot) => {
                if (component1.type === slot.name) {
                    availableSlots.push(slot)
                }
            })
        })
        return availableSlots
    }

    partsAreClose(component, slot) {
        return this.distance({x: component.box.x, y:component.box.y}, {x: slot.x, y: slot.y}) < slot.w / 3
    }

    distance(point1, point2) {
        let a = parseInt(point1.x - point2.x)
        let b = parseInt(point1.y - point2.y)
        let c = Math.sqrt(a*a + b*b)
        
        return Math.round(c)
    }

    snap(itemDragged, toSnap){
        itemDragged.box.x = toSnap.x
        itemDragged.box.y = toSnap.y
        itemDragged.box.w = toSnap.w
        itemDragged.box.h = toSnap.h
    }

    start() {
        this.animate()
    }
    
    addToCmponentArea(src) {
        if (this.componentsToAdd.length >= 3) this.componentsToAdd.pop()
        let component = Object.assign({}, src)
        this.componentsToAdd.unshift(component)
        this.createBoundingBox(this.componentsToAdd)
    }

    createBoundingBox(components) {
        components.forEach((component, index) => {
            component.box = {
                x: this.componentAreas[index].x + (this.componentAreas[index].w / 2) - 95,
                y: this.componentAreas[index].y + (this.componentAreas[index].h / 2) - 95,
              w: 190,
              h: 190
            }
        })    
    }

    createSlotBoundingBox(component) {
        component.slots.forEach((slot) => {
            slot.x += component.box.x,
            slot.y += component.box.y
        })
    }

    addToPcCaseArea(src) {
        const pcToBuild = Object.assign({}, src)

        //create Bounding Box
        pcToBuild.box = {
            x: this.pcCaseArea.x + 100,
            y: this.pcCaseArea.y + 100,
            w: this.pcCaseArea.w -200,
            h: this.pcCaseArea.h -208
        }
        //create Slot Boxes
        this.createSlotBoundingBox(pcToBuild)
        this.pcToBuild.push(pcToBuild)
    }

    animate() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.ctx.fillStyle = 'teal'
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)

        
        //PC CASE AREA
        this.ctx.fillStyle = 'rgb(0,178,178,0.7)'
        this.ctx.fillRect(10,10,700,650)

        //COMPONENT AREAS
        this.componentAreas.forEach((area) => {       
            this.ctx.fillRect(area.x, area.y, area.w, area.h)
        })

        //DRAW PC
        this.pcToBuild.forEach((component) => {
            this.ctx.drawImage(component.states.attached.image, component.box.x, component.box.y, component.box.w, component.box.h) 

            if (this.drawHighlights){
                // DRAW SLOTS
                component.slots.forEach((slot) => {
                    this.ctx.fillStyle = 'rgb(0,200,0,0.2)'
                    this.ctx.fillRect(slot.x, slot.y, slot.w, slot.h)
                })
            }
        })

        //DRAW COMPONENTS  
        this.componentsToAdd.forEach((component) => {
            

            this.ctx.drawImage(component.states.default.image, 
                component.box.x, component.box.y, component.box.w, component.box.h)
        })
        
        requestAnimationFrame(() => this.animate())
    }
}