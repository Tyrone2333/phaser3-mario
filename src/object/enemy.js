export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y,);
        config.scene.physics.world.enable(this);
        this.scene = config.scene;
        this.number = config.number;

        this.body.setDrag(8, 8);
        this.body.setBounce(.5, .5);

    }

    update(){
        this.angle += 1;

    }


}