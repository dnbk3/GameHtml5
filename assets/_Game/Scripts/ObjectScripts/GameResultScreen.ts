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

    protected start(): void {
        this.stars.setStar(3);
    }

    bindingEvent() {
        Constants.game.node.on(Constants.GAME_EVENT.APPLY_DATA_TO_GAME_RESULT_UI, this.applyDataToGameResultUI, this);
    }

    applyDataToGameResultUI() {
        this.stars.setStar(Constants.game.getRatingStar());
    }
}
