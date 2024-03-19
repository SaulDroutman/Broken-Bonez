//loading scene from paddle parkour
class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
        //console.log("Loading: constructor")

    }

    preload() {
        //console.log("Loading: preload")
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()                              // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1)               // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5)   // (x, y, w, h)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        this.load.path = './assets/'
        // load graphics assets
        this.load.spritesheet('Keys', 'img/KeySheet.png', {
            frameWidth: 32,
            frameHeight: 32,
        })

        this.load.spritesheet('bike', 'img/Bike.png', {
            frameWidth: 40,
            frameHeight: 40,
        })

        this.load.spritesheet('bikeBFlip', 'img/Bike_backflip.png', {
            frameWidth: 40,
            frameHeight: 40,
        })
        this.load.spritesheet('bikeFFlip', 'img/BikeFrontFlip.png', {
            frameWidth: 40,
            frameHeight: 40,
        })

        this.load.spritesheet('bikeTrick1', 'img/BikeTrick1.png', {
            frameWidth: 40,
            frameHeight: 40,
        })

        this.load.spritesheet('bikeTrick2', 'img/BikeTrick2.png', {
            frameWidth: 40,
            frameHeight: 40,
        })

        this.load.spritesheet('bikeTrick3', 'img/Biketrick3.png', {
            frameWidth: 40,
            frameHeight: 40,
        })


        this.load.spritesheet('bikeTrick4', 'img/Biketrick4.png', {
            frameWidth: 40,
            frameHeight: 40,
        })

        this.load.spritesheet('death', 'img/BikeDead.png', {
            frameWidth: 40,
            frameHeight: 40,
        })

        //load custom font
        //Font from https://www.1001fonts.com/cartoon-bones-font.html by  Galdino Otten
        this.loadFont("bonesFont", "assets/font/Cartoon_Bones.ttf");

 
        // load img assets
        this.load.image('leftArrow', 'img/leftArrow.png')
        this.load.image('rightArrow', 'img/rightArrow.png')
        this.load.image('upArrow', 'img/upArrow.png')
        this.load.image('downArrow', 'img/DownArrow.png')
        this.load.image('letterA', 'img/A.png')
        this.load.image('letterD', 'img/D.png')
        this.load.image('background', 'img/Background.png')
        this.load.image('floor', 'img/FLoor.png')
        this.load.image('jump', 'img/Jump.png')
        
        // load audio assets
        //music by Wayne John Bradley
        //"Wayne John Bradley - Grunge Rock Instrumental" is under a Creative Commons (CC-BY 3.0) license Music promoted by BreakingCopyright: https://bit.ly/b-grunge
        this.load.audio('song','/sound/song.mp3')

        //motorcycle sfx Sound fx Land https://www.youtube.com/watch?v=sruRnTtDq34&ab_channel=SoundfxLand
        this.load.audio('bikesfx','/sound/bikeSFX.mp3')

        this.load.audio('good','sound/powerup 16.wav')
        this.load.audio('bad','sound/explosion 21.wav')
        this.load.audio('crashsfx','sound/CrashSFX.mp3')
    }

    create() {

        this.scene.start('MenuScene')

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('bike', { frames: [ 0, 1 ] }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'backflip',
            frames: this.anims.generateFrameNumbers('bikeBFlip', { frames: [ 0, 1,2,3,0] }),
            frameRate: 2,
            repeat: 0
        })

        this.anims.create({
            key: 'frontflip',
            frames: this.anims.generateFrameNumbers('bikeFFlip', { frames: [ 0, 1,2,3,0] }),
            frameRate: 2,
            repeat: 0
        })

        this.anims.create({
            key: 'trick1',
            frames: this.anims.generateFrameNumbers('bikeTrick1', { frames: [ 0, 1,1,1,0] }),
            frameRate: 2,
            repeat: 0
        })

        this.anims.create({
            key: 'trick2',
            frames: this.anims.generateFrameNumbers('bikeTrick2', { frames: [ 0, 1,1,1,0] }),
            frameRate: 2,
            repeat: 0
        })

        this.anims.create({
            key: 'trick3',
            frames: this.anims.generateFrameNumbers('bikeTrick3', { frames: [ 0, 1,1,1,0] }),
            frameRate: 2,
            repeat: 0
        })

        this.anims.create({
            key: 'trick4',
            frames: this.anims.generateFrameNumbers('bikeTrick4', { frames: [ 0, 1,1,1,0] }),
            frameRate: 2,
            repeat: 0
        })

        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('death', { frames: [ 0, 1,2,3,3,3,3,3] }),
            frameRate: 2,
            repeat: 0
        })
        
        
        
    }

    //loadFont function from Nanoo on https://stackoverflow.com/questions/51217147/how-to-use-a-local-font-in-phaser-3
     loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }
}