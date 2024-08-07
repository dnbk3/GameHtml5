// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import BackgroundCrl from "../../SkateGame/SkateGameScript/BackgroundCrl";
import Player from "../../SkateGame/SkateGameScript/Player";
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
        this.player.stopMove();
        Constants.currState = Constants.GAME_STATE.NONE;
        // setTimeout(() => {
        //     this.showResult();
        // }, time * 1000);
        cc.tween(this.node).delay(time).call(this.showResult.bind(this)).start();
    }

    initGame(): void {
        if (Constants.currState == Constants.GAME_STATE.GameHome) return
        Constants.currState = Constants.GAME_STATE.GameHome;
        Constants.soundManager.playClip(0, true);
        setTimeout(() => {
            Constants.soundManager.playClip(1);
        }, 500);

        this.player.init();
        this.bgCtrl.init();
        Constants.uiManager.onOpen(0);
        this.node.emit(Constants.GAME_EVENT.APPLY_DATA_TO_GAME_PLAY_UI);
        this.node.emit(Constants.GAME_EVENT.COUNT_DOWN_HOMESCREEN, 1);
        Constants.uiManager.onOpen(1);
        setTimeout(this.startMove.bind(this), 5000);
        // cc.tween(this.node).delay(5).call(this.startMove.bind(this)).start();
    }

    startMove(): void {
        if (Constants.currState == Constants.GAME_STATE.GamePlay) return
        Constants.currState = Constants.GAME_STATE.GamePlay;
        this.player.startMove();
        this.bgCtrl.setCheckLayer(true);
        console.log("startMove");

        this.node.emit(Constants.GAME_EVENT.START_COUNT_DOWN);
    }

    showResult(): void {
        if (Constants.currState == Constants.GAME_STATE.GameResult) return;
        this.player.stopMove();

        setTimeout(() => {
            Constants.currState = Constants.GAME_STATE.GameResult;
            Constants.uiManager.onClose(1);
            Constants.uiManager.onOpen(2);
            this.node.emit(Constants.GAME_EVENT.APPLY_DATA_TO_GAME_RESULT_UI);
        }, 1000);
    }

    public enablePhysics(): void {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;

        // if (Constants.enableDebugPhysics) {
        //     cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //         cc.PhysicsManager.DrawBits.e_jointBit |
        //         cc.PhysicsManager.DrawBits.e_shapeBit;
        // }
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
