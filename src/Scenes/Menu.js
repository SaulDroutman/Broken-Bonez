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
        console.log('MenuScene: create')
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('PlayScene') 
        }
    }
}