// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class ClockHome extends cc.Component {

    @property(cc.Boolean) enableRun: boolean = false;
    @property(cc.Boolean) enableRandom: boolean = false;

    private anim: cc.Animation = null;

    protected onLoad(): void {
        this.anim = this.getComponent(cc.Animation);

        if (this.enableRun) {
            this.anim.play();
            if (this.enableRandom) {
                this.anim.setCurrentTime(Math.random() * 4, "ClockHome");
            }
        }
    }
}
