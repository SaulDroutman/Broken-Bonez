class Tutorial extends Phaser.Scene
{
    
    constructor(){
        super('TutorialScene')
        //console.log('GameOverScene: constructor')
       

    }

    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(centerX, centerY-200, 'How to Play', { fontFamily: 'bonesFont',fontSize:'60px' }).setOrigin(.5)
        
        this.add.text(centerX, centerY-50, "Match the given code using arrow keys, A, & D while in the air", { fontFamily: 'Courier',fontSize:'17px' }).setOrigin(.5)
        this.add.text(centerX, centerY, "Be quick and make sure not to break all 5 bones!", { fontFamily: 'Courier',fontSize:'17px' }).setOrigin(.5)

       
        this.add.text(centerX, centerY+200, "Spacebar to start", { fontFamily: 'Courier',fontSize:'20px' }).setOrigin(.5)


    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('PlayScene') 
        }
    }

}

