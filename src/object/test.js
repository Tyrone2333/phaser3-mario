export default class Test extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y)

        this.anims.play("koopaWalk_anim")
        config.scene.physics.world.enable(this);
        this.scene = config.scene;
        this.number = config.number;
        this.scene.add.existing(this);  // 没这个就无法显示在scene
        this.scene.physics.world.enable(this);
        this.body.allowGravity = false
    }

    update(){

    }
}