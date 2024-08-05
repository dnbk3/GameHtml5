// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Constants } from "../../Scripts/Managers/Constants";
import PoolMember from "../../Scripts/Pool/PoolMember";
import { PoolType } from "../../Scripts/Pool/PoolType";
import SimplePool from "../../Scripts/Pool/SimplePool";
import LayerGame from "./LayerGame";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BackgroundCrl extends cc.Component {

    @property(cc.Vec2) rangeSpawnItem: cc.Vec2 = cc.v2(0, 0);
    @property(cc.Vec2) randomSpace: cc.Vec2 = cc.v2(0, 0);
    @property(cc.Node) finishLine: cc.Node = null;

    private _listItem: PoolMember[] = [];

    protected onLoad(): void {

    }

    init(): void {
        this.destroyAllItem();
        this.spawnAllItem();
        this.finishLine.x = this.rangeSpawnItem.y + 2000;
    }

    destroyAllItem(): void {
        this._listItem.forEach(item => {
            SimplePool.despawn(item);
        });
    }

    spawnAllItem(): void {
        let i: number;
        for (i = this.rangeSpawnItem.x; i <= this.rangeSpawnItem.y;) {
            this.spawnItem(i);
            i += this.randomDistance();
        }
    }

    spawnItem(posX: number): void {

        let item: PoolMember = SimplePool.spawn(this.randomType(), cc.Vec3.ZERO, 0);
        item.node.x = posX;
        item.node.y = this.randomY();
        this._listItem.push(item);
    }

    randomDistance(): number {
        return Math.random() * (this.randomSpace.y - this.randomSpace.x) + this.randomSpace.x;
    }

    randomY(): number {
        var i = Math.floor(Math.random() * 3);

        switch (i) {
            case 0:
                return -250;
            case 1:
                return 0;
            case 2:
                return 250;
            default:
                return 0;
        }
    }

    randomType(): PoolType {
        return Math.floor(Math.random() * 3 + 2) as PoolType;
    }

}
