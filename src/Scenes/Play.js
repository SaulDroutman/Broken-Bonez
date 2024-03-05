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
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        console.log('PlayScene: create')
        this.combo=this.createCombo(3)



    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.combo=this.createCombo(3)
            this.printCombo(this.combo)
            this.input.keyboard.createCombo(this.combo,{resetOnWrongKey: false}, {maxKeyDelay: 2000})

            this.input.keyboard.on('keycombomatch', event =>
        {

            console.log('COMBO ENTERED');

        });
            
        }

    }

    createCombo(length){
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

    printCombo(combo){
        console.log("NEW COMBO:")
        let count=0
        while(count<combo.length){
            console.log(combo[count])
            count++
        }
    }

}