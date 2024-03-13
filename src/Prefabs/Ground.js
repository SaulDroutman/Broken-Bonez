class Bike extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add bike to existing scene
        scene.physics.add.existing(this)   // add physics body to scene
                      
        this.body.setSize(this.width, this.height/2)
        this.body.setOffset(0,20)
        this.setGravity(0,200)

        wheel1 = scene.physics.add.image();
        wheel1.body.setCircle(10);
        //wheel1.body.setOffset(100,100)
        //wheel1.setDebugBodyColor(0xff0000);

        wheel2 = scene.physics.add.image();
        wheel2.body.setCircle(10);
        //wheel2.body.setOffset(200,200)
        //wheel2.setDebugBodyColor(0xff0000);

        let v = this.body.velocity;

        this.body.velocity.copy(v);
        wheel1.body.velocity.copy(v);
        wheel2.body.velocity.copy(v);
        

     
        }   
       //Compound bodies in Arcade Physics from https://codepen.io/samme/pen/ExYGRyo?editors=0010
        create(){


    
            console.log("inbike create")


  



        }
        update(){

            console.log("in bike update")
            

            
        }

        
         
}