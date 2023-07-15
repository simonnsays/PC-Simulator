const body = document.querySelector('body')
const popUp = document.createElement('dialog')
popUp.className = 'modal small'

body.appendChild(popUp)

function showPopUp(popCode) {
    while(popUp.firstChild){
        popUp.removeChild(popUp.firstChild)
    }

    switch(popCode) {
        case '01':
            const container = document.createElement('div')
            popUp.appendChild(container)
                        
            const title = document.createElement('h2')
            title.innerHTML = 'WARNING'
            container.appendChild(title)

            const desc = document.createElement('p')
            desc.innerHTML = 'You are about to add another PC case in the area. All attached components will be removed and put back in your inventory. <br><br> Are you sure you want to Continue?'
            container.appendChild(desc)

            return popUp
    }
}