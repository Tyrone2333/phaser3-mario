export default class Fireball extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'atlas', 'fireball');
        config.scene.physics.world.enable(this);
        this.scene = config.scene;
        this.damage = 1;

        this.scene.add.existing(this);
        // 把 this 以 200 的速度移动到指针位置
        this.scene.physics.moveTo(this, this.scene.crosshair.x, this.scene.crosshair.y, 200);
        // 粒子
        this.particles = this.scene.add.particles('atlas', 'whiteParticle');
        this.emitter = this.particles.createEmitter({
            x: this.x,
            y: this.y,
            speed: 16, // 是粒子扩散速度,太高粒子术会非常大
        })
        // 不允许 arcade 重力
        this.body.allowGravity = false;
    }

    update() {
        this.emitter.setPosition(this.x, this.y);
    }

    wallCollide() {
        this.emitter.explode(64, this.x, this.y);

        this.destroy();
    }
}
