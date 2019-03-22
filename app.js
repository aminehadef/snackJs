let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let dirction  = ''

class snack{
    constructor(x, y){
        this.x = x
        this.y = y
    }

    drawBlock(){
        ctx.fillStyle = 'white'
        ctx.fillRect(this.x,this.y, 10, 5)
    }
    moveRigth(){
        this.x = this.x + 10
    }
    moveLeft(){
        this.x = this.x - 10
    }
    moveUp(){
        this.y = this.y + 5
    }
    moveBottom(){
        this.y = this.y - 5
    }
    deleteBlock(){
        ctx.clearRect(this.x,this.y, 10, 5);
    }
}

let snack1 = new snack(10,10)

window.addEventListener('keyup', (e)=>{
    e.preventDefault()

    switch (e.keyCode) {

        case 39:// move rigth
            if (dirction == 'left') {
                break
            }
            dirction = 'rigth'
            snack1.deleteBlock()
            snack1.moveRigth()
            snack1.drawBlock()
        break

        case 37://move left
            if (dirction == 'rigth') {
                break
            }
            dirction = 'left'
            snack1.deleteBlock()
            snack1.moveLeft()
            snack1.drawBlock()
        break

        case 38:// move bottom
            if (dirction == 'up') {
                break
            }
            dirction = 'bottom'
            snack1.deleteBlock()
            snack1.moveBottom()
            snack1.drawBlock()
        break

        case 40:// move up
            if (dirction == 'bottom') {
                break
            }
            dirction = 'up'
            snack1.deleteBlock()
            snack1.moveUp()
            snack1.drawBlock()
        break
    }
})
snack1.drawBlock()
