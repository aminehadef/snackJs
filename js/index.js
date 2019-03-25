/**
 * class snack représente la tête du serpent
 */
class Snack{
    constructor(x, y){
        this.x = x
        this.y = y
        this.width = 10
        this.height = 5
        this.interva
    }

    drawBlock(){
        ctx.fillStyle = 'white'
        ctx.fillRect(this.x,this.y, this.width, this.height)
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
/**
 * class Appel représente la pomme que doit manger le serpent
 */
class Appel{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    drawAppel(){
        ctx.beginPath()
        ctx.fillStyle="#FF4422"
        ctx.arc(this.x,this.y + 2, 2, 0, 10 * Math.PI)
        ctx.fill()
    }
}
/**
 * class scutSnack représente la queue du serpent
 */
class ScutSnack{
    constructor (x, y, snackX,snackY){
        this.x = x
        this.y = y
        this.width = 10
        this.height = 5
        this.snackX = snackX
        this.snackY = snackY
    }
    drawBlock(){
        ctx.fillStyle = 'yellow'
        ctx.fillRect(this.x,this.y, this.width, this.height)
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

/**
 * init canvas
 */
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let canvasWidth = canvas.width
let canvasHeight = canvas.height

/**
 * variable du jeux
 */

let scor = 0
let vitesse = 25
let dirction  = ''

/**
 * init pour un premier affichage
 */
let snack1 = new Snack(50,15)
let appel1 = new Appel(45,65)
let scut = new ScutSnack(38,15, snack1.x, snack1.y)

scut.drawBlock()

/**
 * fonction pour la détection de collision
 */
function collision(){

    if (snack1.x < appel1.x + 2 && snack1.x + snack1.width > appel1.x - 2 && snack1.y < appel1.y + 4 && snack1.height + snack1.y > appel1.y){
        scor++
        if (dirction == 'bottom') {
            console.log(snack1.x);
        }
        if (dirction == 'up') {
            console.log(snack1.x);
        }
        if (dirction == 'rigth') {
            console.log(snack1.x);
        }
        if (dirction == 'left') {
            console.log(snack1.x);
        }
    }
}

/**
 * init d'evenement des touche directionnel
 * direction reprensent la direction acctuel qui enpeche des comportement illogique du serpent
 * cette variable change a chaque fois qu'une touche directionnel est appuyer attention cette variable est null au debut du proramme
 */

window.addEventListener('keydown', (e)=>{
    e.preventDefault()
    
    switch (e.keyCode) {
        
        case 39:
            if (dirction == 'left') {break}// vérifie la direction du serpent pour éviter les demitour
            window.clearInterval(snack1.interva)// pour éviter les multiplier les setinterval
            dirction = 'rigth'
            snack1.interva = window.setInterval(()=>{
                if (snack1.x + 14 > canvasWidth) {//la tête du serpent est au bord de la canvas 
                    window.clearInterval(snack1.interva)
                }
                collision()
                snack1.deleteBlock()
                snack1.moveRigth()
                snack1.drawBlock()
                if (scut.y != snack1.y) {
                    scut.deleteBlock()
                    if (scut.y < snack1.y) {
                        scut.y++
                    } else {
                        scut.y--
                    }
                    scut.drawBlock()
                }else{
                    scut.deleteBlock()
                    scut.moveRigth()
                    scut.drawBlock()
                }
            },vitesse)

        break

        case 38:

            if (dirction == 'bottom') {break}
            window.clearInterval(snack1.interva)
            dirction = 'up'
            snack1.interva = window.setInterval(()=>{
                if (snack1.y < 2) {
                    window.clearInterval(snack1.interva)
                }
                collision()
                snack1.deleteBlock()
                snack1.moveUp()
                snack1.drawBlock()
                if (scut.x != snack1.x) {
                    scut.deleteBlock()
                    if (scut.x < snack1.x) {
                        scut.x++
                        scut.x++
                    }else{
                        scut.x--
                        scut.x--
                    }
                    scut.drawBlock()
                } else {
                    scut.deleteBlock()
                    scut.moveUp()
                    scut.drawBlock()   
                }
            },vitesse)

        break

        case 37:
            if (dirction == 'rigth') {break}
            window.clearInterval(snack1.interva)
            dirction = 'left'
            snack1.interva = window.setInterval(()=>{
                if (snack1.x < 4) {
                    window.clearInterval(snack1.interva)
                }
                collision()
                snack1.deleteBlock()
                snack1.moveLeft()
                snack1.drawBlock()
                if (scut.y != snack1.y) {
                    scut.deleteBlock()
                    if (scut.y < snack1.y) {
                        scut.y++
                    } else {
                        scut.y--
                    }
                    scut.drawBlock()
                } else {
                    scut.deleteBlock()
                    scut.moveLeft()
                    scut.drawBlock()   
                }
            },vitesse)
            
        break

        case 40:
            if (dirction == 'up') {break}
            window.clearInterval(snack1.interva)
            dirction = 'bottom'
            snack1.interva = window.setInterval(()=>{
                if (snack1.y + 7 > canvasHeight) {
                    window.clearInterval(snack1.interva)
                }
                collision()
                snack1.deleteBlock()
                snack1.moveBottom()
                snack1.drawBlock()

                if (scut.x != snack1.x) {
                    scut.deleteBlock()
                    if (scut.x < snack1.x) {
                        scut.x++
                        scut.x++
                    }else{
                        scut.x--
                        scut.x--
                    }
                    scut.drawBlock()
                }else{
                    scut.deleteBlock()
                    scut.moveBottom()
                    scut.drawBlock()
                }
            },vitesse)
        break
    }
})
snack1.drawBlock()
appel1.drawAppel()
