// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Utilities from "../Helper/Utilities";
import Clock from "../ObjectScripts/Clock";
import Player from "../ObjectScripts/Player";
import ResultTimeFrame from "../ObjectScripts/ResuiltTimeFrame";
import SkakeFxCompont from "../ObjectScripts/SkakeFx";
import PoolControl from "../Pool/PoolControl";
import PoolMember from "../Pool/PoolMember";
import SimplePool, { PoolType } from "../Pool/SimplePool";
import AdsManager from "./AdsManager";
import { Constants } from "./Constants";
import SoundManager from "./SoundManager";
import UIManager from "./UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    __preload() {
        Constants.game = this;
    }

    @property(Player) player: Player = null;
    @property(SkakeFxCompont) skakeFx: SkakeFxCompont = null;
    @property([cc.Node]) listNodePosClock: cc.Node[] = [];
    @property(ResultTimeFrame) resultTimeFrame: ResultTimeFrame = null;
    @property(cc.Node) rays: cc.Node = null;

    private enableAction: boolean = false;

    private listClock: Clock[] = [];
    private resultTime: number = 0;
    private resultIndex: number = 0;
    private questionCount: number = 0;

    private enableCountTime: boolean = false;
    private timeCount: number = 6;

    private prevalTime: number = -1;

    protected update(dt: number): void {
        if (!this.enableCountTime) return;
        this.timeCount -= dt;
        if (this.timeCount <= 0) {
            this.showRecoment();
            this.timeCount = 6;
        }
    }

    private initCountTime() {
        this.enableCountTime = true;
        this.timeCount = 6;
    }

    showRecoment() {
        if (!this.enableAction) return;
        this.listClock[this.resultIndex].showShadow(1.9);
        this.skakeFx.shake(this.listClock[this.resultIndex].node, 1.9, 5, 5, true);
    }

    protected onLoad(): void {
    }

    protected start(): void {
        Constants.uiManager.onOpen(0);
    }

    checkResult(clock: Clock) {
        if (!this.enableAction) return;
        this.enableAction = false;
        this.skakeFx.stopShake();
        if (clock.currentTimeGio == this.resultTime) {
            this.onCorrectAnswer(clock);
        }
        else {
            this.onWrongAnswer();
        }
    }

    onCorrectAnswer(clock: Clock) {

        this.player.playAnimHappy();
        this.activeRay(false);
        this.listClock.forEach((clockList) => {
            if (clock != clockList) {
                SimplePool.despawn(clockList)
            }
        });

        var random = Math.floor((Math.random() * 3) + 12);
        Constants.soundManager.playClip(random);

        var targetPos = this.listNodePosClock[3].getPosition().sub(clock.node.parent.getPosition());
        const distance = targetPos.mag();
        const duration = distance / Constants.moveSpeed;
        cc.tween(clock.node)
            .to(duration, { x: targetPos.x, y: targetPos.y, scale: 1.2 })
            .call(() => {
                this.resultTimeFrame.setTime(this.resultTime);
                this.skakeFx.shake(clock.node, 1.5)
            })
            .start();

        setTimeout(this.afterCorrectAnswer.bind(this), 4000);
    }

    afterCorrectAnswer() {
        this.questionCount++;
        this.resultTimeFrame.setDeactive();
        if (this.questionCount >= 5) {
            this.stopGame();
            Constants.uiManager.onOpen(2);
            this.node.emit(Constants.GAME_EVENT.APPLY_DATA_TO_GAME_RESULT_UI);
        }
        else {
            this.initQuestion();
            this.player.playAnimIdle();
        }
    }

    onWrongAnswer() {
        this.player.playAnimSad();
        var random = Math.floor((Math.random() * 2) + 15);
        Constants.soundManager.playClip(random);
        setTimeout(this.afterWrongAnswer.bind(this), 3000);
    }

    afterWrongAnswer() {
        this.enableAction = true;
        this.initCountTime();
        this.player.playAnimIdle();
    }

    playGame() {
        this.activeRay(true);
        Constants.uiManager.onOpen(1);
        this.questionCount = 0;
        this.player.playAnimIdle();
        this.initQuestion();
        this.node.emit(Constants.GAME_EVENT.START_COUNT_DOWN);
    }

    initQuestion() {
        this.enableAction = true;
        this.initCountTime();
        this.listClock.forEach((clock) => {
            SimplePool.despawn(clock.getComponent(PoolMember));
        });
        this.listClock = [];

        this.getThreePoolType().forEach((poolType, index) => {
            this.spawnClock(poolType, this.listNodePosClock[index]);
        });

        this.settingValue();
        this.applyValue();

        Constants.soundManager.playClip(this.resultTime - 1);
    }

    settingValue() {
        this.resultTime = Math.floor(Math.random() * 12) + 1;
        while (this.resultTime == this.prevalTime) {
            this.resultTime = Math.floor(Math.random() * 12) + 1;
        }

        var time1 = Utilities.getRandomIntIgnore(1, 13, this.resultTime);
        var time2 = Utilities.getRandomIntIgnore(1, 13, this.resultTime);
        while (time1 == time2) {
            time2 = Utilities.getRandomIntIgnore(1, 13, this.resultTime);
        }

        this.resultIndex = Math.floor(Math.random() * 3);
        var checkTmp = true;

        this.listClock.forEach((clock, index) => {
            if (index == this.resultIndex) {
                clock.setGio(this.resultTime);
            } else {
                if (checkTmp) {
                    clock.setGio(time1);
                    checkTmp = false;
                }
                else {
                    clock.setGio(time2);
                    checkTmp = false;
                }
            }
        });

        this.prevalTime = this.resultTime;
    }

    applyValue() {
        this.player.setText(Utilities.getTimeStringFromHour(this.resultTime));
        this.node.emit(Constants.GAME_EVENT.APPLY_DATA_TO_GAME_PLAY_UI, this.resultTime);
    }

    stopGame() {
        this.enableAction = false;
        this.node.emit(Constants.GAME_EVENT.STOP_COUNT_DOWN);
    }

    spawnClock(poolType: PoolType, parent: cc.Node) {
        let clock = SimplePool.spawnT<Clock>(poolType, cc.Vec3.ZERO, 0);
        clock.node.setParent(parent);
        clock.node.setPosition(cc.Vec3.ZERO);
        clock.node.setScale(0.7);
        this.listClock.push(clock);
    }

    getThreePoolType(): PoolType[] {
        var arrPoolType = [PoolType.Clock1, PoolType.Clock2, PoolType.Clock3, PoolType.Clock4];
        var int = Math.floor(Math.random() * 4);
        arrPoolType.splice(int, 1);
        return arrPoolType;
    }

    getRatingStar(): number {
        if (this.questionCount < 3) {
            return 1;
        }
        else if (this.questionCount <= 5) {
            return 2;
        }
        else {
            return 3;
        }
    }

    activeRay(active: boolean) {
        this.rays.active = active;
    }
}
