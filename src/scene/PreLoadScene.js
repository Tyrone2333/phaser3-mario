import makeAnimations from '../helpers/animations';

export default class PreLoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PreLoadScene',
        })
    }

    preload() {

        // 文件加载信息
        const {width, height} = this.cameras.main

        this.assetText = this.make.text({
            x: width / 2,
            y: height / 2 - 75,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5)

        this.load.on('progress', this.onProgress, this)
        this.load.on('fileprogress', this.onFileProgress, this)
        // this.load.on('complete', () => {})

        // atlas 资源文件
        this.load.multiatlas('atlas_object', 'resource/atalas/atlas_object.json', "resource/atalas")
        this.load.multiatlas('mario-sprites', 'resource/atalas/mario-sprites.json', "resource/atalas")
        // this.load.atlas('mario-sprites', 'assets/mario-sprites.png', 'assets/mario-sprites.json');

        // bitmapFont 字体
        this.load.bitmapFont('font', 'resource/fonts/font.png', 'resource/fonts/font.fnt');

        // 带 object 的 mario 地图
        this.load.tilemapTiledJSON({key: 'level1', url: 'resource/tilemap/level1.json'})
        // 砖块等物体
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
        this.load.spritesheet('mushroom', 'resource/img/Items/mushroom.png', {frameWidth: 16, frameHeight: 16})
        this.load.spritesheet('flower', 'resource/img/Items/flower.png', {frameWidth: 16, frameHeight: 16})
        this.load.image('tileset_levels', 'resource/tilemap/tileset_levels.png')

        // 生物等
        this.load.spritesheet('small_mario', 'resource/tilemap/small_mario.png', {frameWidth: 16, frameHeight: 16})
        this.load.spritesheet('big_mario', 'resource/tilemap/big_mario.png', {frameWidth: 16, frameHeight: 32})
        this.load.spritesheet('goomba_red', 'resource/img/Enemies/Goomba/goomba_red.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        // 临时为了不让蘑菇出错
        this.load.image("initTexture", "resource/img/Items/coin.png")

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


    sleep(t) {
        return new Promise(resolve => {
            setTimeout(resolve, t)
        })
    }

    async create() {
        // this.assetText.setText("预加载完成")
        console.log("预加载完成")
        // 生成动画
        this.buildAnimations()
        makeAnimations(this)
        this.scene.start('GameScene')
        // this.scene.start('BlankScene')

    }

    buildAnimations() {
        // player 动画
        this.anims.create({
            key: "left_anim",
            // 这是从 spritesheet 生成动画
            // this.load.spritesheet('small_mario', 'resource/tilemap/small_mario.png', {frameWidth: 16, frameHeight: 16})
            // frames: this.anims.generateFrameNames("small_mario", {start: 8, end: 10}),

            // 这是从 atlas 生成动画
            frames: this.anims.generateFrameNames('atlas_object', {
                start: 9,
                end: 11,
                zeroPad: 2,
                prefix: 'Player/Mario_Small/small_mario_',
                // suffix: '.png'   // 后缀,在软件设置`Trim sprite names`可以去掉结尾
            }),
            frameRate: 8,
            repeat: -1
        })
        this.anims.create({
            key: "right_anim",
            frames: this.anims.generateFrameNames('atlas_object', {
                start: 3,
                end: 5,
                zeroPad: 2,
                prefix: 'Player/Mario_Small/small_mario_',
            }),
            frameRate: 8,
            repeat: -1
        })
        this.anims.create({
            key: "faceRight_anim",
            frames: this.anims.generateFrameNames('atlas_object', {
                start: 2,
                end: 2,
                zeroPad: 2,
                prefix: 'Player/Mario_Small/small_mario_',
            }),
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: "faceLeft_anim",
            frames: this.anims.generateFrameNames('atlas_object', {
                start: 12,
                end: 12,
                zeroPad: 2,
                prefix: 'Player/Mario_Small/small_mario_',
            }),
            frameRate: 1,
            repeat: 1
        })
        this.anims.create({
            key: "jumpRight_anim",
            frames: this.anims.generateFrameNames('atlas_object', {
                start: 6,
                end: 6,
                zeroPad: 2,
                prefix: 'Player/Mario_Small/small_mario_',
            }),
            frameRate: 1,
            repeat: 1
        })
        this.anims.create({
            key: "jumpLeft_anim",
            frames: this.anims.generateFrameNames('atlas_object', {
                start: 8,
                end: 8,
                zeroPad: 2,
                prefix: 'Player/Mario_Small/small_mario_',
            }),
            frameRate: 1,
            repeat: 1
        })
        // 马日奥死亡动画
        this.anims.create({
            key: "die_anim",
            frames: this.anims.generateFrameNames('atlas_object', {
                start: 7,
                end: 7,
                zeroPad: 2,
                prefix: 'Player/Mario_Small/small_mario_',
            }),
            frameRate: 1,
            repeat: 1
        })

    }


    onProgress(value) {
        if (this.preloadSprite) {
            // calculate width based on value=0.0 .. 1.0
            var w = Math.floor(this.preloadSprite.width * value)

            // set width of sprite
            this.preloadSprite.sprite.frame.width = w
            this.preloadSprite.sprite.frame.cutWidth = w

            // update screen
            this.preloadSprite.sprite.frame.updateUVs()
        }
    }

    onFileProgress(file) {
        // debugger
        this.assetText.setText('正在加载: ' + file.src)
    }


}