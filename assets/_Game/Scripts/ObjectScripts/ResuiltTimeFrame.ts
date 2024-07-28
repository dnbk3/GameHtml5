// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Utilities from "../Helper/Utilities";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResultTimeFrame extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    protected onLoad(): void {
        this.setDeactive();
    }

    setTime(time: number) {
        this.node.active = true;
        this.label.string = Utilities.getTimeStringFromHour(time);
    }

    setDeactive() {
        this.node.active = false;
    }
}
