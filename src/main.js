let config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    render:{
      pixelArt: true
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
      }
    },
    scene:[Load,Menu,Play,GameOver]
  }
let game = new Phaser.Game(config)

//setting global variables

let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height
let minComboSize =3
let comboSize
let maxComboSize =12
let timeLeft
let timer
let wrongKeyTween 
let lives
let score
let highScore=[0,0,0,0,0]
let wheel1, wheel2

let keyA, keyD, keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE




//Phaser major components used:
//Timer (looped events)
//KeyCodes (combo for getting tricks)
//Tweens (turning arrows colors when right or wrong)
//Camera (scene transitions)
//Animation manager (chaning arrows, biker tricks)