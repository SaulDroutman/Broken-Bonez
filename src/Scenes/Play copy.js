class PlayCopy extends Phaser.Scene
{
    
    constructor(){
        super('PlayCopyScene')
       

    }

    preload ()
    {
       
    }

    create ()
    {   

        this.add.image(centerX,centerY,'background').setScale(100)
        this.ground=this.physics.add.image(centerX,centerY*2.4,'floor').setScale(4,2)
        this.jump=this.physics.add.image(500,centerY+105,'jump').setScale(2)
        this.jump.setImmovable()
        this.ground.setImmovable()
        this.currentPosition=0
        score=0
        this.tweenPlaying=false
        this.codeEntered =true
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

        this.comboText=this.add.text(centerX-180, centerY-200, '', { fontFamily: 'bonesFont',fontSize:'50px' })

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
        this.comboIndex=this.combo.index
        //console.log("FIRST Combo created; length: %d, current index: %d",this.combo.size,this.combo.index)
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
            //console.log("keydownevent")

            if(this.currentPosition == this.comboIndex ||(this.currentPosition ==0 && this.comboIndex==0)){
                console.log("looking for: %d",this.comboIndex)
                console.log("you are on: %d",this.currentPosition)
                score-=20
                if(!this.tweenPlaying){
                    this.wrongKeyTween(this.arrow)
                    
                }
            }
            else{
                console.log("looking for: %d",this.comboIndex)
                console.log("you are on: %d",this.currentPosition)
                this.currentPosition = this.comboIndex
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

        //move Combo Text 
        //this.arrow.x = this.bike.body.position.x+centerX;  
        //this.arrow.y = this.bike.body.position.y -300  

        //if combo entered make new one
        if(this.codeEntered==true){
            this.currentPosition=0
            console.log("combo entered")
            this.combo=this.createMyCombo(comboSize)
            console.log("NEW Combo; length: %d, current index: %d, this.comboIndex: %d",this.combo.size,this.combo.index,this.comboIndex)
            
        }     
        if(!onGround){
            this.arrow.setAlpha(1)
        }
        else{
            this.arrow.setAlpha(0)
        }


        //keep ground in front of player
        if(this.ground.x<this.bike.body.position.x+200){
            this.ground.x=this.ground.x+400
        }
        if(this.jump.x<this.bike.body.position.x+200 && this.jump.y>this.bike.body.position.y+200){
            this.jump.x=this.jump.x+600
        }

        //end game
        if(lives==0){
            this.lose()
        }

        //keep wheels centered
        this.centerBodyOnXY(wheel1.body, this.bike.body.x + 67, this.bike.body.y + 30);
        this.centerBodyOnXY(wheel2.body, this.bike.body.x +13, this.bike.body.y + 30);
        this.displayCurrentKey(this.arrow,this.combo)

    }

    convertCombo(combo){
        //  65 = A
        //  68 = D
        //  37 = LEFT
        //  38 = UP
        //  39 = RIGHT
        //  40 = DOWN
        let string
        let count=0
        console.log(combo.keyCodes[0])
        while(count<combo.length){
    
            if(combo.keyCodes[x]  ==37 ){
                console.log("in 37")
            
                string.concat("L")
    
            }else if(combo.keyCodes[x]  ==38 ){
                console.log("in 38")
            
                string.concat("U")
    
            }
            else if(combo.keyCodes[x]  ==39 ){
                console.log("in 39")
                string.concat("R")
    
            }
            else if(combo.keyCodes[x]  ==40 ){
                console.log("in 40")
                string.concat("D")
    
            }
            else if(combo.keyCodes[x]  ==65 ){
                console.log("in 65")
                string.concat("A")
    
            }
            else if(combo.keyCodes[x]  ==68 ){
                console.log("in 68")
                string.concat("D")
    
            }
            count++
        }
        
        console.log(string)
        return string
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
            
           
          
            arrow.setTexture('Keys',0)
        }
        else if(current == 68 && !this.tweenPlaying) {
        

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
        //console.log(product)
        return product;
    }

    createMyCombo(length){
        //debugger
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
        //console.log("combo expired")
        lives-=1
        console.log('Bones Left: %d',lives)

        

    }

    wrongKeyTween(object){
        wrongKeyTween = this.tweens.add({
            targets: object,
            alpha:1,
            ease: 'Sine.easeIn',
            duration: 200,
            repeat: 0,
            onStart: () => {
                object.setTint(0xff0000)
                this.tweenPlaying =true
            },
            onComplete: () => {
                object.setTint(0xffffff)
                this.tweenPlaying =false           
             }
        })

    }

    rightKeyTween(object){
        wrongKeyTween = this.tweens.add({
            targets: object,
            alpha:1,
            ease: 'Sine.easeIn',
            duration: 200,
            repeat: 0,
            onStart: () => {
                object.setTint(0x00ff00)
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