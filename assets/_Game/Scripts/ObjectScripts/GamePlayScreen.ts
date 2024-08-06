// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Utilities from "../Helper/Utilities";
import { Constants } from "../Managers/Constants";
import Timer from "./Timer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlayScreen extends cc.Component {

    @property(cc.Label) timeLabel: cc.Label = null;
    @property countTime: number = 0;

    @property(cc.ParticleSystem) particle1: cc.ParticleSystem = null;
    @property(cc.ParticleSystem) particle2: cc.ParticleSystem = null;


    private _currtime: number = 0;
    private _enableCountTime: boolean = false;

    onButtonJumpClick(): void {
        if (Constants.currState != Constants.GAME_STATE.GamePlay) return;
        Constants.game.player.jump();
    }

    protected start(): void {
        Constants.game.node.on(Constants.GAME_EVENT.START_COUNT_DOWN, this.startCountTime, this);
        Constants.game.node.on(Constants.GAME_EVENT.STOP_COUNT_DOWN, this.stopCountTime, this);
        Constants.game.node.on(Constants.GAME_EVENT.APPLY_DATA_TO_GAME_PLAY_UI, this.init, this);
        Constants.game.node.on(Constants.GAME_EVENT.PLAY_PARTICLE, this.playParticle, this);
        this.init();
    }

    onButtonBackClick(): void { }

    init() {
        this._currtime = this.countTime;
        this._enableCountTime = false;

        this.timeLabel.string = Utilities.formatTime(this._currtime);

        this.stopParticle();
    }

    startCountTime(): void {
        console.log("startCountTime");

        this._enableCountTime = true;
    }

    stopCountTime(): void {
        this._enableCountTime = false;
    }

    update(dt: number): void {
        if (this._enableCountTime) {
            this._currtime -= dt;
            if (this._currtime <= 0) {
                this._currtime = 0;
                this._enableCountTime = false;
                Constants.game.showResult();
            }

            this.timeLabel.string = Utilities.formatTime(this._currtime);
        }
    }

    playParticle(): void {

        this.particle1.node.active = true;
        this.particle2.node.active = true;

        this.particle1.resetSystem();
        this.particle2.resetSystem();

        setTimeout(this.stopParticle.bind(this), 3000);
    }

    stopParticle(): void {
        this.particle1.stopSystem();
        this.particle2.stopSystem();
        this.particle1.node.active = false;
        this.particle2.node.active = false;
    }
}
