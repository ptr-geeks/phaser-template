import * as Phaser from 'phaser';
import Player from '../objects/player';
import UI from './ui';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
  }

  create() {
    this.background = this.add.tileSprite(-200, 0, 0, 0, 'background')
      .setOrigin(0, 0)
      .setScrollFactor(0.5, 0)
      .setScale(1, 0.8)
      .setDepth(-100);

    let terrain = this.physics.add.group({ allowGravity: false, immovable: true });
    terrain.createMultiple({ key: 'sprites', frame: 0, frameQuantity: 15, repeat: 0 });

    Phaser.Actions.SetXY(terrain.getChildren(), 32, game.config.height - 32, 64);

    //this.testTile = this.physics.add.sprite(100, game.config.height - 96 - 16 - 64, 'sprites', 2);
    //this.testTile.body.setAllowGravity(false);
    //this.testTile.setBounce(0, 0.5);

    this.player = new Player(this, 32, game.config.height - 96);
    this.physics.add.collider(this.player, terrain);

    //this.physics.add.collider(this.player, this.testTile, this.bounceTile);

    this.scene.run('ui');
  }

  preUpdate() {
    this.background.setTilePosition(this.scene.cameras.main.scrollX * 0.2);
  }
}
