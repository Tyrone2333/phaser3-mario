import Enemy from "./Enemy"

export default class Koopa extends Enemy {

    constructor(scene,x,y,texture) {
        super(scene,x,y,texture)
        // this.setFrame('slime');


        this.anims.play("koopaWalk_anim")

    }
    update() {
        if (this.alive) {
            if (this.life <= 0) {
                this.alive = false
                this.dieSetting()
                return false
            }

            // 朝向右边的时候就翻转自己
            this.flipX = this.body.facing === 14;

            // 先转向
            if(this.body.blocked.right || this.body.blocked.left){
                // if (this.body.onWall()) {
                this.direction *= -1
            }
            // 后移动,否则会鬼畜
            this.body.velocity.x = this.speed * this.direction;
        }
    }

    dieSetting() {
        this.alive = false
        this.direction = 0
        this.body.velocity.x = 0
        setTimeout(() => {
            this.scene.enemiesGroup.remove(this, true, true)   //从组 + 场景移除,并销毁
        }, 2000)
    }

    collidingWithPlayer() {
        // player 踩到 this
        if (this.body.touching.up && this.scene.player.body.touching.down) {

        }
    }

    collidingWithFireball() {
        this.dieSetting()
        this.scene.score += 10
        this.angle = -180;
        // 创建时间线动画
        let timeline = this.scene.tweens.createTimeline();
        timeline.add({
            targets: this,
            y: this.y - 16,
            ease: 'Power1',
            duration: 600
        });
        timeline.add({
            targets: this,
            y: this.y + 600,
            ease: 'Power1',
            duration: 3000
        });
        timeline.play();

    }
}
