import Door from './Door.js';
import Room from './Room.js';
import Scene from './Scene.js';

import Player from './Player.js';

import Candy from './Candy.js';
import Computer from './Computer.js';

import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';

import HintScreen from './HintScreen.js';
import Npc from './Npc.js';
import Dialog from './Dialog.js';

export default class ClassRoom1 extends Room {
  private previousScene: Scene;

  private computer: Computer;

  private questions: Question[];

  /**
   * creats a new classroom
   *
   * @param canvas canvas element
   * @param previousScene a scene
   * @param player a player
   * @param state a way of hiding and unhidding the menu bar
   */
  public constructor(
    canvas: HTMLCanvasElement,
    previousScene: Scene,
    player: Player,
    state: boolean,
  ) {
    super(canvas, './assets/img/classroom.png', state);
    this.previousScene = previousScene;

    this.player = player;

    this.setXPos(0);
    this.setYPos(0);

    this.collectibles = [];
    this.npcs = [];
    this.doors = [];
    this.questions = [];
    this.computer = new Computer(266, 165.5);

    this.npcs.push(
      new Npc(
        './assets/img/student-orange-hair-back-faced.png',
<<<<<<< HEAD
        468,
        370.5,
=======
        702,
        236,
        [
          new Dialog('Heyy how are you today?'),
          new Dialog('Good luck with your exams!'),
        ],
>>>>>>> bd4b738c2b887c0f5ac344ac38e0ea3a314b7445
      ),
    );

    this.npcs.push(
      new Npc(
        './assets/img/teacher-blonde-hair-front-faced.png',
<<<<<<< HEAD
        491,
        180.5,
=======
        714,
        98,
        [
          new Dialog('Heyy how are you today?'),
          new Dialog('Good luck with your exams!'),
        ],
>>>>>>> bd4b738c2b887c0f5ac344ac38e0ea3a314b7445
      ),
    );

    // creating collectibles in the classroom
    this.collectibles.push(
      new Candy(this.canvas.width / 2, this.canvas.height / 2),
    );

    // creating the door for the classroom
    this.doors.push(new Door('./assets/img/door1.png', 985, 485));

    // setting player starter position and image in the classroom
    this.player.setXPos(990);
    this.player.setYPos(548);
    this.player.setImage('./assets/img/player-boy-standing.png');

    // creating questions for this classroom
    this.questions.push(
      new Question(
        this.player.getUserData(),
        'Congratulations you just won a giveaway!# a Nigerian Prince chose you to be the winner!!#Send him your bank account details and your ID to get 500.000€!!',
        'Not pay attention and delete this email/message',
        'Send an E-mail to make sure it is real',
        'YES, TAKE ALL MY DATA!',
      ),
    );
    this.questions.push(
      new Question(
        this.player.getUserData(),
        'Someone sent you a link to a YouTube video,# you click on it and suddenly you have a virus on your pc!# What could u have done differently? ',
        'Not click on the link',
        'Send this cool link to all my friends!',
        'start chatting with this person for fun',
      ),
    );

    console.log('CLASSROOM1');
  }

  /**
   * Game cycle, basically loop that keeps the game running. It contains all
   * the logic needed to draw the individual frames.
   *
   * @param elapsed a number
   * @returns a scene or null
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(elapsed: number): Scene {
    // calling general checkups from Room class
    this.generalInteraction();

    // READING HINT
    if (
      this.player.isReadingHint()
      && this.player.getUserData().getHintAmount() > 0
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
          this.doorClose.play();
          console.log(this.previousScene);
          this.player.setXPos(632);
          this.player.setYPos(350);
          this.player.setImage('./assets/img/player-boy-standing.png');
          return this.previousScene;
        }
      }

      // WITH COMPUTER
      if (this.player.collidesWith(this.computer)) {
        // present question screen
        return new QuestionScreen(this.canvas, this, this.questions);
      }
    }

    return null;
  }

  /**
   * draws items to screen
   */
  public render(): void {
    this.draw(this.ctx);
    this.computer.draw(this.ctx);
    super.render();
    console.log(this.player.getXPos(), this.player.getYPos());
  }
}
