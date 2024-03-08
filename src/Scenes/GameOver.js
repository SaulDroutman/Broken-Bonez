class GameOver extends Phaser.Scene
{
    
    constructor(){
        super('GameOverScene')
        console.log('GameOverScene: constructor')
       

    }

    create(){
        this.add.text(centerX, centerY, 'GAME OVER', { fontFamily: 'bonesFont',fontSize:'40px' })
        this.highScoreCheck()
        this.printScore()
        highScore.sort((a, b) => b - a)
        


    }

    highScoreCheck(){
        if(highScore.length<5){
            highScore.push(score)
        }
        else{
            for (let i = 0; i<highScore.length;i++){
                
                if(highScore[i]<score){
                    highScore.pop()
                    highScore.push(score)
                    highScore.sort((a, b) => b - a)
                    return
                }

            }
        }
    }

    //change this
    printScore(){
        for (let i = 0; i<highScore.length;i++){
                console.log(highScore[i])
        }

    }

}

