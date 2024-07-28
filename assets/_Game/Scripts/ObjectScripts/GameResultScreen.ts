// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Constants } from "../Managers/Constants";
import Stars from "./Star";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameResultScreen extends cc.Component {

    @property(Stars) stars: Stars = null;
    @property(cc.Node) frame: cc.Node = null;

    protected onLoad(): void {
        this.bindingEvent();
    }

    bindingEvent() {
        Constants.game.node.on(Constants.GAME_EVENT.APPLY_DATA_TO_GAME_RESULT_UI, this.applyDataToGameResultUI, this);
    }

    applyDataToGameResultUI() {
        Constants.soundManager.playClip(22)
        this.frame.setScale(0);
        cc.tween(this.frame)
            .to(1, { scale: 1.5 }, { easing: 'backOut' })
            .start();
        this.stars.setStar(Constants.game.getRatingStar(), 1.5);
    }

    rePlaygame() {
        Constants.soundManager.playClip(18);
        Constants.uiManager.onClose(2);
        Constants.uiManager.onOpen(1);
        Constants.game.playGame();
    }

    home() {
        Constants.soundManager.playClip(18);
        Constants.uiManager.onClose(2);
        Constants.uiManager.onClose(1);
        Constants.uiManager.onOpen(0);
    }
}
