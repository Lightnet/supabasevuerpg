
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
// https://phaser.io/examples/v3/view/demoscene/birdy-nam-nam
function bootLoader ()
{
  //this.load.image('loader', 'assets/demoscene/birdy-nam-nam-loader.png');
  //this.load.image('click', 'assets/demoscene/birdy-nam-nam-click.png');
}

function bootCreate ()
{
  this.scene.start('demo');
}

var loaderSceneConfig = {
  key: 'loader',
  active: true,
  preload: bootLoader,
  create: bootCreate
}


function preload ()
{
  //loadImage = this.add.image(0, 0, 'loader').setOrigin(0);

  //this.load.audio('jungle', [ 'assets/audio/jungle.ogg', 'assets/audio/jungle.mp3' ]);
  //this.load.animation('birdyAnims', 'assets/demoscene/birdy.json');
  //this.load.image('bg1', 'assets/demoscene/birdy-nam-nam-bg1.png');
  //this.load.image('bg2', 'assets/demoscene/birdy-nam-nam-bg2.png');
  //this.load.atlas('birdy', 'assets/demoscene/budbrain.png', 'assets/demoscene/budbrain.json');
}

function create (){

}

var demoSceneConfig = {
  key: 'demo',
  active: false,
  visible: false,
  preload: preload,
  create: create,
  extend: {
    startDemo: startDemo
  }
};

function startDemo ()
{

}



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