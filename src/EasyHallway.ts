import Room from './Room.js';
import Scene from './Scene.js';
import Player from './Player.js';
import Door from './Door.js';
import ClassRoom1 from './Classroom1.js';
import ClassRoom2 from './Classroom2.js';
import ClassRoom3 from './Classroom3.js';
import Dialog from './Dialog.js';
import Npc from './Npc.js';
import Hint from './Hint.js';

export default class EasyHallway extends Room {
  private mainHallway: Room;

  private room1Interact: boolean;

  private room2Interact: boolean;

  private room3Interact: boolean;

  private class1: ClassRoom1;

  private class2: ClassRoom2;

  private class3: ClassRoom3;

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

    // sets the classrooms to not interacted
    this.room1Interact = false;
    this.room2Interact = false;
    this.room3Interact = false;

    // sets previous scene
    this.mainHallway = mainHallway;

    // sets the player
    this.player = player;

    // resets the items in the room
    this.collectibles = [];
    this.npcs = [];
    this.doors = [];

    // sets the background image position
    this.setXPos(0);
    this.setYPos(0);

    // creating collectibles
    this.collectibles.push(
      new Hint(this.canvas.width / 3, this.canvas.height / 3)
    );

    // creates npcs with their dialogs for this room
    this.npcs.push(
      new Npc('./assets/img/student-1-back-faced.png', 561, 405, [
        new Dialog('Hello, I lost my backpack....#'),
        new Dialog(
          'Can you please look for it and bring it back to me tomorrow?#'
        ),
      ]),
      new Npc(
        './assets/img/student-black-haired-left-faced.png',
        50,
        this.canvas.height - 400,
        [
          new Dialog('There are some things you should never share!#'),
          new Dialog('I hope she will not be bullied#'),
        ]
      ),
      new Npc(
        './assets/img/student-red-right-faced.png',
        0,
        this.canvas.height - 400,
        [
          new Dialog('Did you hear about Jessica?#'),
          new Dialog('Cant believe she shared that picture :O#'),
        ]
      )
    );

    // PLAYER POSITTION UPON ENTERING
    this.player.setXPos(1055);
    this.player.setYPos(351.5);

    // creats the doors in the hallway
    this.doors.push(new Door('./assets/img/door1.png', 632, 238.5));
    this.doors.push(new Door('./assets/img/door1.png', 500, 238.5));
    this.doors.push(new Door('./assets/img/door1.png', 334, 238.5));
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
    const nextScene: Scene = this.generalInteraction();

    // LEAVES EASY HALLWAY
    if (this.player.getXPos() >= 1060 && this.player.getYPos() >= 309.5) {
      this.player.setXPos(14);
      this.player.setYPos(443.5);
      this.player.setImage('./assets/img/player-boy-right.png');
      console.log('main halwway return');
      return this.mainHallway;
    }

    // INTERACTIONS
    if (this.player.isInteracting()) {
      // WITH DOORS
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          console.log('interact with door');
          // setting player starter position and image in the classrooms
          this.player.setXPos(990);
          this.player.setYPos(548);
          this.player.setImage('./assets/img/player-boy-standing.png');
          this.doorOpen.play();
          if (i === 0) {
            // if this classroom was previously entered to
            if (this.room1Interact === false) {
              this.class1 = new ClassRoom1(
                this.canvas,
                this,
                this.player,
                this.isMenuShowing
              );
              this.room1Interact = true;
            }
            return this.class1;
          }
          // checking which door
          if (i === 1) {
            // if this classroom was previously entered to
            if (this.room2Interact === false) {
              this.class2 = new ClassRoom2(
                this.canvas,
                this,
                this.player,
                this.isMenuShowing
              );
              this.room2Interact = true;
            }

            return this.class2;
          }
          // checking which door
          if (i === 2) {
            // if this classroom was previously entered to
            if (this.room3Interact === false) {
              this.class3 = new ClassRoom3(
                this.canvas,
                this,
                this.player,
                this.isMenuShowing
              );
              this.room3Interact = true;
            }
            return this.class3;
          }
        }
      }
    }
    // according to the general checks in room
    if (nextScene !== null) {
      return nextScene;
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
