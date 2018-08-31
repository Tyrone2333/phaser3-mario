import Fireball from "./Fireball"
import Coin from "./Coin";

export default class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, "brick")
        config.scene.physics.world.enable(this)
        this.scene = config.scene
        this.scene.add.existing(this)// 没这个就无法显示在scene
        this.scene.physics.world.enable(this)

        this.bigMode = false
        this.direction = 1 // 向右
        this.speed = 150
        this.jumpSpeed = 210
        this.life = 1
        this.alive = true

        // 创建人物动画
        this.creatAnims()
        // 添加控制按键
        this.creatControls()


    }

    update(time, delta) {
        // 控制移动
        if (this.keys.left.isDown) {
            this.direction = -1
            this.body.velocity.x = this.direction * this.speed
            this.bigMode ? this.anims.play('bigLeft_anim', true) : this.anims.play('left_anim', true)

        }
        else if (this.keys.right.isDown) {
            this.direction = 1
            this.body.velocity.x = this.direction * this.speed
            this.bigMode ? this.anims.play('bigRight_anim', true) : this.anims.play('right_anim', true)
        }
        // 触地才允许跳跃
        else if (this.keys.up.isDown && this.body.blocked.down) {
        // else if (this.keys.up.isDown) {
            this.jump()
            this.anims.play('jump_anim', true)
        }
        else {
            this.body.velocity.x = 0
            this.anims.play('faceRight_anim', true)
            if(this.direction === 1){
                this.anims.play('faceRight_anim', true)
            }else {
                this.anims.play('faceLeft_anim', true)
            }
            //  ? :
        }


    }

    jump() {

        this.body.velocity.y =  this.jumpSpeed * -1
    }

    creatAnims() {
        // player 动画
        this.scene.anims.create({
            key: "left_anim",
            frames: this.scene.anims.generateFrameNumbers("small_mario", {start: 8, end: 10}),
            frameRate: 8,
            repeat: -1
        })
        this.scene.anims.create({
            key: "right_anim",
            frames: this.scene.anims.generateFrameNumbers("small_mario", {start: 2, end: 4}),
            frameRate: 8,
            repeat: -1
        })
        this.scene.anims.create({
            key: "faceRight_anim",
            frames: this.scene.anims.generateFrameNumbers("small_mario", {start: 1, end: 1}),
            frameRate: 1,
            repeat: 1
        })
        this.scene.anims.create({
            key: "faceLeft_anim",
            frames: this.scene.anims.generateFrameNumbers("small_mario", {start: 11, end: 11}),
            frameRate: 1,
            repeat: 1
        })
        this.scene.anims.create({
            key: "jump_anim",
            frames: this.scene.anims.generateFrameNumbers("small_mario", {start: 5, end: 5}),
            frameRate: 1,
            repeat: 1
        })

        this.scene.anims.create({
            key: "bigRight_anim",
            frames: this.scene.anims.generateFrameNumbers("big_mario", {start: 2, end: 4}),
            frameRate: 8,
            repeat: -1
        })
        this.scene.anims.create({
            key: "bigLeft_anim",
            frames: this.scene.anims.generateFrameNumbers("big_mario", {start: 8, end: 10}),
            frameRate: 8,
            repeat: -1
        })

    }

    creatControls() {
        this.keys = {
            left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            down: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O),
            right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA),   // ",键"
        }

        // 攻击
        this.scene.input.on('pointerdown', function (pointer) {
            // let magic = this.scene.registry.get('magic_current')
            if (1) {
                let fireball = new Fireball({
                    scene: this.scene,
                    x: this.x,
                    y: this.y,
                })
                this.scene.playerAttackGroup.add(fireball)

                // this.scene.registry.set('magic_current', magic - 1)
                // this.scene.events.emit('magicChange') //tell the scene the magic has changed so the HUD is updated
            } else {
                // this.noMagicSound.play()
            }
        }, this)
    }

    // player 顶有硬币的砖块
    collidingWithbricksCoinGroup(player, brick){
        if (brick.isCollided === true) {
            return
        }
        // player 顶 砖块
        if (player.body.touching.up && brick.body.touching.down) {
            // 藏有金币或者蘑菇的才设置
            brick.isCollided = true
            this.scene.tweens.add({
                targets: brick,
                // x: brick.x,
                y: brick.y - 8,
                callbackScope: this,
                duration: 100,  // 持续时间
                ease: 'Quintic',    // Phaser.Math. Easing
                yoyo: true,
                onComplete: function (tween) {
                    brick.anims.play("blockCollisioned_anim")
                },
            })
            let coin = new Coin({
                scene: this.scene,
                x: brick.x + 8,
                y: brick.y + 8 - 16,
            })
            coin.collidingBricksCoin()
        }
    }
    // player 顶普通砖块
    collidingWithbricksGroup(player, brick){
        if (player.body.touching.up && brick.body.touching.down) {
            if(this.bigMode){
                brick.destroy()
            }else {
                this.scene.tweens.add({
                    targets: brick,
                    y: brick.y - 8,
                    callbackScope: this,
                    duration: 100,  // 持续时间
                    ease: 'Quintic',    // Phaser.Math. Easing
                    yoyo: true,
                    onComplete: function (tween) {
                    },
                })
            }

        }
    }
}