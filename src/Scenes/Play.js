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

        this.add.image(centerX,centerY,'background').setScale(100)
        this.ground=this.physics.add.image(centerX,centerY*2.4,'floor').setScale(2)
        this.jump=this.physics.add.image(500,centerY+105,'jump').setScale(2)
        this.jump.setImmovable()
        this.ground.setImmovable()
        this.currentPosition=0
        score=0
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
        //for working on game over screen
        lives=10
        //lives=5

        this.bike = new Bike (this,0,250,'bike').setOrigin(0.5, 0).setScale(2)

        //camera settings
        this.cameras.main.startFollow(this.bike);
        this.cameras.main.setZoom(.7);
        this.cameras.main.setFollowOffset(-300,200)
        
        //physics coliders
        this.physics.add.collider(this.bike, this.ground,()=> {
            onGround=true
        })
        this.bike.setVelocity(200,0)
        this.bike.body.onOverlap = true
        this.physics.add.overlap(this.bike, this.jump)

        this.physics.world.on('overlap', (gameObject1, gameObject2, body1, body2) =>
        {
            body1.velocity.y = -500
            onGround=false
        });

        
        this.combo=this.createMyCombo(comboSize)
        this.arrow=this.add.image(centerX,centerY,'Keys').setScale(5)
        this.arrow.setAlpha(0)

        timer = this.time.addEvent({
            delay: timeLeft,                // ms
            callback: this.timerFunc,
            //args: [],
            callbackScope: this,
            loop: true,
            paused:true
        });

        //correct or wrong key pressed
        //currently buggy
        this.input.keyboard.on('keydown', event =>
        {
            console.log("keydownevent")
            console.log(this.combo.index)
            console.log(this.currentPosition)
            if(this.currentPosition == this.combo.index){
                console.log("dummy dummy")
                score-=20
                if(!this.tweenPlaying){
                    this.wrongKeyTween(this.arrow)
                    
                }
            }
            else{
                this.currentPosition = this.combo.index
                //this.currentPosition++
                console.log("you got it!!")
                score+=20
                if(!this.tweenPlaying){
                    this.rightKeyTween(this.arrow)
                    
                    //add level multiplier and no mistakes multiplier
                }
            }

        });
        //this.bike.setVelocity(10)    
    }

    update(){
        if(!onGround){
            timer.paused=false

        }
        //show timer
        this.timeText.setText(`Event.progress: ${timer.getRemainingSeconds().toString().substr(0, 4)}`);
        
        //move timer
        this.timeText.x = this.bike.body.position.x;  
        this.timeText.y = this.bike.body.position.y -100; 
        //move arrow 
        this.arrow.x = this.bike.body.position.x+centerX;  
        this.arrow.y = this.bike.body.position.y -300  

        //if combo entered make new one
        if(this.codeEntered==true){
            this.currentPosition=-0
            console.log("combo entered")
            this.combo=this.createMyCombo(comboSize)
            
            
        }
        
        if(!onGround){
            this.arrow.setAlpha(1)
        }
        else{
            this.arrow.setAlpha(0)
        }

        //end game
        if(lives==0){
            this.lose()
        }

        //keep wheels centered
        this.centerBodyOnXY(wheel1.body, this.bike.body.x + 67, this.bike.body.y + 30);
        this.centerBodyOnXY(wheel2.body, this.bike.body.x +13, this.bike.body.y + 30);
        //this.centerBodyOnXY(this.arrow.body, this.bike.body.x+centerX, this.bike.body.y -300);
          

    }

    
    displayCurrentKey(arrow,combo){
        let current = combo.current
    
        if(current ==37 && !this.tweenPlaying){
        
            arrow.setTexture('Keys',4)

        }else if(current==38 && !this.tweenPlaying){

            arrow.setTexture('Keys',3)
        }
        else if(current==39 && !this.tweenPlaying){
           
        arrow.setTexture('Keys',2)

        }
        else if(current==40 && !this.tweenPlaying){   
            
            arrow.setTexture('Keys',5)

        }
        else if(current == 65 && !this.tweenPlaying){
            
            // if(Phaser.Input.Keyboard.JustDown(keyA)){
            //     console.log("rightKey")
            //     this.rightKeyTween(arrow)

            // }
            // else if(Phaser.Input.Keyboard.JustDown(keyRIGHT )|| Phaser.Input.Keyboard.JustDown(keyDOWN)||Phaser.Input.Keyboard.JustDown(keyUP)||Phaser.Input.Keyboard.JustDown(keyLEFT)||Phaser.Input.Keyboard.JustDown(keyD)){
            //     console.log("wrongKey")

            //     this.wrongKeyTween(arrow)
            // }
          
            arrow.setTexture('Keys',0)
        }
        else if(current == 68 && !this.tweenPlaying) {
            //  if(Phaser.Input.Keyboard.JustDown(keyD)){
            //     console.log("rightKey")
            //     this.rightKeyTween(arrow)

            // }
            // else if(Phaser.Input.Keyboard.JustDown(keyRIGHT )|| Phaser.Input.Keyboard.JustDown(keyDOWN)||Phaser.Input.Keyboard.JustDown(keyUP)||Phaser.Input.Keyboard.JustDown(keyA)||Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //     console.log("wrongKey")

            //     this.wrongKeyTween(arrow)
            // }


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
        //add in delete old key, create new key
        console.log("combo expired")
        lives-=1
        console.log('Bones Left: %d',lives)

        

    }

    wrongKeyTween(object){
        console.log("in wrong tween func")
        wrongKeyTween = this.tweens.add({
            targets: object,
            alpha:1,
            ease: 'Sine.easeIn',
            duration: 200,
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
        console.log("in right tween func")
        wrongKeyTween = this.tweens.add({
            targets: object,
            alpha:1,
            ease: 'Sine.easeIn',
            duration: 200,
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
        this.scene.start('GameOverScene')
    }

    //idk if i need these  Compound bodies in Arcade Physics from https://codepen.io/samme/pen/ExYGRyo?editors=0010

    centerBodyOnBody (a, b) {
        a.position.set(
          b.x + b.halfWidth - a.halfWidth,
          b.y + b.halfHeight - a.halfHeight
        );
      }
      
       centerBodyOnPoint (a, p) {
        centerBodyOnXY(a, p.x, p.y);
      }
      
       centerBodyOnXY (a, x, y) {
        a.position.set(
          x - a.halfWidth,
          y - a.halfHeight
        );
      }

   

}