let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let dirction  = ''
let canvasWidth = canvas.width
let canvasHeight = canvas.height

class Snack{
    constructor(x, y){
        this.x = x
        this.y = y
        this.interva
    }

    drawBlock(){
        ctx.fillStyle = 'white'
        ctx.fillRect(this.x,this.y, 10, 5)
    }
    deleteBlock(){
        ctx.clearRect(this.x,this.y, 10, 5)
    }

    moveRigth(){
        this.x = this.x + 2
    }
    moveLeft(){
        this.x = this.x - 2
    }
    moveUp(){
        this.y = this.y - 1
    }
    moveBottom(){
        this.y = this.y + 1
    }

}
class Appel{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    drawAppel(){
        ctx.fillStyle = 'red'
        ctx.beginPath()
        ctx.fillStyle="#FF4422"
        ctx.arc(this.x,this.y + 2, 2, 0, 10 * Math.PI)
        ctx.fill()
    }
}

let snack1 = new Snack(10,10)


let appel1 = new Appel(50,10)

appel1.drawAppel()

window.addEventListener('keydown', (e)=>{
    e.preventDefault()
    
    switch (e.keyCode) {
        
        case 39:
            if (dirction == 'left') {break}
            window.clearInterval(snack1.interva)
            dirction = 'rigth'
            snack1.interva = window.setInterval(()=>{
                if (snack1.x + 14 > canvasWidth) {
                    window.clearInterval(snack1.interva)
                }
                snack1.deleteBlock()
                snack1.moveRigth()
                snack1.drawBlock()
            },25)

        break

        case 38:

            if (dirction == 'bottom') {break}
            window.clearInterval(snack1.interva)
            dirction = 'up'

            snack1.interva = window.setInterval(()=>{
                
                if (snack1.y < 2) {
                    window.clearInterval(snack1.interva)
                }
                snack1.deleteBlock()
                snack1.moveUp()
                snack1.drawBlock()
            },25)

        break

        case 37:
            if (dirction == 'rigth') {break}
            window.clearInterval(snack1.interva)
            dirction = 'left'
            snack1.interva = window.setInterval(()=>{
                if (snack1.x < 4) {
                    window.clearInterval(snack1.interva)
                }
                snack1.deleteBlock()
                snack1.moveLeft()
                snack1.drawBlock()
            },25)
            
        break

        case 40:
            if (dirction == 'up') {break}
            window.clearInterval(snack1.interva)
            dirction = 'bottom'
            snack1.interva = window.setInterval(()=>{
                if (snack1.y + 7 > canvasHeight) {
                    window.clearInterval(snack1.interva)
                }
                snack1.deleteBlock()
                snack1.moveBottom()
                snack1.drawBlock()
            },25)
        break
    }
})
snack1.drawBlock()
