// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import PoolMember from "../../Scripts/Pool/PoolMember";
import { PoolType } from "../../Scripts/Pool/PoolType";
import SimplePool from "../../Scripts/Pool/SimplePool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Barrier extends PoolMember {

    private enableCollision: boolean = false;

    private _row: number = 0;
    public get row(): number {
        return this._row;
    }

    init(row: number): void {
        this.enableCollision = false;
        this._row = row;
    }

    actionCollider(): void {
        // SimplePool.spawn(PoolType.VFX, this.node.getWorldPosition(), 0);
        SimplePool.despawn(this);
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider): void {
        // if (!this.enableCollision) return;
        // this.enableCollision = false;
        // this.actionCollider();
    }
}
