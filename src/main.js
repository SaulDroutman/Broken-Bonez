let config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    backgroundColor: '0x202020',
    render:{
      pixelArt: true
    },
    physics: {
      default: 'arcade',
      arcade: {
        //gravity: { y: 100 * 3 },
        debug: false
      },
    },
    matter: {
      debug: true,
      gravity: { y: 0.5 }

    },
    autoCenter: true,
    scene:[Load,Menu,Tutorial,Play,Credits,GameOver]
  }
let game = new Phaser.Game(config)

//setting global variables

let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height
let minComboSize =3
let maxComboSize =16
let levelTween,wrongKeyTween, rightKeyTween,timer,lives,timeLeft,comboSize,score
let highScore=[0,0,0,0,0]
let onGround =true

//all key defs
let keyA, keyD, keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE

//list of all tricks for random selection
let listOfTricks=['backflip','trick1','trick2','frontflip','trick3','trick4']




//Phaser major components used:
//Timer for score & level progression
//KeyCodes (combo for getting tricks)
//Tweens (turning arrows colors when right or wrong)
//Camera (scene transitions) and bike tracking
//Animation manager (Bike tricks )
//tilemap for moving background
//physics system for bike movement
//text objects with custom font 

//really proud of the way I turned what was in the show as a button masher to a quick time event game using the keycodes
//although i had to pivot from my original I am really happy with my final product