import PlayerSprite from "../object/Player"

export default class tileMapScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'tileMapScene'
        })
        this.score = 0
    }

    preload() {
        this.load.image('sky', 'resource/image/sky.png')

        this.load.tilemapTiledJSON('map', 'resource/tilemap/level-with-coin-objects.json');
        this.load.spritesheet('coin', 'resource/image/coin.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('ground_1x1', 'resource/image/ground_1x1.png');

        this.load.spritesheet("link", 'resource/image/link.png', {frameWidth: 32, frameHeight: 32})

        //  Mario 地图
        this.load.tilemapTiledJSON('map1', 'resource/tilemap/super-mario.json');
        this.load.image('tiles1', 'resource/image/super-mario.png');

        this.load.tilemapTiledJSON('map3', 'resource/tilemap/super-mario-3.json');
        this.load.image('tiles3', 'resource/image/super-mario-3.png');

    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0, 0)

        // 智障小人地图
        // let map = this.add.tilemap('map');
        // let tiles = map.addTilesetImage('ground_1x1');
        // this.layer = map.createStaticLayer('Tile Layer', tiles);
        // this.anims.create({
        //     key: 'spin',
        //     frames: this.anims.generateFrameNumbers('coin', {start: 0, end: 6}),
        //     frameRate: 16,
        //     repeat: -1
        // });
        // this.coins = map.createFromObjects('Coin Object Layer', 26, {key: 'coin'});
        // this.anims.play('spin',  this.coins);
        //  智障小人地图 END

        var map1 = this.make.tilemap({key: 'map1'});
        var tileset1 = map1.addTilesetImage('SuperMarioBros-World1-1', 'tiles1');
        // this.layer1 = map1.createStaticLayer('World1', tileset1, 0, 0);
        this.layer1 = map1.createDynamicLayer('World1', tileset1, 0, 0);

        // var map2 = this.add.tilemap('map3');
        // var tileset2 = map2.addTilesetImage('SuperMarioBrosMap1-3_bank.png', 'tiles3');
        // var layer2 = map2.createStaticLayer('ShoeBox Tile Grab', tileset2, 700, 300);

        this.layer1.setCollisionByExclusion([1, 2, 3, 12, 11])

        // 12 = 蘑菇🍄
        this.layer1.setTileIndexCallback(12, (sprite, tile) => {
            this.score += 10
            this.layer1.removeTileAt(tile.x, tile.y);
            return false
        });
        // 11 =  金币
        this.layer1.setTileIndexCallback(11, (sprite, tile) => {
            this.score += 10
            this.layer1.removeTileAt(tile.x, tile.y);
            return false
        });
        // 在(5,0),宽高为1的位置将tile 半透明(可用于设置暗门)
        this.layer1.setTileLocationCallback(5, 0, 1, 1, (sprite, tile) => {
            tile.alpha = 0.25;
        });


        // 调试内容
        this.showDebug = true
        this.debugGraphics = this.add.graphics();
        this.drawDebug()
        this.input.keyboard.on('keydown_U', (event) => {
            this.showDebug = !this.showDebug;
            this.drawDebug();
        });

        //  camera 镜头控制
        let cursors = this.input.keyboard.createCursorKeys();
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
        };
        let FixedKeyControlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        }
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(FixedKeyControlConfig);
        this.cameras.main.setBackgroundColor(0x6888ff)
        // new player
        this.player = new PlayerSprite({
            scene: this,
            x: 330,
            y: 80,
        });
        this.physics.add.collider(this.player, this.layer1)  // player 与 layer 碰撞
        this.player.setCollideWorldBounds(true) // 世界碰撞

        this.cameras.main.startFollow(this.player);  // 镜头跟随
        // this.cameras.main.setBounds(0, 0, layer1.x + layer1.width + 600, 0);

        this.scoreText = this.add.text(0, 0, "score : 0")


        // 事件的监听
        this.events.on('drawDebugEvent', function () {
            log("this.events.on('drawDebugEvent'")
        }, this); //watch for Game Over

    }

    update(time, delta) {

        this.controls.update(delta);

        this.player.update(time, delta)

        this.updateText()
    }

    drawDebug() {
        this.debugGraphics.clear()
        if (this.showDebug) {
            this.layer1.renderDebug(this.debugGraphics, {
                tileColor: null, // Non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(0, 0, 0, 50), // Colliding tiles
                // faceColor:  new Phaser.Display.Color(0, 0, 255, 50), // Colliding face edges
            });
        }
        this.events.emit('drawDebugEvent');
    }

    updateText() {
        this.scoreText.setText("score :" + this.score)
    }

}

