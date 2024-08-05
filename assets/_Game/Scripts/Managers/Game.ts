// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import BackgroundCrl from "../../SkateGame/SkateGameScript/BackgroundCrl";
import Player from "../../SkateGame/SkateGameScript/Player";
import SkakeFxCompont from "../ObjectScripts/SkakeFx";
import { Constants } from "./Constants";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    __preload() {
        Constants.game = this;
    }

    @property(Player) player: Player = null;
    @property(BackgroundCrl) bgCtrl: BackgroundCrl = null;

    protected start(): void {
        this.initGame();
    }

    initGame(): void {
        Constants.currState = Constants.GAME_STATE.GameHome;
        this.player.init();
        this.bgCtrl.init();
    }

    startMove(): void {
        Constants.currState = Constants.GAME_STATE.GamePlay;
        this.player.startMove();
    }

    showResult(): void {
        Constants.currState = Constants.GAME_STATE.GameResult;
    }
}
