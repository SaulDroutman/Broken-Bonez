class Play extends Phaser.Scene
{
    
    constructor(){
        super('PlayScene')
       

    }

    preload ()
    {
       
    }

    create ()
    {   

        this.justJumped=false;
        this.add.image(centerX,centerY,'background').setScale(100)
        this.ground=this.physics.add.image(centerX,centerY*2.4,'floor').setScale(4,2)
        this.jump=this.physics.add.image(500,centerY+105,'jump').setScale(2)
        this.jump.setImmovable()
        this.ground.setImmovable()
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
        lives=5
        //for working on game over screen
      
        //display combo
        
        this.combo
        this.convertedcombo
        this.comboText=this.add.text(centerX-180, centerY-200, this.convertedcombo, { fontFamily: 'bonesFont',fontSize:'50px' })
        
        //display lives
        this.livesText=this.add.text(w, h, "", { fontFamily: 'bonesFont',fontSize:'70px',backgroundColor:"ffffff" })
        this.makelivesText(this.livesText)
        //player and physics 
        this.bike = new Bike (this,0,250,'bike').setOrigin(0.5, 0).setScale(2)
        
        //camera settings
        this.cameras.main.startFollow(this.bike);
        this.cameras.main.setZoom(.7);
        this.cameras.main.setFollowOffset(-300,200)
        
        //physics coliders
        this.physics.add.collider(this.bike, this.ground,()=> {
            onGround=true
            if(this.justJumped==true&&this.codeEntered==false){
                this.wrongKeyTween(this.comboText)
                lives-=1
                this.makelivesText(this.livesText)
                this.justJumped=false
                console.log("lost a life you have %d bones",lives)

            }
        })
        this.bike.setVelocity(200,0)
        this.bike.body.onOverlap = true
        this.physics.add.overlap(this.bike, this.jump)

        this.physics.world.on('overlap', (gameObject1, gameObject2, body1, body2) =>
        {   
            if(onGround){
            //create new combo once you hit a jump
            this.comboText.setAlpha(1)
            this.combo=this.createMyCombo(comboSize)
            this.convertedCombo=this.convertCombo()
            console.log(this.convertedCombo)
            this.comboText.text=this.convertedCombo
            

            }
            this.justJumped=true
            body1.velocity.y = -500
            onGround=false


        });


        //timer for score work on later
        timer = this.time.addEvent({
            delay: timeLeft,                // ms
            callback: this.timerFunc,
            //args: [],
            callbackScope: this,
            loop: true,
            paused:true
        });

    }

    update(){
        //this.comboIndex=this.combo.index

        

        
        
         //keep ground in front of player
         if(this.ground.x<this.bike.body.position.x+200){
            this.ground.x=this.ground.x+400
        }
        if(this.jump.x<this.bike.body.position.x+200 && this.jump.y>this.bike.body.position.y+200){
            this.jump.x=this.jump.x+600
        }

        //move Combo Text 
        this.comboText.x = this.bike.body.position.x+centerX-70;  
        this.comboText.y = this.bike.body.position.y -300   

        //move lives text 
        this.livesText.x = this.bike.body.position.x+w-100;  
        this.livesText.y = this.bike.body.position.y -h -100   

        //end game
        if(lives==0){
            this.lose()
        }
   
    }

    convertCombo(){
        //  65 = A
        //  68 = D
        //  37 = LEFT
        //  38 = UP
        //  39 = RIGHT
        //  40 = DOWN
        this.string=""
        this.count=0

        while(this.count<this.combo.size){
            
            if(this.combo.keyCodes[this.count] == 37 ){
            
                this.string=this.string +"\u2190"
    
            }else if(this.combo.keyCodes[this.count]  ==38 ){
                console.log("in 38")
            
                this.string=this.string +"\u2191"
    
            }
            else if(this.combo.keyCodes[this.count]  ==39 ){
                console.log("in 39")
                this.string=this.string +"\u2192"
    
            }
            else if(this.combo.keyCodes[this.count]  ==40 ){
                console.log("in 40")
                this.string=this.string +"\u2193"
    
            }
            else if(this.combo.keyCodes[this.count]  ==65 ){
                console.log("in 65")
                this.string=this.string +"A"
    
            }
            else if(this.combo.keyCodes[this.count]  ==68 ){
                console.log("in 68")
                this.string=this.string +"D"
    
            }
            this.count++
        }
        
        //console.log(this.string)
        return this.string
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
        this.combo=this.input.keyboard.createCombo(this.code,{resetOnWrongKey: true},{deleteOnMatch:true})
        this.codeEntered =false
        this.input.keyboard.on('keycombomatch', event =>
        {
            this.rightKeyTween(this.comboText)
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
        console.log(this.code)
        return this.combo;
    }



    timerFunc(){
        //add in delete old key, create new key
        //console.log("combo expired")
        //lives-=1
        //console.log('Bones Left: %d',lives)

        

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

   //tweens

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
            object.setAlpha(0)
            this.tweenPlaying =false
                    
        }
    })

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
            object.setAlpha(0)        
         }
    })

}

makelivesText(text){
    text.text=""
    console.log("inmake lives with %d luives",lives)
    for(let x=0;x<lives;x++){
        text.text=text.text+"X"
    }
}

}
