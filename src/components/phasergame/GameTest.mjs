import Phaser from 'phaser'

function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
        console.log(this)
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