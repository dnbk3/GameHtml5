// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import PoolMember from "../Pool/PoolMember";
import BackgroundCrl from "./BackgroundCrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Vach extends PoolMember {

    private enableEvent: boolean = false;

    init(enableEvent: boolean) {
        this.enableEvent = enableEvent;
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        if (!this.enableEvent) return;
    }

}
