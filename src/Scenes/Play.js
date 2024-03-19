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

        this.level=1
        this.justJumped=false;
        this.background=this.add.image(centerX,centerY,'background').setScale(100)
        this.ground=this.physics.add.image(centerX,centerY*2.4,'floor').setScale(4,2)
        this.jump=this.physics.add.image(500,centerY+105,'jump').setScale(2)
        this.jump.setImmovable()
        this.ground.setImmovable()
        score=0
        this.tweenPlaying=false
        this.codeEntered =false
        this.timeText = this.add.text(32, 32);
        comboSize =minComboSize
        timeLeft =12000
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        lives=5
        
        this.levelText= this.add.text(centerX,centerY,"level:" +this.level,{ fontSize:'40px' }).setOrigin(.5).setTint(0xffff00)
        this.levelTween(this.levelText)
        //add music
        this.music=this.sound.add('song', {volume: 0.1})
        this.music.play()
        this.music.loop=true
      
        //display combo
        
        this.combo
        this.convertedcombo
        this.comboText=this.add.text(centerX-180, centerY-200, this.convertedcombo, { fontFamily: 'bonesFont',fontSize:'70px' }).setOrigin(.5)
        
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
            if (!this.bike.anims.isPlaying) {
                this.bike.anims.play('idle')
              }
            onGround=true
            if(this.justJumped==true&&this.codeEntered==false){
                this.combo.destroy()
                this.wrongKeyTween(this.comboText)
                lives-=1
                this.makelivesText(this.livesText)
                this.justJumped=false
                //console.log("lost a life you have %d bones",lives)

            }
        })
        this.bike.setVelocity(200,0)
        this.bike.body.onOverlap = true
        this.physics.add.overlap(this.bike, this.jump)

        this.physics.world.on('overlap', (gameObject1, gameObject2, body1, body2) =>
        {   
            this.bike.anims.pause()
            if(onGround){
            //create new combo once you hit a jump
            this.comboText.setAlpha(1)
            this.createMyCombo(comboSize)
            this.convertedCombo=this.convertCombo()
            //console.log(this.convertedCombo)
            this.comboText.text=this.convertedCombo

            //reset timer after touching jump
            timer.reset({
                delay: 1000000,                // ms
                args: [],
                callbackScope: this,
                loop: true,
                repeat: 0,
                startAt: 0,
                timeScale: 1,
                paused: false
            })
            
            
            this.time.addEvent(timer)
            }
            this.justJumped=true
            body1.velocity.y = -500
            onGround=false


        });

        //timer for score work on later
        this.levelTimer = this.time.addEvent({
            delay: timeLeft,                // ms
            callback: this.timerFunc,
            //args: [],
            callbackScope: this,
            loop: true,
        })

        //timer for score work on later
        timer = this.time.addEvent({
            delay: 200000,                // ms
            //args: [],
            callbackScope: this,
            loop: true,
            paused:true
        })

    }

    update(){
        

         //keep ground in front of player
         if(this.ground.x<this.bike.body.position.x+200){
            this.ground.x=this.ground.x+400
        }
        //keep jump in front of player
        if(this.jump.x<this.bike.body.position.x+200 && this.jump.y>this.bike.body.position.y+200){
            this.jump.x=this.jump.x+600
        }

        //scroll background
        this.background.x +=.5

        //move Combo Text 
        this.comboText.x = this.bike.body.position.x+centerX
        this.comboText.y = this.bike.body.position.y -300   

        //move lives text 
        this.livesText.x = this.bike.body.position.x+w-100
        this.livesText.y = this.bike.body.position.y -h -100
        
        //move level text
        this.levelText.x = this.bike.body.position.x+ 330
        this.levelText.text="level: "+this.level

        //end game
        if(lives==0){
            this.lose()
        }
   
    }


    //converts the combo array with keycodes to a matching string
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
            
                this.string=this.string +"\u2191"
    
            }
            else if(this.combo.keyCodes[this.count]  ==39 ){
                this.string=this.string +"\u2192"
    
            }
            else if(this.combo.keyCodes[this.count]  ==40 ){
                this.string=this.string +"\u2193"
    
            }
            else if(this.combo.keyCodes[this.count]  ==65 ){
                this.string=this.string +"A"
    
            }
            else if(this.combo.keyCodes[this.count]  ==68 ){
                this.string=this.string +"D"
    
            }
            this.count++
        }
        
        //console.log(this.string)
        return this.string
    }
    
    // randomly generates code for the combo
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

    //creates a combo of a given length
    createMyCombo(length){
        //debugger
        this.code=this.createCode(length)
        this.combo=this.input.keyboard.createCombo(this.code,{resetOnWrongKey: true},{deleteOnMatch:true})
        this.codeEntered =false
        this.input.keyboard.on('keycombomatch', event =>
        {
            this.rightKeyTween(this.comboText)
            this.codeEntered =true

            //bug where combo match is triggered for however many combos have been created even though i have deleteonmatch to true
            //console.log('COMBO ENTERED')
            //scoring
            let elapsed = timer.getElapsedSeconds();
            score+=Math.floor(100-elapsed*10)
        });
        //(this.code)
    }




   
    //sends you to game over scene
    lose(){

        this.cameras.main.fadeOut(200);
        this.music.stop()
        this.scene.start('GameOverScene')
    }

   
   //tweens

    //flashes green once you put correct code in
    rightKeyTween(object){
        rightKeyTween = this.tweens.add({
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

//flashes the code red if you do not get it in time
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

//fades level number out
levelTween(object){
    levelTween = this.tweens.add({
        targets: object,
        alpha:1,
        ease: 'Sine.easeIn',
        duration: 1700,
        repeat: 0,

        onComplete: () => {
 
            object.setAlpha(0)        
         }
    })

}

timerFunc(){
    this.level++
    if(comboSize<16){
        comboSize++
        this.levelText.setAlpha(1)
        this.levelTween(this.levelText)
    }
}

//displays the amount of lives you currently have
makelivesText(text){
    text.text=""
    for(let x=0;x<lives;x++){
        text.text=text.text+"X"
    }
}

}
