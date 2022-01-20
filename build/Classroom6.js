import Door from './Door.js';
import Room from './Room.js';
import Candy from './Candy.js';
import Computer from './Computer.js';
import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
export default class ClassRoom6 extends Room {
  previousScene;
  computer;
  questions;
  pcInteract = false;
  constructor(canvas, previousScene, player, state) {
    super(canvas, './assets/img/artclass.png', state);
    this.previousScene = previousScene;
    this.player = player;
    this.setXPos(0);
    this.setYPos(0);
    this.collectibles = [];
    this.npcs = [];
    this.doors = [];
    this.questions = [];
    this.computer = new Computer(480, 282);
    this.collectibles.push(
      new Candy(this.canvas.width / 4, this.canvas.height / 4),
    );
    this.doors.push(new Door('./assets/img/door1.png', 912, 400.5));
    this.questions.push(
      new Question(
        this.player.getUserData(),
        'You are about to join this amazing new website# all your friends are there.# What information is OK to give online?#',
        'Nickname',
        'Phone number',
        'Adress',
      ),
      new Question(
        this.player.getUserData(),
        'You are having trouble doing an activity on a safe site you use at #school. Your friend offers to help but needs your password.# Would you give your password to them.',
        'No',
        'It depends',
        'Yes',
      ),
      new Question(
        this.player.getUserData(),
        'Your parents want to know what you have been doing on a safe site #you use at school. #Would you let them use your account?',
        'You would let them have a look but while youre there',
        'Yes, they are my parents I trust them',
        'No way, this site is only for kids and teachers',
      ),
    );
    this.insertHitbox(911, 590, 50, 5, 1);
    this.insertHitbox(909, 640, 10, 10, 1);
    this.insertHitbox(147, 700, 750, 5, 1);
    this.insertHitbox(194, 147, 5, 500, 1);
    this.insertHitbox(245, 244, 620, 5, 1);
    this.insertHitbox(908, 165, 5, 205, 1);
    this.insertHitbox(953, 359, 5, 180, 1);
    this.insertHitbox(905, 410, 20, 5, 1);
    this.insertHitbox(242, 119, 620, 5, 1);
    this.insertHitbox(434, 363, 35, 240, 1);
    this.insertHitbox(626, 363, 35, 240, 1);
    this.insertHitbox(237, 358, 140, 140, 1);
  }
  update(elapsed) {
    const nextScene = this.generalInteraction();
    if (this.player.isInteracting()) {
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          this.doorClose.play();
          this.player.setXPos(650);
          this.player.setYPos(300);
          const cNum = this.player.getCharacterNum();
          if (cNum === 1) {
            this.player.setImage('./assets/img/PlayerBoy1Down.png');
          } else if (cNum === 2) {
            this.player.setImage('./assets/img/playerBoy2Down.png');
          } else if (cNum === 3) {
            this.player.setImage('./assets/img/playerGirl2Down.png');
          } else if (cNum === 4) {
            this.player.setImage('./assets/img/playerGirl1Down.png');
          }
          return this.previousScene;
        }
      }
      if (this.player.collidesWith(this.computer)) {
        if (this.pcInteract === false) {
          this.pcInteract = true;
          return new QuestionScreen(this.canvas, this, this.questions);
        }
      }
    }
    if (nextScene !== null) {
      return nextScene;
    }
    return null;
  }
  render() {
    this.draw(this.ctx);
    this.drawHitBoxes();
    this.computer.draw(this.ctx);
    super.render();
  }
}
//# sourceMappingURL=Classroom6.js.map
