// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Animation) anim: cc.Animation = null;
    @property(cc.Label) text: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    protected start(): void {
        this.playAnimIdle();
    }

    // function action player
    playAnimIdle() {
        this.text.node.active = true;
        this.anim.play('PlayerIdle');
    }

    playAnimHappy() {
        this.text.node.active = false;
        this.anim.play('PlayerHappy');
    }

    playAnimSad() {
        this.text.node.active = false;
        this.anim.play('PlayerSad');
    }

    setText(text: string) {
        this.text.string = text;
    }
} 
