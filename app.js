let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let dirction  = ''

class snack{
    constructor(x, y){
        this.x = x
        this.y = y
        this.interva
    }

    drawBlock(){
        ctx.fillStyle = 'white'
        ctx.fillRect(this.x,this.y, 10, 5)
    }
    moveRigth(){
        this.x = this.x + 5
    }
    moveLeft(){
        this.x = this.x - 5
    }
    moveUp(){
        this.y = this.y + 2
    }
    moveBottom(){
        this.y = this.y - 2
    }
    deleteBlock(){
        ctx.clearRect(this.x,this.y, 10, 5);
    }
}

let snack1 = new snack(10,10)

window.addEventListener('keydown', (e)=>{
    e.preventDefault()
    window.clearInterval(snack1.interva)
    switch (e.keyCode) {
        
        case 39:
            if (dirction == 'left') {break}
            dirction = 'rigth'
            snack1.interva = window.setInterval(()=>{
                snack1.deleteBlock()
                snack1.moveRigth()
                snack1.drawBlock()
            },250)

        break

        case 38:
            if (dirction == 'up') {break}
            dirction = 'bottom'
            snack1.interva = window.setInterval(()=>{
                snack1.deleteBlock()
                snack1.moveBottom()
                snack1.drawBlock()
            },250)

        break

        case 37:
            if (dirction == 'rigth') {break}
            dirction = 'left'
            snack1.interva = window.setInterval(()=>{
                snack1.deleteBlock()
                snack1.moveLeft()
                snack1.drawBlock()
            },250)
            
        break

        case 40:
            if (dirction == 'bottom') {break}
            dirction = 'up'
            snack1.interva = window.setInterval(()=>{
                snack1.deleteBlock()
                snack1.moveUp()
                snack1.drawBlock()
            },250)
        break
    }
})
snack1.drawBlock()
