//loading scene from paddle parkour
class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
        console.log("Loading: constructor")

    }

    preload() {
        console.log("Loading: preload")
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
        
        // load audio assets

        //console.log("LOAD.js || PRELOAD")
    }

    create() {

        this.scene.start('MenuScene')
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