// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Clock from "../ObjectScripts/Clock";
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

    @property([cc.Node]) listNodePosClock: cc.Node[] = [];

    private listClock: Clock[] = [];

    protected onLoad(): void {
    }

    protected start(): void {
        this.playGame();
    }

    playGame() {
        this.listClock.forEach((clock) => {
            SimplePool.despawn(clock.getComponent(PoolMember));
        });

        //TODO random pool type nhe

        this.spawnClock(PoolType.Clock1, this.listNodePosClock[0]);
        this.spawnClock(PoolType.Clock2, this.listNodePosClock[1]);
        this.spawnClock(PoolType.Clock3, this.listNodePosClock[2]);
    }

    StopGame() { }

    spawnClock(poolType: PoolType, parent: cc.Node) {
        let clock = SimplePool.spawnT<Clock>(poolType, cc.Vec3.ZERO, 0);
        clock.node.setParent(parent);
        clock.node.setPosition(cc.Vec3.ZERO);
        this.listClock.push(clock);
    }
}
