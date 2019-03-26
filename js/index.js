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
    deleteBlock(){
        ctx.clearRect(this.x - 2, this.y - 2, 2 * 2 + 2 , 2 * 2 + 2)
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
let vitesse = 15
let dirction  = ''

/**
 * init pour un premier affichage
 */
let snack1 = new Snack(50,15)
let appel1 = new Appel(45,65)
let scut = [new ScutSnack(38,15, snack1.x, snack1.y), new ScutSnack(26,15, snack1.x, snack1.y)]

scut[0].drawBlock()
scut[1].drawBlock()

/**
 * fonction pour la détection de collision
 * 
 */
let inter = setInterval(collision,vitesse)
function collision(){
    if (snack1.x < appel1.x + 2 && snack1.x + snack1.width > appel1.x - 2 && snack1.y < appel1.y + 4 && snack1.height + snack1.y > appel1.y){
        scor++
        let randomX = Math.floor(Math.random() * canvasWidth)
        let randomY = Math.floor(Math.random() * canvasHeight)
        
        switch (dirction) {
            case 'left':
                scut.push(new ScutSnack(scut[scut.length - 1].x + 12, scut[scut.length - 1].y, snack1.x, snack1.y))
                appel1.deleteBlock()
                appel1 = new Appel(randomX, randomY)
                appel1.drawAppel()
            case 'rigth':
                scut.push(new ScutSnack(scut[scut.length - 1].x - 12, scut[scut.length - 1].y, snack1.x, snack1.y))
                appel1.deleteBlock()
                appel1 = new Appel(randomX, randomY)
                appel1.drawAppel()
            break;
            case 'bottom':
                scut.push(new ScutSnack(scut[scut.length - 1].x, scut[scut.length - 1].y - 6, snack1.x, snack1.y))
                appel1.deleteBlock()
                appel1 = new Appel(randomX, randomY)
                appel1.drawAppel()
            break;
            case 'up':
                scut.push(new ScutSnack(scut[scut.length - 1].x, scut[scut.length - 1].y + 6, snack1.x, snack1.y))
                appel1.deleteBlock()
                appel1 = new Appel(randomX, randomY)
                appel1.drawAppel()
            break;
        }
        clearInterval(inter)//bodouage pour que la fonction soit appeller une seul fois :(
        setTimeout(()=>{
            inter = setInterval(collision, vitesse)
        },1000)
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
            window.clearInterval(snack1.interva)// pour eviter les multiplier les setinterval
            dirction = 'rigth'
            snack1.interva = window.setInterval(()=>{
                if (snack1.x + 14 > canvasWidth) {//la tete du serpent est au bord de la canvas 
                    window.clearInterval(snack1.interva)
                }
                snack1.deleteBlock()
                snack1.moveRigth()
                snack1.drawBlock()
                for (let i = 0; i < scut.length; i++) {
                    if (scut[i].y != snack1.y) {
                        scut[i].deleteBlock()
                        if (scut[i].y < snack1.y) {
                            scut[i].y++
                        } else {
                            scut[i].y--
                        }
                        scut[i].drawBlock()
                    }else{
                        scut[i].deleteBlock()
                        scut[i].moveRigth()
                        scut[i].drawBlock()
                    } 
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
                snack1.deleteBlock()
                snack1.moveUp()
                snack1.drawBlock()
                for (let i = 0; i < scut.length; i++) {
                    if (scut[i].x != snack1.x) {
                        scut[i].deleteBlock()
                        if (scut[i].x < snack1.x) {
                            scut[i].x++
                            scut[i].x++
                        }else{
                            scut[i].x--
                            scut[i].x--
                        }
                        scut[i].drawBlock()
                    } else {
                        scut[i].deleteBlock()
                        scut[i].moveUp()
                        scut[i].drawBlock()   
                    }   
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
                snack1.deleteBlock()
                snack1.moveLeft()
                snack1.drawBlock()
                for (let i = 0; i < scut.length; i++) {
                    if (scut[i].y != snack1.y) {
                        scut[i].deleteBlock()
                        if (scut[i].y < snack1.y) {
                            scut[i].y++
                        } else {
                            scut[i].y--
                        }
                        scut[i].drawBlock()
                    } else {
                        scut[i].deleteBlock()
                        scut[i].moveLeft()
                        scut[i].drawBlock()   
                    }
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
                snack1.deleteBlock()
                snack1.moveBottom()
                snack1.drawBlock()
                for (let i = 0; i < scut.length; i++) {
                    if (scut[i].x != snack1.x) {
                        scut[i].deleteBlock()
                        if (scut[i].x < snack1.x) {
                            scut[i].x++
                            scut[i].x++
                        }else{
                            scut[i].x--
                            scut[i].x--
                        }
                        scut[i].drawBlock()
                    }else{
                        scut[i].deleteBlock()
                        scut[i].moveBottom()
                        scut[i].drawBlock()
                    }
                }
            },vitesse)
        break
    }
})
snack1.drawBlock()
appel1.drawAppel()
