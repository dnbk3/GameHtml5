// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Constants } from "../../../Scripts/Managers/Constants";
import PoolMember from "./PoolMember";

const { ccclass, property } = cc._decorator;

@ccclass
export default class VFX extends PoolMember {

    @property([cc.ParticleSystem])
    anim: cc.ParticleSystem[] = [];

    @property({ type: cc.Float })
    timeAlive: number = 1;

    public play(): void {
        this.node.active = true;
        this.anim.forEach((anim) => {
            anim.resetSystem();
        });

        // cc.tween(this.node).delay(0.5).call(()=> SimplePool.despawn(this));
        //delay 0.5s thi despawn
        setTimeout(() => {
            this.node.active = false;
        }, this.timeAlive * 1000);
    }
}
