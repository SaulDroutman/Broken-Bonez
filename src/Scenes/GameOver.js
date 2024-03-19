class GameOver extends Phaser.Scene
{
    
    constructor(){
        super('GameOverScene')
        //console.log('GameOverScene: constructor')
       

    }

    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(centerX, centerY-200, 'GAME OVER', { fontFamily: 'bonesFont',fontSize:'60px' }).setOrigin(.5)
        this.highScoreCheck()
        highScore.sort((a, b) => b - a)
        this.printScore()
        this.add.text(centerX, centerY-150, "High scores:", { fontFamily: 'bonesFont',fontSize:'30px' }).setOrigin(.5)
        this.add.text(centerX, centerY, highScore, { fontFamily: 'Courier',fontSize:'40px' }).setOrigin(.5)

        this.add.text(centerX, centerY+200, 'Spacebar to play again or M for menu', { fontFamily: 'Courier',fontSize:'20px' }).setOrigin(.5)

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('PlayScene') 
        }
    }

    highScoreCheck(){

            for (let i = 0; i<highScore.length;i++){
                
                if(highScore[i]<score){
                    highScore.pop()
                    highScore.push(score)
                    highScore.sort((a, b) => b - a)
                    return
                }

            }
        
    }

    //change this
    printScore(){
        for (let i = 0; i<highScore.length;i++){
                //console.log(highScore[i])
        }

    }

}

