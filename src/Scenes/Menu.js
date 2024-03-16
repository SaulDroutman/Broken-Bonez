class Menu extends Phaser.Scene
{
    constructor(){
        super('MenuScene')
        console.log('MenuScene: constructor')

    }
    preload ()
    {
      
    }

    create ()
    {
        this.add.text(centerX-180, centerY-200, 'BROKEN BONEZ', { fontFamily: 'bonesFont',fontSize:'50px' })
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('PlayCopyScene') 
        }
    }
}