class Play extends Phaser.Scene
{
    
    constructor(){
        super('PlayScene')
        console.log('PlayScene: constructor')
       

    }

    preload ()
    {
       
    }

    create ()
    {
        this.tweenPlaying=false
        this.codeEntered =false
        this.timeText = this.add.text(32, 32);
        comboSize =minComboSize
        timeLeft =4000
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        lives=2


        console.log('PlayScene: create')
        this.combo=this.createMyCombo(comboSize)
        this.arrow=this.add.image(centerX,centerY,'Keys').setScale(10)

        //this.timer = this.timedEvent = this.time.delayedCall(timeLeft, this.timerFunc, [], this,{loop:true});
        timer = this.time.addEvent({
            delay: timeLeft,                // ms
            callback: this.timerFunc,
            //args: [],
            callbackScope: this,
            loop: true
        });

        

       

        
    }

    update(){
        this.timeText.setText(`Event.progress: ${timer.getRemainingSeconds().toString().substr(0, 4)}`);
        if(this.combo.enabled==false){
            console.log("combo expired")
        }
        if(this.codeEntered==true){
            this.combo=this.createMyCombo(comboSize)
            
        }
        
        this.displayCurrentKey(this.arrow,this.combo)

        //logically this should be lives==0
        if(lives==1){
            this.lose()
        }

    }

    

    
    displayCurrentKey(arrow,combo){
        let current = combo.current
    
        if(current ==37 && !this.tweenPlaying){
            if(Phaser.Input.Keyboard.JustDown(keyRIGHT )|| Phaser.Input.Keyboard.JustDown(keyDOWN)||Phaser.Input.Keyboard.JustDown(keyUP)||Phaser.Input.Keyboard.JustDown(keyA)||Phaser.Input.Keyboard.JustDown(keyD)){
                console.log("wrongKey")

                this.wrongKeyTween(arrow)
            }
            else if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
                console.log("rightKey")
                this.rightKeyTween(arrow)

            }
            arrow.setTexture('Keys',4)

        }else if(current==38 && !this.tweenPlaying){
            if(Phaser.Input.Keyboard.JustDown(keyRIGHT )|| Phaser.Input.Keyboard.JustDown(keyDOWN)||Phaser.Input.Keyboard.JustDown(keyLEFT)||Phaser.Input.Keyboard.JustDown(keyA)||Phaser.Input.Keyboard.JustDown(keyD)){
                console.log("wrongKey")

                this.wrongKeyTween(arrow)
            }
            else if(Phaser.Input.Keyboard.JustDown(keyUP)){
                console.log("rightKey")
                this.rightKeyTween(arrow)

            }
            arrow.setTexture('Keys',3)
        }
        else if(current==39 && !this.tweenPlaying){
            if(Phaser.Input.Keyboard.JustDown(keyLEFT )|| Phaser.Input.Keyboard.JustDown(keyDOWN)||Phaser.Input.Keyboard.JustDown(keyUP)||Phaser.Input.Keyboard.JustDown(keyA)||Phaser.Input.Keyboard.JustDown(keyD)){
                console.log("wrongKey")

                this.wrongKeyTween(arrow)
            }
            else if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                console.log("rightKey")
                this.rightKeyTween(arrow)

            }
           
