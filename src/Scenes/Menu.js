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
        this.music=this.sound.add('song', {volume: 0.1})
        this.music.play()
        this.music.loop=true
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('PlayScene') 
            this.music.stop()
        }
    }
}