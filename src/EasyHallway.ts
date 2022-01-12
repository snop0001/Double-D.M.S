import Room from './Room.js';
import Scene from './Scene.js';
import Player from './Player.js';
import Door from './Door.js';
import ClassRoom1 from './Classroom1.js';
import ClassRoom2 from './Classroom2.js';
import ClassRoom3 from './Classroom3.js';
import HintScreen from './HintScreen.js';
import Dialog from './Dialog.js';
import Npc from './Npc.js';

export default class EasyHallway extends Room {
  private mainHallway: Room;

  /**
   * Initialises every attribute
   *
   * @param canvas of the game
   * @param mainHallway of the game
   * @param player of the game
   */
  public constructor(
    canvas: HTMLCanvasElement,
    mainHallway: Room,
    player: Player
  ) {
    super(canvas, './assets/img/easyHallway.png');
    console.log('creating easy hallway');
    this.mainHallway = mainHallway;

    this.player = player;

    this.collectibles = [];
    this.npcs = [];
    this.doors = [];

    this.setXPos(0);
    this.setYPos(0);

    this.npcs.push(
      new Npc('./assets/img/student-1-back-faced.png', 561, 630, [
        new Dialog('Heyy how are you today?'),
        new Dialog('Good luck with your exams!'),
      ])
    );

    this.npcs.push(
      new Npc(
        './assets/img/student-black-haired-left-faced.png',
        50,
        this.canvas.height - 400,
        [
          new Dialog('Heyy how are you today?'),
          new Dialog('Good luck with your exams!'),
        ]
      )
    );
    this.npcs.push(
      new Npc(
        './assets/img/student-red-right-faced.png',
        0,
        this.canvas.height - 400,
        [
          new Dialog('Heyy how are you today?'),
          new Dialog('Good luck with your exams!'),
        ]
      )
    );

    this.doors.push(new Door('./assets/img/door1.png', 632, 238.5));
    this.doors.push(new Door('./assets/img/door1.png', 500, 238.5));
    this.doors.push(new Door('./assets/img/door1.png', 334, 238.5));

    this.player.setXPos(1055);
    this.player.setYPos(351.5);
  }

  /**
   * Methos to detect the input of the player
   */
  public processInput(): void {
    if (this.player.getYPos() > 267.5 && this.player.getYPos() < 407.5) {
      this.player.movePlayer(this.canvas);
      if (this.player.getYPos() <= 267.5) {
        this.player.setYPos(270);
      }
      if (this.player.getYPos() >= 407.5) {
        this.player.setYPos(406);
      }
    }
  }

  /**
   * Updates the esay hallway
   *
   * @param elapsed of the gameloop
   * @returns the mainhallway
   */
  // eslint-disable-next-line class-methods-use-this
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(elapsed: number): Scene {
    // calling general checkups from Room class
    this.generalInteraction();

    // LEAVES EASY HALLWAY
    if (this.player.getXPos() >= 1060 && this.player.getYPos() >= 309.5) {
      this.player.setXPos(14);
      this.player.setYPos(443.5);
      this.player.setImage('./assets/img/player-boy-right.png');
      console.log('main halwway return');
      return this.mainHallway;
    }

    // READING HINT
    if (
      this.player.isReadingHint() &&
      this.player.getUserData().getHintAmount() > 0
    ) {
      this.player
        .getUserData()
        .setHintAmount(this.player.getUserData().getHintAmount() - 1);
      console.log(this.player.getUserData().getHintAmount());
      return new HintScreen(this.canvas, this, 2);
    }

    // INTERACTIONS
    if (this.player.isInteracting()) {
      // WITH DOORS
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          console.log('interact with door');
          this.doorOpen.play();
          if (i === 0) {
            return new ClassRoom1(
              this.canvas,
              this,
              this.player,
              this.isMenuShowing
            );
          }
          if (i === 1) {
            return new ClassRoom2(
              this.canvas,
              this,
              this.player,
              this.isMenuShowing
            );
          }
          if (i === 2) {
            return new ClassRoom3(
              this.canvas,
              this,
              this.player,
              this.isMenuShowing
            );
          }
        }
      }

      // WITH NPC
    }
    return null;
  }

  /**
   * Renders the easy hallway
   */
  public render(): void {
    this.draw(this.ctx);
    super.render();
  }

  /*
  public drawRectengles(): void {
    this.ctx.beginPath();
    this.ctx.rect(1450, 433, 50, 50);
    this.ctx.stroke();
  }
  */
}
