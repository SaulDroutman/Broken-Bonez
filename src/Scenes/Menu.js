class Menu extends Phaser.Scene
{
    constructor(){
        super('MenuScene')
        //console.log('MenuScene: constructor')

    }
    preload ()
    {
      
    }

    create ()
    {
        this.add.text(centerX, centerY-150, 'BROKEN \n BONEZ', { fontFamily: 'bonesFont',fontSize:'70px' }).setOrigin(.5)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.c = this.input.keyboard.addKey(67);

        this.music=this.sound.add('song', {volume: 0.1})
        this.music.play()
        this.music.loop=true
        
        this.add.text(centerX, centerY, 'Press space bar to play!', { fontFamily: 'Courier',fontSize:'40px' }).setOrigin(.5)
        this.add.text(centerX, centerY+100, 'C for credits', { fontFamily: 'Courier',fontSize:'20px' }).setOrigin(.5)

        this.add.image(centerX+180,centerY+80,'bike').setScale(5).setAngle(-15)
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('TutorialScene') 
            this.music.stop()
        }

        if(Phaser.Input.Keyboard.JustDown(this.c)){
            this.scene.start('CreditScene')
            this.music.stop()
        }
    }
}