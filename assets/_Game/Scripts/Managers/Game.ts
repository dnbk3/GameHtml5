// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Utilities from "../Helper/Utilities";
import Clock from "../ObjectScripts/Clock";
import Player from "../ObjectScripts/Player";
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
    @property([cc.Node]) listNodePosClock: cc.Node[] = [];

    private enableAction: boolean = true;

    private listClock: Clock[] = [];
    private resultTime: number = 0;
    private resultIndex: number = 0;

    protected onLoad(): void {
    }

    protected start(): void {
        this.playGame();
    }

    checkResult(clock: Clock) {
        if (!this.enableAction) return;
        this.enableAction = false;
        if (clock.currentTimeGio == this.resultTime) {
            this.onCorrectAnswer(clock);
        }
        else {
            this.onWrongAnswer();
        }
    }

    onCorrectAnswer(clock: Clock) {
        this.player.playAnimHappy();

        this.listClock.forEach((clockList) => {
            if (clock != clockList) {
                SimplePool.despawn(clockList)
            }
        });

        var targetPos = this.listNodePosClock[3].getPosition().sub(clock.node.parent.getPosition());
        const distance = targetPos.mag();
        const duration = distance / Constants.moveSpeed;
        cc.tween(clock.node)
            .to(duration, { x: targetPos.x, y: targetPos.y, scale: 1 })
            .start();

        setTimeout(this.afterCorrectAnswer.bind(this), 4000);
    }

    afterCorrectAnswer() { }

    onWrongAnswer() {
        this.player.playAnimSad();

        setTimeout(this.afterWrongAnswer.bind(this), 3000);
    }

    afterWrongAnswer() { }

    playGame() {
        this.listClock.forEach((clock) => {
            SimplePool.despawn(clock.getComponent(PoolMember));
        });

        this.getThreePoolType().forEach((poolType, index) => {
            this.spawnClock(poolType, this.listNodePosClock[index]);
        });

        this.settingValue();
        this.applyValue();

        this.node.emit(Constants.GAME_EVENT.START_COUNT_DOWN);
    }

    settingValue() {
        this.resultTime = Math.floor(Math.random() * 12) + 1;
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
    }

    applyValue() {
        this.player.setText(Utilities.getTimeStringFromHour(this.resultTime));
        this.node.emit(Constants.GAME_EVENT.APPLY_DATA_TO_GAME_PLAY_UI, this.resultTime);
        console.log("resultTime: " + this.resultTime);

    }

    stopGame() { }

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
}
