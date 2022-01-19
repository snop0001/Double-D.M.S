import Room from './Room.js';
import Door from './Door.js';
import ClassRoom1 from './Classroom1.js';
import ClassRoom2 from './Classroom2.js';
import ClassRoom3 from './Classroom3.js';
import Dialog from './Dialog.js';
import Npc from './Npc.js';
import Hint from './Hint.js';
import Bathroom1 from './Bathroom1.js';
import Bathroom2 from './Bathroom2.js';
export default class EasyHallway extends Room {
    mainHallway;
    room1Interact;
    room2Interact;
    room3Interact;
    bathroomInteractBoy;
    bathroomInteractGirl;
    class1;
    class2;
    class3;
    bathroom1;
    bathroom2;
    constructor(canvas, mainHallway, player) {
        super(canvas, './assets/img/easyHallway.png');
        console.log('creating easy hallway');
        this.room1Interact = false;
        this.room2Interact = false;
        this.room3Interact = false;
        this.bathroomInteractBoy = false;
        this.bathroomInteractGirl = false;
        this.mainHallway = mainHallway;
        this.player = player;
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.setXPos(0);
        this.setYPos(0);
        this.collectibles.push(new Hint(this.canvas.width / 3, this.canvas.height / 3));
        this.npcs.push(new Npc('./assets/img/student-1-back-faced.png', 575, 495, [
            new Dialog('Hello, I lost my backpack....#'),
            new Dialog('Can you please look for it and bring it back to me tomorrow?#'),
        ]), new Npc('./assets/img/student-black-haired-left-faced.png', 195, 315, [
            new Dialog('There are some things you should never share!#'),
            new Dialog('I hope she will not be bullied#'),
        ]), new Npc('./assets/img/student-red-right-faced.png', 155, 315, [
            new Dialog('Did you hear about Jessica?#'),
            new Dialog('Cant believe she shared that picture :O#'),
        ]));
        this.doors.push(new Door('./assets/img/door1.png', 632, 228.5));
        this.doors.push(new Door('./assets/img/door1.png', 450, 228.5));
        this.doors.push(new Door('./assets/img/door1.png', 280, 228.5));
        this.doors.push(new Door('./assets/img/girl-bathroom-door.png', 910, 228.5));
        this.doors.push(new Door('./assets/img/boy-bathroom-door.png', 100, 228.5));
        this.insertHitbox(10, 10, 10, 10, 1);
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        const cNum = this.player.getCharacterNum();
        if (this.player.getXPos() >= 969 && this.player.getYPos() >= 309.5) {
            this.player.setXPos(163);
            this.player.setYPos(440);
            if (cNum === 1) {
                this.player.setImage('./assets/img/player-boy1-right.png');
            }
            else if (cNum === 2) {
                this.player.setImage('./assets/img/player-boy2-right.png');
            }
            else if (cNum === 3) {
                this.player.setImage('./assets/img/player-girl2-right.png');
            }
            else if (cNum === 4) {
                this.player.setImage('./assets/img/player-girl1-right.png');
            }
            console.log('main halwway return');
            return this.mainHallway;
        }
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
                    this.player.setXPos(911);
                    this.player.setYPos(473);
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
                    this.doorOpen.play();
                    if (i === 0) {
                        if (this.room1Interact === false) {
                            this.class1 = new ClassRoom1(this.canvas, this, this.player, this.isMenuShowing);
                            this.room1Interact = true;
                        }
                        return this.class1;
                    }
                    if (i === 1) {
                        if (this.room2Interact === false) {
                            this.class2 = new ClassRoom2(this.canvas, this, this.player, this.isMenuShowing);
                            this.room2Interact = true;
                        }
                        return this.class2;
                    }
                    if (i === 2) {
                        if (this.room3Interact === false) {
                            this.class3 = new ClassRoom3(this.canvas, this, this.player, this.isMenuShowing);
                            this.room3Interact = true;
                        }
                        return this.class3;
                    }
                    if (i === 3) {
                        this.player.setXPos(911);
                        this.player.setYPos(350);
                        if (this.bathroomInteractGirl === false) {
                            this.bathroom1 = new Bathroom1(this.canvas, this, this.player, this.isMenuShowing);
                            this.bathroomInteractGirl = true;
                        }
                        return this.bathroom1;
                    }
                    if (i === 4) {
                        this.player.setXPos(911);
                        this.player.setYPos(350);
                        if (this.bathroomInteractBoy === false) {
                            this.bathroom2 = new Bathroom2(this.canvas, this, this.player, this.isMenuShowing);
                            this.bathroomInteractBoy = true;
                        }
                        return this.bathroom2;
                    }
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
        super.render();
    }
}
//# sourceMappingURL=EasyHallway.js.map