// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Utilities from "../Helper/Utilities";
import PoolMember from "../Pool/PoolMember";
import { PoolType } from "../Pool/PoolType";
import SimplePool from "../Pool/SimplePool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LayerGame extends cc.Component {

    private listObjectPool: PoolMember[] = [];

    init(distance: number): void {
        this.reset();
        if (distance <= 0) return;

        var i = 0;
        for (i = Utilities.random(100, 200); i < distance - 200;) {
            this.spawnRandomObject(-4096 + i);
        }
    }

    reset(): void {
        this.listObjectPool.forEach(pool => {
            SimplePool.despawn(pool)
        });
    }

    spawnRandomObject(x: number): void {
        
    }

    spawnObject(type: PoolType, pos: cc.Vec2, angle: number = 0): void {
        let obj = SimplePool.spawn(type, cc.Vec3.ZERO, angle);
        obj.node.parent.removeChild(obj.node);
        this.node.addChild(obj.node);
        obj.node.setPosition(pos);
        obj.node.angle = angle;
        this.listObjectPool.push(obj);
    }
}
