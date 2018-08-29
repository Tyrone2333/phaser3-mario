export default class Enemy extends Phaser.Physics.Arcade.Sprite {

    // constructor(config) {
    //     super(config.scene, config.x, config.y,"brick");
    constructor(scene,x,y,texture) {
        super(scene, x, y, texture);
        scene.physics.world.enable(this);
        this.scene = scene;
        this.scene.add.existing(this);  // 没这个就无法显示在scene
        this.scene.physics.world.enable(this);

        this.direction = -1 // 向左运动
        this.speed = 30
        this.life = 1
        this.alive = true
        this.scene.physics.add.collider(this, this.scene.graphicLayer, () => {
        })


    }

    update() {
        if (this.alive) {
            if (this.life <= 0) {
                this.alive = false
                this.dieSetting()
                return false
            }
            // 先转向
            // if(this.body.blocked.right || this.body.blocked.left){
            if (this.body.onWall()) {
                this.direction *= -1;
            }
            // 后移动,否则会鬼畜
            this.body.velocity.x = this.speed * this.direction;
        }
    }

}
