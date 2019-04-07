
function preload() {
 this.load.image("bombe","./bilder/bombe.png");
 this.load.image("soldat","./bilder/soldat.png");
 this.load.image("untergrund","./bilder/untergrund.png");


}

 const gameState = {};

function create () {

  gameState.cursors = this.input.keyboard.createCursorKeys();

  gameState.player = this.physics.add.sprite(225, 400,"soldat").setScale(.15);

  const platform = this.physics.add.staticGroup();
  platform.create(225, 510,"untergrund");

  gameState.player.setColliderWorldBounds(true);

  this.physics.add.collider(platform, gameState.player);

  const bombs = this.physics.add.group();
  function bombGen(){
    const xCoord = Math.random * 450;
    gameState.bombs.create(xCoord, 10, "bombe");
  }

  gameState.bombLoop = this.time.addEvent({
    callback: bombGen,
    delay: 200,
    calbackScope: this,
    loop: true
  });

  gameState.scoreText = this.add.text(225, 510,"Score: 0", {fontSize: "15px", fill: "#000"});
  gameState.score = 0;

  this.physics.add.collider(bombs, platform, (bomb)=>{
    bomb.destroy();
    gameState.score += 10;
    gameState.scoreText.setText(`Score: ${gameState.score}`);
  });

  gameState.scoreText = this.add.text(225, 510,"Score: 0", {fontSize: "15px", fill: "#000"});
  gameState.score = 0;

  this.physics.add.collider(gameState.player, bombs, ()=>{
    gameState.bombLoop.destroy();
    this.physics.pause();
    this.add.text(150, 250, "Game Over", {fontSize: "15px", fill: "#000"});
    this.add.text(150, 270, 'Click to Restart', { fontSize: '15px', fill: '#000000' });
  });

  this.input.on("pointerup", ()=>{
    gameState.score = 0;
    this.scene.restart();
  });

}

function update () {

  if(gameState.cursors.left.isDown){
    gameState.player.setVelocityX(-160);
  } else if (gameState.cursors.right.isDown){
    gameState.player.setVelocityX(160);
  } else {
    gameState.player.setVelocityX(0);
  }

}



const config = {
  type: Phaser.AUTO,
  width: 450,
  height: 500,
  backgroundColor: "b9eaff",

  physics: {
    default: "arcade",
    arcade: {
      gravity: {y: 200},
      enableBody: true
    }
  },

  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);