        arrow.setTexture('Keys',2)

        }
        else if(current==40 && !this.tweenPlaying){
            if(Phaser.Input.Keyboard.JustDown(keyRIGHT )|| Phaser.Input.Keyboard.JustDown(keyLEFT)||Phaser.Input.Keyboard.JustDown(keyUP)||Phaser.Input.Keyboard.JustDown(keyA)||Phaser.Input.Keyboard.JustDown(keyD)){
                console.log("wrongKey")

                this.wrongKeyTween(arrow)
            }
            else if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
                console.log("rightKey")
                this.rightKeyTween(arrow)

            }
            
            arrow.setTexture('Keys',5)

        }
        else if(current == 65 && !this.tweenPlaying){
            if(Phaser.Input.Keyboard.JustDown(keyRIGHT )|| Phaser.Input.Keyboard.JustDown(keyDOWN)||Phaser.Input.Keyboard.JustDown(keyUP)||Phaser.Input.Keyboard.JustDown(keyLEFT)||Phaser.Input.Keyboard.JustDown(keyD)){
                console.log("wrongKey")

                this.wrongKeyTween(arrow)
            }
            else if(Phaser.Input.Keyboard.JustDown(keyA)){
                console.log("rightKey")
                this.rightKeyTween(arrow)

            }
          
            arrow.setTexture('Keys',0)
        }
        else if(current == 68 && !this.tweenPlaying) {
            if(Phaser.Input.Keyboard.JustDown(keyRIGHT )|| Phaser.Input.Keyboard.JustDown(keyDOWN)||Phaser.Input.Keyboard.JustDown(keyUP)||Phaser.Input.Keyboard.JustDown(keyA)||Phaser.Input.Keyboard.JustDown(keyLEFT)){
                console.log("wrongKey")

                //this.wrongKeyTween(arrow)
            }
            else if(Phaser.Input.Keyboard.JustDown(keyD)){
                console.log("rightKey")
                this.rightKeyTween(arrow)

            }

            arrow.setTexture('Keys',1)
        }
    
    }

    createCode(length){
        //  65 = A
        //  68 = D
        //  37 = LEFT
        //  38 = UP
        //  39 = RIGHT
        //  40 = DOWN
        let chars=[37,38,39,40,65,68]
        let count=0
        let product=[]
        while (count<length){
            let num= Math.floor((Math.random()*100) %6 )
            product.push(chars[num])
            count++
        }
        return product;
    }

    createMyCombo(length){
        this.code=this.createCode(length)
        //this.printCombo(this.code)
        this.combo=this.input.keyboard.createCombo(this.code,{resetOnWrongKey: false},{deleteOnMatch:true})
        this.codeEntered =false
        this.input.keyboard.on('keycombomatch', event =>
    {

        this.codeEntered =true
        timer.reset({
            delay: timeLeft,                // ms
            callback: this.timerFunc,
            args: [],
            callbackScope: this,
            loop: true,
            repeat: 0,
            startAt: 0,
            timeScale: 1,
            paused: false
        })
        
        this.time.addEvent(timer)
        console.log('COMBO ENTERED')

    });
    return this.combo;
    }

    printCombo(combo){
       //console.log("NEW COMBO:")
        let count=0
        while(count<combo.length){
            console.log(combo[count])
            count++
        }
    }

    timerFunc(){
        //delete old key, create new key
        console.log("timer went off")
        lives-=1
        console.log('Bones Left: %d',lives)

        

    }

    wrongKeyTween(object){
        console.log("in tween func")
        wrongKeyTween = this.tweens.add({
            targets: object,
            alpha:1,
            ease: 'Sine.easeIn',
            duration: 1000,
            //paused:false,
            repeat: 0,
            onStart: () => {
                object.setTint(0xff0000)
                console.log("in tween")
                this.tweenPlaying =true
            },
            onComplete: () => {
                object.setTint(0xffffff)
                this.tweenPlaying =false           
             }
        })

    }

    rightKeyTween(object){
        console.log("in tween func")
        wrongKeyTween = this.tweens.add({
            targets: object,
            alpha:1,
            ease: 'Sine.easeIn',
            duration: 1000,
            //paused:false,
            repeat: 0,
            onStart: () => {
                object.setTint(0x00ff00)
                console.log("in tween")
                this.tweenPlaying =true
            },
            onComplete: () => {
                object.setTint(0xffffff)
                this.tweenPlaying =false
                        
            }
        })

    }

    lose(){
        this.cameras.main.fadeOut(200);
    }

}