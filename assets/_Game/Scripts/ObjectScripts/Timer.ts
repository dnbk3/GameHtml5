// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Utilities from "../Helper/Utilities";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Timer extends cc.Component {

    @property(cc.Label) text: cc.Label = null;
    @property(cc.Boolean) enableCountDown: boolean = false;
    @property private time: number = 60;

    protected onLoad(): void {
        this.text.string = Utilities.formatTime(this.time);
    }

    startCountDown() {
        this.enableCountDown = true;
    }

    stopCountDown() {
        this.enableCountDown = false;
    }

    protected update(dt: number): void {
        if (!this.enableCountDown) return;

        this.time -= dt;
        if (this.time <= 0) {
            this.time = 0;
            this.fireEventTimeOut();
            this.enableCountDown = false;
        }
        this.text.string = Utilities.formatTime(this.time);
    }

    fireEventTimeOut() {
        if (!this.enableCountDown) return;
    }


}
