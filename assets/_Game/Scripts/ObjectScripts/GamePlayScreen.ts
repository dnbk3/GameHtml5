// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Constants } from "../Managers/Constants";
import Timer from "./Timer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlayScreen extends cc.Component {

    @property(cc.Label) text: cc.Label = null;
    @property(Timer) timer: Timer = null;

    protected onLoad(): void {
        this.bindingEvent();
    }

    onClickBack() { }

    bindingEvent() {
        Constants.game.node.on(Constants.GAME_EVENT.APPLY_DATA_TO_GAME_PLAY_UI, this.applyDataToGamePlayUI, this);
        Constants.game.node.on(Constants.GAME_EVENT.START_COUNT_DOWN, this.startCountDown, this);
        Constants.game.node.on(Constants.GAME_EVENT.STOP_COUNT_DOWN, this.stopCountDown, this);
    }

    stopCountDown() {
        this.timer.stopCountDown();
    }

    startCountDown() {
        this.timer.startCountDown();
    }

    applyDataToGamePlayUI(time: number) {
        this.text.string = time.toString() + " giờ rồi này. Đồng hồ nào chỉ đúng giờ nhỉ?";
    }
}
