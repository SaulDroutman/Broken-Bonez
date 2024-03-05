let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene:[Menu,Play]
  }
let game = new Phaser.Game(config)

//setting global variables

let keyA, keyD, keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE

let highScore =0
