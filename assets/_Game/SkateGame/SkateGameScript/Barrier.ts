// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Constants } from "../../Scripts/Managers/Constants";
import PoolMember from "./Pool/PoolMember";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Barrier extends PoolMember {

    private _row: number = 0;
    public get row(): number {
        return this._row;
    }

    init(row: number): void {
        this._row = row;
    }

    actionCollider(): boolean {
        // Constants.poolControl.despawn(this.node);
        this.node.active = false;
        return false;
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider): void {
        // if (!this.enableCollision) return;
        // this.enableCollision = false;
        // this.actionCollider();
    }
}
