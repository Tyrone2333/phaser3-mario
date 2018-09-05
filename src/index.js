
import Phaser from "phaser"
import GameScene from './scene/GameScene'
import LoadingScene from "./scene/loadingScene"

import tileMapScene from "./scene/tileMapScene"
import gameOverScene from "./scene/gameOverScene"

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.AUTO,
    pixelArt: true,
    roundPixels: true,
    parent: 'phaser-example',
    title: 'Phaser3 Mario',
    // width: 750,
    // height: 224,
    width: 3840,
    height: 624,

    level1Width:3840,
    level1Height:624,
    // width: window.innerWidth,
    // height: window.innerHeight,
    fps: 60,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: true // 调试开启 arcade sprite 会有边框提示
        }
    },

    scene: [
        // LoadingScene,
        // GameScene,

        tileMapScene,
        gameOverScene
    ]
};

const game = new Phaser.Game(config);


// window.onresize = function () {
//     game.renderer.resize(window.innerWidth, window.innerHeight)
// 适配移动端,触发resize
//     game.events.emit('resize')
// }

