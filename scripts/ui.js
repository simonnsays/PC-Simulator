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
        this.pcCaseToAdd = []
        this.componentsToAdd = []      
     
        this.selectedComponent = undefined
        this.origin = undefined
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e))
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e))
        this.canvas.addEventListener('mouseup', () => this.handleMouseUp())
    }   

    handleMouseDown(e) {
        //get mouse position and boundingBox of the component
        const mousePosition = this.getMousePosition(e)
        this.selectedComponent = this.getPiece(mousePosition)

        if (this.selectedComponent != undefined){
            console.log(mousePosition)
            console.log(this.selectedComponent)
            this.origin = {
                x: this.selectedComponent.boundingBox.x,
                y: this.selectedComponent.boundingBox.y
            }
            this.selectedComponent.offset = {
              x: mousePosition.x - this.selectedComponent.boundingBox.x,
              y: mousePosition.y - this.selectedComponent.boundingBox.y
    
            }
          }
    }

    handleMouseMove(e) {
        const mousePosition = this.getMousePosition(e)
        if (this.selectedComponent !== undefined) {
            this.selectedComponent.boundingBox.x = mousePosition.x - this.selectedComponent.offset.x
            this.selectedComponent.boundingBox.y = mousePosition.y - this.selectedComponent.offset.y
        }
    }

    handleMouseUp() {
        if(this.selectedComponent !== undefined){
            this.selectedComponent.boundingBox.x = this.origin.x
            this.selectedComponent.boundingBox.y = this.origin.y
        }
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
            if (mouse.x >= this.componentsToAdd[i].boundingBox.x &&
                mouse.y <= this.componentsToAdd[i].boundingBox.x + this.componentsToAdd[i].boundingBox.width && 
                mouse.y >= this.componentsToAdd[i].boundingBox.y &&
                mouse.y <= this.componentsToAdd[i].boundingBox.y + this.componentsToAdd[i].boundingBox.height) {
                    return this.componentsToAdd[i]
            }
        }
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
            component.boundingBox = {
                x: this.componentAreas[index].x + (this.componentAreas[index].w / 2) - 95,
                y: this.componentAreas[index].y + (this.componentAreas[index].h / 2) - 95,
              width: 190,
              height: 190
            }
        })    
    }

    addToPcCaseArea(src) {
        if(this.pcCaseToAdd.length > 0) this.pcCaseToAdd.pop()
        this.pcCaseToAdd.unshift(src)
    }

    animate() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.ctx.fillStyle = 'teal'
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)

        //PC CASE AREA
        this.ctx.fillStyle = 'rgb(0,178,178,0.7)'
        this.ctx.fillRect(10,10,700,650)

        //COMPONENT 1 AREA
        this.ctx.fillRect(720, 10, 530, 210)

        //COMPONENT 2 AREA
        this.ctx.fillRect(720, 230, 530, 210)

        //COMPONENT 3 AREA
        this.ctx.fillRect(720, 450, 530, 210)

        this.pcCaseToAdd.forEach((image) => {
            this.ctx.drawImage(image.states.default.image, 
                this.pcCaseArea.x + 50, 
                this.pcCaseArea.y + 50,
                this.pcCaseArea.w -100,  
                this.pcCaseArea.h -100 )
        })
        this.componentsToAdd.forEach((image, index) => {
            const x = this.componentsToAdd[index].boundingBox.x
            const y = this.componentsToAdd[index].boundingBox.y
            const width = this.componentsToAdd[index].boundingBox.width
            const height = this.componentsToAdd[index].boundingBox.height

            this.ctx.drawImage(image.states.default.image, x, y, width, height)
        })
        
        requestAnimationFrame(() => this.animate())
    }
}