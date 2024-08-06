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

    protected onLoad(): void {
        this.enablePhysics();
    }

    initPlayer(): void { }

    protected start(): void {
        this.initGame();
    }

    endGameAfterTime(time: number): void {
        setTimeout(() => {
            this.showResult();
        }, time * 1000);
    }

    initGame(): void {
        if (Constants.currState == Constants.GAME_STATE.GameHome) return
        Constants.currState = Constants.GAME_STATE.GameHome;
        this.player.init();
        this.bgCtrl.init();
        this.node.emit(Constants.GAME_EVENT.APPLY_DATA_TO_GAME_PLAY_UI);

        setTimeout(this.startMove.bind(this), 1000);
    }

    startMove(): void {
        if (Constants.currState == Constants.GAME_STATE.GamePlay) return
        Constants.currState = Constants.GAME_STATE.GamePlay;
        this.player.startMove();
        Constants.uiManager.onOpen(1);
        this.bgCtrl.setCheckLayer(true);
        this.node.emit(Constants.GAME_EVENT.START_COUNT_DOWN);
    }

    showResult(): void {
        if (Constants.currState == Constants.GAME_STATE.GameResult) return;
        this.player.stopMove();

        setTimeout(() => {
            Constants.currState = Constants.GAME_STATE.GameResult;
            Constants.uiManager.onOpen(2);
            this.node.emit(Constants.GAME_EVENT.APPLY_DATA_TO_GAME_RESULT_UI);
        }, 1000);
    }

    public enablePhysics(): void {
        cc.director.getPhysicsManager().enabled = Constants.enablePhysics;
        cc.director.getCollisionManager().enabled = Constants.enableCollision;

        if (Constants.enableDebugPhysics) {
            cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
                cc.PhysicsManager.DrawBits.e_jointBit |
                cc.PhysicsManager.DrawBits.e_shapeBit;
        }
    }

    getRatingStar(): number {
        var ratio: number;
        try {
            ratio = Player.countCollisionItem / BackgroundCrl.countCharSpawn;
        } catch (error) {
            ratio = 0;
        }
        if (ratio >= 0.8) return 3;
        if (ratio >= 0.5) return 2;
        if (ratio >= 0.3) return 1;
        return 0;
    }
}
