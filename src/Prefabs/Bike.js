class Bike extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add bike to existing scene
        scene.physics.add.existing(this)   // add physics body to scene
                      
        this.body.setSize(this.width, this.height/2)
        this.body.setOffset(0,20)
        this.setGravity(0,200)

       
        let v = this.body.velocity;

        this.body.velocity.copy(v);
        

     
        }   
        create(){


    


  



        }
        update(){

            

            
        }

        
         
}