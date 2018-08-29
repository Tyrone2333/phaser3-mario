import Enemy from "./Enemy"

export default class Goomba extends Enemy {

    //  这货是蘑菇头🍄
    constructor(scene,x,y,texture) {
        super(scene,x,y,texture)
        // this.setFrame('slime');

        this.anims.play("goombaWalk_anim")

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
        if(this.body.touching.up && this.scene.player.body.touching.down){
            this.dieSetting()
            this.scene.score += 20
            this.anims.play("goombaDie_anim")
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
            y:  this.y + 600,
            ease: 'Power1',
            duration: 3000
        });
        timeline.play();

    }
}
