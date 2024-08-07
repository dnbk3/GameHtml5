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
export default class Rao extends Barrier {

    @property(cc.Node) body: cc.Node = null;
    private _collision: cc.Collider = null;
    private _posStart: cc.Vec2;

    protected onLoad(): void {
        this._collision = this.getComponent(cc.Collider);
        this._posStart = this.body.getPosition();
    }

    init(row: number): void {
        super.init(row);
        this.body.angle = 0;
        this._collision.enabled = true;
        this.body.setPosition(this._posStart);
    }

    actionCollider(): boolean {
        this._collision.enabled = false;
        cc.tween(this.body)
            .to(0.2, { angle: -90, y: this._posStart.y + 50 })
            .to(0.1, { opacity: 0 })
            .to(0.1, { opacity: 255 })
            .to(0.1, { opacity: 0 })
            .to(0.1, { opacity: 255 })
            .union()
            .call(() => {
                this.node.active = false;
            })
            .start();
        return false;
    }
}
