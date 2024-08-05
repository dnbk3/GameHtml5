// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Constants } from "../../Scripts/Managers/Constants";
import Barrier from "./Barrier";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {


    @property speed: number = 1000;

    public enableMove: boolean = false;
    public row: number = 1;

    init(): void {
        this.enableMove = false;
        this.setAnimIdle();
    }

    setDeactiveMove(): void { }

    startMove(): void {
        this.enableMove = true;
        this.setAnimRun();
    }

    stopMove(): void {
        this.enableMove = false;
        this.setAnimIdle();
    }

    setAnimIdle(): void { }
    setAnimRun(): void { }
    setAnimEat(): void { }
    setAnimJump(): void { }
    setAnimCollider(): void { }

    protected update(dt: number): void {
        if (this.enableMove) {
            this.node.x += this.speed * dt;

            if (this.node.x > Constants.game.bgCtrl.rangeSpawnItem.y + 3000) {
                this.enableMove = false;
            }
        }
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider): void {
        const otherComponent = other.getComponent(Barrier);
        if (!otherComponent) return;
        if (otherComponent.row === this.row) {
            otherComponent.actionCollider();

        }
    }
}
