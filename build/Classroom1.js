import Door from './Door.js';
import Room from './Room.js';
import Candy from './Candy.js';
import Computer from './Computer.js';
import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
import Npc from './Npc.js';
import Dialog from './Dialog.js';
export default class ClassRoom1 extends Room {
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
        this.computer = new Computer(266, 165.5);
        this.npcs.push(new Npc('./assets/img/student-orange-hair-back-faced.png', 652, 436, [
            new Dialog('Hey, listen...have you seen a doll?#'),
            new Dialog('My little sister lost hers and I am trying to find it.#'),
            new Dialog('If you see it, bring it to me tomorrow, okay?#'),
            new Dialog('Class is over, gotta go now. See you tomorrow!#'),
        ]), new Npc('./assets/img/teacher-blonde-hair-front-faced.png', 714, 298, [
            new Dialog('Today we are learning about suspicious links and strangers messeges#'),
            new Dialog('This is very important!#'),
        ]));
        this.collectibles.push(new Candy(this.canvas.width / 2, this.canvas.height / 2));
        this.doors.push(new Door('./assets/img/door1.png', 985, 485));
        this.player.setXPos(990);
        this.player.setYPos(548);
        this.player.setImage('./assets/img/player-boy-standing.png');
        this.questions.push(new Question(this.player.getUserData(), 'Congratulations you just won a giveaway!# a Nigerian Prince chose you to be the winner!!#Send him your bank account details and your ID to get 500.000€!!', 'Not pay attention and delete this email/message', 'Send an E-mail to make sure it is real', 'YES, TAKE ALL MY DATA!'));
        this.questions.push(new Question(this.player.getUserData(), 'Someone sent you a link to a YouTube video,# you click on it and suddenly you have a virus on your pc!# What could u have done differently? ', 'Not click on the link', 'Send this cool link to all my friends!', 'start chatting with this person for fun'));
        console.log('CLASSROOM1');
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        if (this.player.isInteracting()) {
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
            if (this.player.collidesWith(this.computer)) {
                if (this.pcInteract === false) {
                    this.pcInteract = true;
                    return new QuestionScreen(this.canvas, this, this.questions);
                }
                console.log('cant use the pc at the moment');
            }
        }
        if (nextScene !== null) {
            return nextScene;
        }
        return null;
    }
    render() {
        this.draw(this.ctx);
        this.computer.draw(this.ctx);
        super.render();
        console.log(this.player.getXPos(), this.player.getYPos());
    }
}
//# sourceMappingURL=Classroom1.js.map