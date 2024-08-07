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
export default class PoolControl extends cc.Component {

    @property({ type: cc.Prefab }) prefabs: cc.Prefab[] = [];

    private _nodePool: cc.Node[] = [];

    protected __preload(): void {
        Constants.poolControl = this;
    }

    protected start(): void {
        this.prefabs.forEach((prefab, index) => {
            let node = new cc.Node();
            console.log(node);

            node.active = false;
            this.node.addChild(node);
            this._nodePool.push(node);
        });
    }

    spawn(poolType: number, parentNode: cc.Node = null): cc.Node {
        let child: cc.Node = null;
        if (!this._nodePool[poolType]) {
            console.error(" NEED PRELOAD POOL : " + poolType + "!!!");
            return;
        }

        if (this._nodePool[poolType].children.length > 0) {
            child = this._nodePool[poolType].children[0]
            if (parentNode) {
                // this._nodePool[poolType].removeChild(child);
                child.removeFromParent();
                parentNode.addChild(child);
            }
            child.active = true;
        }
        else {
            child = cc.instantiate(this.prefabs[poolType]);
            if (parentNode) {
                child.removeFromParent();
                parentNode.addChild(child);
            }
            else {
                child.removeFromParent();
                this._nodePool[poolType].addChild(child);
            }
            child.active = true;
        }
        return child;
    }

    despawn(node: cc.Node): void {
        cc.Tween.stopAllByTarget(node);
        const script = node.getComponent(PoolMember);
        if (!script) {
            console.error(" NEED ADD POOL MEMBER SCRIPT TO NODE");
            return;
        }
        const parent = this._nodePool[script.poolType] as cc.Node;
        if (parent != node.parent) {
            node.removeFromParent();
            parent.addChild(node);
        }
        node.active = false;
    }

}
