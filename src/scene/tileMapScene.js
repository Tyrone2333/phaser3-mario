import PlayerSprite from "../object/Player"
import Enemy from "../object/Enemy"
import Goomba from "../object/Goomba"
import Koopa from "../object/Koopa"
import Coin from "../object/Coin"
import Test from "../object/test"

export default class tileMapScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'tileMapScene'
        })
        this.score = 0
    }

    preload() {
        this.load.image('sky', 'resource/image/sky.png')

        // link sprite
        this.load.spritesheet("link", 'resource/image/link.png', {frameWidth: 32, frameHeight: 32})

        //  Mario 地图
        this.load.tilemapTiledJSON('map1', 'resource/tilemap/super-mario.json')
        this.load.image('tiles1', 'resource/image/super-mario.png')

        this.load.tilemapTiledJSON('map3', 'resource/tilemap/super-mario-3.json')
        this.load.image('tiles3', 'resource/image/super-mario-3.png')

        // 带 object 的 mario 地图
        this.load.tilemapTiledJSON({key: 'level1', url: 'resource/tilemap/level1.json'})
        // 砖块
        this.load.spritesheet('brick', 'resource/img/Levels/brick.png', {frameWidth: 16, frameHeight: 16})
        this.load.spritesheet('blockCollisioned', 'resource/img/Levels/blockCollisioned.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('brick2', 'resource/img/Levels/brick2.png', {frameWidth: 16, frameHeight: 16})
        this.load.spritesheet('randomBox', 'resource/img/Levels/questionMarkBlock.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('randomBox2', 'resource/img/Levels/questionMarkBlock_2.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('brickCoins', 'resource/img/Levels/brickCoins.png', {frameWidth: 16, frameHeight: 16})
        this.load.spritesheet('brickCoins2', 'resource/img/Levels/brickCoins_2.png', {frameWidth: 16, frameHeight: 16})
        this.load.spritesheet('coinBlock', 'resource/img/Items/coinBlock.png', {frameWidth: 16, frameHeight: 16})
        this.load.image('tileset_levels', 'resource/tilemap/tileset_levels.png')

        //  自己制作的tilemap
        this.load.tilemapTiledJSON({key: 'test_tilemap', url: 'resource/tilemap/test_tilemap.json'})
        this.load.tilemapTiledJSON({key: 'test_tilemap2', url: 'resource/tilemap/test_tilemap_2.json'})
        this.load.image("enemies_tileset", "resource/tilemap/EnemiesGeneral.png")

        this.load.image("sheet_tileset", "resource/image/sheet_tileset.png")
        this.load.image("super_mario_tileset", "resource/image/super-mario.png")
        this.load.spritesheet('small_mario', 'resource/tilemap/small_mario.png', {frameWidth: 16, frameHeight: 16})
        this.load.spritesheet('big_mario', 'resource/tilemap/big_mario.png', {frameWidth: 16, frameHeight: 32})
        this.load.spritesheet('goomba_red', 'resource/img/Enemies/Goomba/goomba_red.png', {
            frameWidth: 16,
            frameHeight: 16
        })

        this.load.spritesheet('koopa_green', 'resource/img/Enemies/Koopa/koopa_green.png', {
            frameWidth: 16,
            frameHeight: 24
        })
        this.load.spritesheet('koopa_green_squish', 'resource/img/Enemies/Koopa/koopa_green_squish.png', {
            frameWidth: 16,
            frameHeight: 16
        })

        // tilemap example 的 atlas 文件
        this.load.pack('Preload', 'resource/pack.json', 'Preload')

    }

    create() {
        // this.add.image(0, 0, 'sky').setOrigin(0, 0)
        this.createAnims()

        // 带 object 的 mario 地图
        this.map = this.add.tilemap('level1')
        let tileset_level1 = this.map.addTilesetImage('tileset_levels')
        this.graphicLayer = this.map.createDynamicLayer('Graphic_Layer', tileset_level1, 0, 0)
        // this.graphicLayer = this.map.createStaticLayer('Graphic_Layer', tileset_level1, 0, 0)
        this.pipesAccessLevelLayer = this.map.createDynamicLayer('PipesAccessLevel', tileset_level1, 0, 0)
        this.pipesAccessLayer = this.map.createDynamicLayer('PipesAccess', tileset_level1, 0, 0)
        this.exitPipesLayer = this.map.createDynamicLayer('ExitPipes', tileset_level1, 0, 0)
        this.finishLevelLayer = this.map.createDynamicLayer('FinishLevel', tileset_level1, 0, 0)


        // // 旧 Mario 地图
        // var map1 = this.make.tilemap({key: 'map1'})
        // var tileset1 = map1.addTilesetImage('SuperMarioBros-World1-1', 'tiles1')
        // this.layer1 = map1.createDynamicLayer('World1', tileset1, 0,0)
        //
        // let map2 = this.add.tilemap('map3')
        // var tileset2 = map2.addTilesetImage('SuperMarioBrosMap1-3_bank.png', 'tiles3')
        // var layer2 = map2.createDynamicLayer('ShoeBox Tile Grab', tileset2, 0, 300)
        //
        //
        // this.layer1.setCollisionByExclusion([1, 2, 3, 12, 11])
        //
        // // 12 = 蘑菇🍄
        // this.layer1.setTileIndexCallback(12, (sprite, tile) => {
        //     this.score += 10
        //     this.layer1.removeTileAt(tile.x, tile.y)
        //     return false
        // })
        // // 11 =  金币
        // this.layer1.setTileIndexCallback(11, (sprite, tile) => {
        //     this.score += 10
        //     this.layer1.removeTileAt(tile.x, tile.y)
        //     return false
        // })
        // // 在(5,0),宽高为1的位置将tile 半透明(可用于设置暗门)
        // this.layer1.setTileLocationCallback(5, 0, 1, 1, (sprite, tile) => {
        //     tile.alpha = 0.25
        // })
        // this.physics.add.collider(this.player, this.layer1)  // player 与 layer 碰撞
        // // 旧 Mario 地图 END


        // 调试内容
        this.showDebug = true
        this.debugGraphics = this.add.graphics()
        // new Phaser.GameObjects.Graphics(this,{x:0, y:600}) //   无法使用???
        // this.debugGraphics.y = 600

        this.drawDebug()
        this.input.keyboard.on('keydown_U', (event) => {
            this.showDebug = !this.showDebug
            this.drawDebug()
        })

        // new player
        this.player = new PlayerSprite({
            scene: this,
            x: 600,
            y: 128,
        })
        this.player.setCollideWorldBounds(true) // 世界碰撞

        this.cameras.main.setScroll(300, 0)
        // 镜头跟随,开启后镜头控制会被覆盖
        // this.cameras.main.startFollow(this.player)
        //  camera 镜头控制
        let cursors = this.input.keyboard.createCursorKeys()
        let SmoothedKeyControlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            acceleration: 0.06,
            drag: 0.0005,
            maxSpeed: 1.0
        }
        let FixedKeyControlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        }
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(FixedKeyControlConfig)
        this.cameras.main.setBackgroundColor(0x6888ff)

        /**
         * 滚动因子控制相机移动对此游戏对象的影响。
         当相机滚动时，它将改变在屏幕上呈现此游戏对象的位置。
         它不会更改游戏对象的实际位置值。
         *  值为1表示它将与摄像机完全同步移动。
         值为0表示即使相机移动也不会移动。
         但实际测试为0会随着镜头移动而移动,不论设置为0还是1 or 其他 文本的x,y都不改变
         */
        this.scoreText = this.add.text(0, 0, "score : 0").setScrollFactor(0)
        this.debugText = {
            pointPosition: this.add.text(0, 50, "指针:").setScrollFactor(0)
        }


        // 事件的监听
        this.events.on('drawDebugEvent', function () {

            log("this.events.on('drawDebugEvent') 参数: " + arguments[0])
        }, this)


        //create attack group to hold player's fireballs
        this.playerAttackGroup = this.add.group(null)
        this.playerAttackGroup.runChildUpdate = true
        this.enemiesGroup = this.add.group(null)
        this.enemiesGroup.runChildUpdate = true
        this.coinsGroup = this.add.group(null)
        this.coinsGroup.runChildUpdate = true


        //create crosshair(十字准线) which is controlled by player class
        this.crosshair = this.add.image(0, 0, 'atlas', 'crosshair')
        //刷新 crosshair 的位置
        this.input.on('pointermove', function (mouse) {
            this.crosshair.setPosition(mouse.x + this.cameras.main.scrollX, mouse.y + this.cameras.main.scrollY);
            this.debugText.pointPosition.setText("指针:" + mouse.x + "," + mouse.y)

        }, this);
        this.createGroupFromObjects()
        // 创建碰撞
        this.createCollision()
    }

    update(time, delta) {

        this.controls.update(delta)

        this.player.update(time, delta)

        this.updateText()


    }

    drawDebug() {
        this.debugGraphics.clear()
        if (this.showDebug) {
            setTimeout(() => {
                this.graphicLayer.renderDebug(this.debugGraphics, {
                    tileColor: null, // Non-colliding tiles
                    collidingTileColor: new Phaser.Display.Color(254, 209, 16, 100), // Colliding tiles
                    // faceColor:  new Phaser.Display.Color(0, 0, 255, 50), // Colliding face edges
                })
            }, 1)

        }
        this.events.emit('drawDebugEvent', 1, 2)
    }

    updateText() {
        this.scoreText.setText("score :" + this.score)
    }

    createAnims() {
        this.anims.create({
            key: "marioRight_anim",
            frames: this.anims.generateFrameNumbers("big_mario", {start: 2, end: 4}),
            frameRate: 8,
            repeat: -1
        })
        this.anims.create({
            key: "randomBox_anim",
            frames: this.anims.generateFrameNumbers("randomBox", {start: 0, end: 2}),
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: "brick_anim",
            frames: this.anims.generateFrameNumbers("brick", {start: 0, end: 0}),
            frameRate: 1,
            repeat: 1
        })
        this.anims.create({
            key: "blockCollisioned_anim",
            frames: this.anims.generateFrameNumbers("blockCollisioned", {start: 0, end: 0}),
            frameRate: 1,
            repeat: 1
        })
        // 蘑菇头
        this.anims.create({
            key: "goombaWalk_anim",
            frames: this.anims.generateFrameNumbers("goomba_red", {start: 0, end: 1}),
            frameRate: 4,
            repeat: -1
        })
        this.anims.create({
            key: "goombaDie_anim",
            frames: this.anims.generateFrameNumbers("goomba_red", {start: 2, end: 2}),
            frameRate: 1,
            repeat: 1
        })
        // 小王八
        this.anims.create({
            key: "koopaWalk_anim",
            frames: this.anims.generateFrameNumbers("koopa_green", {start: 0, end: 1}),
            frameRate: 4,
            repeat: -1
        })
        //  王八缩壳
        this.anims.create({
            key: "koopaSquish_anim",
            frames: this.anims.generateFrameNumbers("koopa_green_squish", {start: 0, end: 0}),
            frameRate: 1,
            repeat: 1
        })
        //  王八缩壳恢复
        this.anims.create({
            key: "koopaSquishRecover_anim",
            frames: this.anims.generateFrameNumbers("koopa_green_squish", {start: 0, end: 1}),
            frameRate: 6,
            repeat: 6
        })

        // 硬币旋转
        this.anims.create({
            key: "coinBlock_anim",
            frames: this.anims.generateFrameNumbers("coinBlock", {start: 0, end: 3}),
            frameRate: 4,
            repeat: -1
        })


    }

    createGroupFromObjects() {
        // 砖块
        let bricksObjects = this.map.createFromObjects('Bricks', "bricks", {key: 'bricks'})
        this.bricksGroup = this.physics.add.staticGroup()
        bricksObjects.forEach((val, idx) => {
            // val.body.collideWorldBounds﻿=true
            val.setOrigin(0)
            // val.setScale(1)
            val.width = val.width * val._scaleX
            val.height = val.height * val._scaleY
            // 图块的原点在左下角,渲染在图上是从中心为起点,不调整会导致obj错位
            val.x = val.x - (val.width / 2)
            val.y = val.y + (val.height / 2)
            val.setScale(1)
            val.isCollided = false
            this.anims.play('brick_anim', val)
            this.bricksGroup.add(val)
        })

        // 生成敌人 Goombas
        this.map.getObjectLayer('Goombas').objects.forEach((obj) => {
            let goomba = new Goomba(
                this,
                obj.x + 8,
                obj.y + 16,
                "brick"
            )
            this.enemiesGroup.add(goomba)
        })

        // 生成敌人 Koopa
        this.map.getObjectLayer('Koopas').objects.forEach((obj) => {
            let koopa = new Koopa(
                this,
                obj.x + 8,
                obj.y + 8,
                "koopa_green"
            )
            koopa.body.height = obj.height
            this.enemiesGroup.add(koopa)

        })

        //  死亡空间
        let deadZoneObjects = this.map.createFromObjects('DeadZones', "deadZones", {key: 'deadZones'})
        this.deadZoneGroup = this.physics.add.staticGroup()
        deadZoneObjects.forEach((val, idx) => {
            // val.body.collideWorldBounds﻿=true
            val.setOrigin(0)
            // val.setScale(1)
            val.width = val.width * val._scaleX
            val.height = val.height * val._scaleY
            // 图块的原点在左下角,渲染在图上是从中心为起点,不调整会导致obj错位
            val.x = val.x - (val.width / 2)
            val.y = val.y + (val.height / 2)
            val.setScale(1)
            val.isCollided = false
            this.deadZoneGroup.add(val)
        })

        // 砖里有金币为 bricksCoin 有多个金币为 BricksCoins
        this.bricksCoinGroup = this.physics.add.staticGroup()
        let bricksCoinObjects = this.map.createFromObjects('BricksCoin', "bricksCoin", {key: 'bricksCoin'})
        bricksCoinObjects.forEach((val, idx) => {
            // val.body.collideWorldBounds﻿=true
            val.setOrigin(0)
            // val.setScale(1)
            val.width = val.width * val._scaleX
            val.height = val.height * val._scaleY
            // 图块的原点在左下角,渲染在图上是从中心为起点,不调整会导致obj错位
            val.x = val.x - (val.width / 2)
            val.y = val.y + (val.height / 2)
            val.setScale(1)
            val.isCollided = false

            this.anims.play('randomBox_anim', val)
            this.bricksCoinGroup.add(val)
        })
        // 地上的金币
        this.map.getObjectLayer('Coins').objects.forEach((obj) => {
            let coin = new Coin({
                scene: this,
                x: obj.x + 8,
                y: obj.y + 8,
            })
            this.coinsGroup.add(coin)
        })


    }

    createCollision() {
        this.graphicLayer.setCollision([1, 34, 67, 69, 265, 266, 267, 268, 269, 298, 299, 300, 301, 301, 302])

        this.physics.add.collider(this.player, this.graphicLayer)
        //  捡金币
        this.physics.add.collider(this.player, this.coinsGroup, (player, coin) => {
            coin.collidingWithPlayer()
        })
        // player 顶有硬币的砖块
        this.physics.add.collider(this.player, this.bricksCoinGroup, (player, brick) => {
            if (brick.isCollided === true) {
                return
            }
            // player 顶 砖块
            if (player.body.touching.up && brick.body.touching.down) {
                // 藏有金币或者蘑菇的才设置
                brick.isCollided = true
                this.tweens.add({
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
                    scene: this,
                    x: brick.x + 8,
                    y: brick.y + 8 - 16,
                })
                coin.collidingBricksCoin()
            }
        })
        // player 顶普通砖块
        this.physics.add.collider(this.player, this.bricksGroup, (player, brick) => {
            if (player.body.touching.up && brick.body.touching.down) {
                brick.destroy()
            }
        })
        // fireball 打墙
        this.physics.add.collider(this.playerAttackGroup, this.graphicLayer, (fireball, tile) => {
            fireball.collidedExplode()
            this.graphicLayer.removeTileAt(tile.x, tile.y)
        })
        this.physics.add.collider(this.playerAttackGroup, this.enemiesGroup, (fireball, enemy) => {
            fireball.collidedExplode()
            enemy.collidingWithFireball()
        })

        //  TODO:   重复 overlap 会导致 dieSetting 重复生成用于移除的倒计时
        this.physics.add.overlap(this.player, this.enemiesGroup, (player, enemy) => {
            enemy.collidingWithPlayer()
        })

        // player 掉坑里
        this.physics.add.overlap(this.player, this.deadZoneGroup, (player, deadZone) => {

        })
        // enemy 掉坑里
        this.physics.add.overlap(this.enemiesGroup, this.deadZoneGroup, (enemy, deadZone) => {
            enemy.dieSetting()
        })

    }
}

