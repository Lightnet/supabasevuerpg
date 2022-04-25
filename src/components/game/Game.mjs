
// https://phaser.io/tutorials/making-your-first-phaser-3-game/part3
// https://newdocs.phaser.io/docs/3.55.2

// https://phaser.io/examples/v3/category/scenes
// https://phaser.io/examples/v3/view/demoscene/birdy-nam-nam
// https://phaser.io/examples/v3/category/game-config
// https://labs.phaser.io/edit.html?src=src/scalemanager/resize.js&v=3.55.2
// 
// https://phaser.io/examples/v3/view/scalemanager/resize
// 
// 


import Phaser from 'phaser'





function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    //width: 800,
    //height: 600,
    //mode: Phaser.Scale.FIT,
    mode: Phaser.Scale.RESIZE,
    //autoCenter: Phaser.Scale.CENTER_BOTH,

    width: "100%",
    height: "100%",
    min: {
      width: 800,
      height: 600
    },
    max: {
      width: 1600,
      height: 1200
    },
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: {
      init() {
        this.cameras.main.setBackgroundColor("#24252A");
        //console.log(this)
      },
      create() {
        this.helloWorld = this.add.text(
          this.cameras.main.centerX,
          this.cameras.main.centerY,
          "Hello World",
          { font: "40px Arial",  fill: "#ffffff" }
        );
        this.helloWorld.setOrigin(0.5);
      },
      update() {
        this.helloWorld.angle += 1;
      }
    }
    //scene: [BootScene, PlayScene]
  })
}

export default launch
export { launch }