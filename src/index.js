// import Phaser from "phaser"

// 无关,二段跳的 demo
import DoubleJumpScene from './scene/DoubleJumpScene'
import LoadingScene from "./scene/LoadingScene"

// 马里奥
import PreLoadScene from "./scene/PreLoadScene"
import GameScene from "./scene/GameScene"
import gameOverScene from "./scene/GameOverScene"

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.AUTO,
    pixelArt: true,
    roundPixels: true,
    parent: 'phaser-example',
    title: 'Phaser3 Mario',
    width: 700,
    height: 224,
    // width: 3840,
    // height: 624,
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
        // DoubleJumpScene,
        PreLoadScene,
        GameScene,
        gameOverScene
    ]
};

const game = new Phaser.Game(config);


// window.onresize = function () {
//     game.renderer.resize(window.innerWidth, window.innerHeight)
// 适配移动端,触发resize
//     game.events.emit('resize')
// }

