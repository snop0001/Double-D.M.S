import Door from './Door.js';
import Room from './Room.js';
import Hint from './Hint.js';
import Computer from './Computer.js';
import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
import Npc from './Npc.js';
import Dialog from './Dialog.js';
export default class ClassRoom5 extends Room {
    previousScene;
    computer;
    questions;
    pcInteract = false;
    constructor(canvas, previousScene, player, state) {
        super(canvas, './assets/img/classroom.png', state);
        this.previousScene = previousScene;
        this.player = player;
        this.setXPos(0);
        this.setYPos(0);
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.questions = [];
        this.computer = new Computer(479, 253);
        this.npcs.push(new Npc('./assets/img/teacher-blonde-hair-front-faced.png', 600, 250, [
            new Dialog('You should take a break sometimes#', ['Yes Im tired', 'I am okay'], ['Studying can be hard', 'good to know!']),
            new Dialog('The cafeteria has great food!#', ['Ill check it out!', 'I am hungry..'], ['', '']),
        ]));
        this.collectibles.push(new Hint(this.canvas.width / 1.5, this.canvas.height / 3));
        this.doors.push(new Door('./assets/img/door1.png', 912, 400.5));
        this.questions.push(new Question(this.player.getUserData(), ' Should you use free Anti-Virus?#', 'No, since the anti-virus can be a virus!', 'No, since I know what I download!', 'No, since I do not want to use an anti-virus!'), new Question(this.player.getUserData(), 'Which of the following is NOT an example of cyberbullying?#', 'Inviting a friend to fight with you in a game', 'Creating a fake profile to humiliate someone', 'Posting or sharing embarrassing photos'), new Question(this.player.getUserData(), 'What is a predator?#', 'Someone who uses the internet to do harm to others', 'Someone who shares too much personal information', 'Someone who regularly surfs the web'));
        this.insertHitbox(911, 563, 50, 5, 1);
        this.insertHitbox(909, 600, 10, 10, 1);
        this.insertHitbox(147, 658, 750, 5, 1);
        this.insertHitbox(194, 107, 5, 500, 1);
        this.insertHitbox(245, 107, 650, 5, 1);
        this.insertHitbox(908, 165, 5, 205, 1);
        this.insertHitbox(953, 359, 5, 150, 1);
        this.insertHitbox(905, 410, 20, 5, 1);
        this.insertHitbox(242, 169, 620, 5, 1);
        this.insertHitbox(286, 313, 35, 270, 1);
        this.insertHitbox(386, 313, 35, 270, 1);
        this.insertHitbox(674, 313, 35, 270, 1);
        this.insertHitbox(774, 313, 35, 270, 1);
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    this.doorClose.play();
                    this.player.setXPos(460);
                    this.player.setYPos(300);
                    const cNum = this.player.getCharacterNum();
                    if (cNum === 1) {
                        this.player.setImage('./assets/img/player-boy1-down.png');
                    }
                    else if (cNum === 2) {
                        this.player.setImage('./assets/img/player-boy2-down.png');
                    }
                    else if (cNum === 3) {
                        this.player.setImage('./assets/img/player-girl2-down.png');
                    }
                    else if (cNum === 4) {
                        this.player.setImage('./assets/img/player-girl1-down.png');
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
//# sourceMappingURL=Classroom5.js.map