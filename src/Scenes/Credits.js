class Credits extends Phaser.Scene
{
    
    constructor(){
        super('CreditScene')
        //console.log('GameOverScene: constructor')
       

    }

    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(centerX, centerY-200, 'Credits', { fontFamily: 'bonesFont',fontSize:'60px' }).setOrigin(.5)
        
        this.add.text(centerX, centerY-100, "Inspired by broken bonez from 'Regular Show' Season Two episode 'High Score' ", { fontFamily: 'Courier',fontSize:'13px' }).setOrigin(.5)
        this.add.text(centerX, centerY-50, "Code & Art by: Saul Droutman", { fontFamily: 'Courier',fontSize:'25px' }).setOrigin(.5)
        this.add.text(centerX, centerY, "Music by: Wayne John Bradley", { fontFamily: 'Courier',fontSize:'20px' }).setOrigin(.5)
        this.add.text(centerX, centerY+40, "Bone font by: Galdino Otten", { fontFamily: 'Courier',fontSize:'20px' }).setOrigin(.5)
        this.add.text(centerX, centerY+70, "bike sfx by: Sound fx Land on Youtube &", { fontFamily: 'Courier',fontSize:'20px' }).setOrigin(.5)
        this.add.text(centerX, centerY+100, "crash sfx by: SYMPHONY SOUND EFFECTS Land on Youtube &", { fontFamily: 'Courier',fontSize:'18px' }).setOrigin(.5)

        this.add.text(centerX, centerY+200, "Spacebar to return to menu", { fontFamily: 'Courier',fontSize:'15px' }).setOrigin(.5)


    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('MenuScene') 
        }
    }

}

