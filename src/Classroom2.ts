import Door from './Door.js';
import Room from './Room.js';

import Scene from './Scene.js';
import Player from './Player.js';

import Hint from './Hint.js';
import Computer from './Computer.js';

import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
import QuestItem from './QuestItem.js';

export default class ClassRoom2 extends Room {
  // Room the player have previously been
  private previousScene: Scene;

  // computer ther player interacts with to asnwer the questions
  private computer: Computer;

  // questions which are displayed on the computer
  private questions: Question[];

  // interaction for the computer
  private pcInteract: boolean = false;

  // teddy which is being used for the quest of the guy with black hair located in the easy hallway
  private teddy: QuestItem = new QuestItem(
    'teddy',
    './assets/img/teddy.png',
    263,
    580,
  );

  private pushOnce: boolean = true;

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
    super(canvas, './assets/img/scienceclass.png', state);

    // sets the previous scene to return to
    this.previousScene = previousScene;

    // sets the player
    this.player = player;

    // sets the background image position
    this.setXPos(0);
    this.setYPos(0);

    // resets the items in the room
    this.collectibles = [];
    this.npcs = [];
    this.doors = [];
    this.questions = [];
    this.computer = new Computer(476, 247);

    // creating collectibles in the classroom
    this.collectibles.push(
      new Hint(this.canvas.width / 2 - 100, this.canvas.height / 2 - 70),
    );

    // creating the door for the classroom
    this.doors.push(new Door('./assets/img/door1.png', 912, 400.5));

    // setting player starter position and image in the classroom

    // creating questions for this classroom
    this.questions.push(
      new Question(
        this.player.getUserData(),
        'You are creating an account on your favorite social media.# Before you can access it,#they ask you to accept the general terms of condition!# What do you do?',
        'Ask your parents what they think',
        'Not read it and accept it',
        'Read through everything and decide if you accept',
      ),
      new Question(
        this.player.getUserData(),
        'Which of these files are safe to download?#',
        'Game.exe',
        'Virus.exe ',
        'Trojan.exe',
      ),
    );

    // Adds all the hitboxes to the bathroom
    this.insertHitbox(911, 563, 50, 5, 1);
    this.insertHitbox(909, 600, 10, 10, 1);
    this.insertHitbox(147, 658, 750, 5, 1);
    this.insertHitbox(194, 107, 5, 500, 1);
    this.insertHitbox(245, 107, 650, 5, 1);
    this.insertHitbox(908, 165, 5, 205, 1);
    this.insertHitbox(953, 359, 5, 150, 1);
    this.insertHitbox(905, 410, 20, 5, 1);
    this.insertHitbox(242, 169, 620, 5, 1);
    this.insertHitbox(380, 370, 35, 240, 1);
    this.insertHitbox(536, 370, 35, 240, 1);
    this.insertHitbox(674, 370, 35, 240, 1);

    // console.log('CLASSROOM2');
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
    const nextScene: Scene = this.generalInteraction();

    // Checking if the player is interacting with items
    if (this.player.isInteracting()) {
      // WITH DOORS
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          // console.log('interact with door');
          this.doorClose.play();
          // console.log(this.previousScene);
          this.player.setXPos(450);
          this.player.setYPos(300);
          // setting image of player according to the right character chosen
          const cNum: number = this.player.getCharacterNum();
          if (cNum === 1) {
            this.player.setImage('./assets/img/player-boy1-down.png');
          } else if (cNum === 2) {
            this.player.setImage('./assets/img/player-boy2-down.png');
          } else if (cNum === 3) {
            this.player.setImage('./assets/img/player-girl2-down.png');
          } else if (cNum === 4) {
            this.player.setImage('./assets/img/player-girl1-down.png');
          }
          return this.previousScene;
        }
      }

      // WITH COMPUTER
      if (this.player.collidesWith(this.computer)) {
        if (this.pcInteract === false) {
          // present question screen
          this.pcInteract = true;
          return new QuestionScreen(this.canvas, this, this.questions);
        }
        // console.log('cant use the pc at the moment');
      }
    }

    this.addQuestItems();

    // according to the general checks in room
    if (nextScene !== null) {
      return nextScene;
    }
    return null;
  }

  private addQuestItems(): void {
    // CREATES BACKPACK
    if (this.pushOnce === true) {
      this.player
        .getUserData()
        .getQuests()
        .forEach((quest) => {
          if (quest === 'Look for Teddy') {
            this.player.getUserData().getQuestItems().push(this.teddy);
            this.pushOnce = false;
          }
        });
    }
  }

  /**
   * draws items to screen
   */
  public render(): void {
    this.draw(this.ctx);

    // DRAWS QUESTITEMS
    this.player
      .getUserData()
      .getQuestItems()
      .forEach((item) => {
        if (item.getName() === 'teddy') item.draw(this.ctx);
      });
    this.computer.draw(this.ctx);
    // calls the render function of the parent aka ROOM
    super.render();
    this.drawHitBoxes();
  }
}
