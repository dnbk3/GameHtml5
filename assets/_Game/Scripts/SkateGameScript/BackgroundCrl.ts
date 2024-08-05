// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Constants } from "../Managers/Constants";
import { PoolType } from "../Pool/PoolType";
import LayerGame from "./LayerGame";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BackgroundCrl extends cc.Component {

    @property(LayerGame) layer1: LayerGame = null;
    @property(LayerGame) layer2: LayerGame = null;
    @property(cc.Node) bgLayer1: cc.Node = null;
    @property(cc.Node) bgLayer2: cc.Node = null;
    @property speed: number = 1000;

    @property(cc.Boolean) private enableMove: boolean = false;

    private _prePosLayer1: cc.Vec2;
    private _prePosLayer2: cc.Vec2;
    private _prePosBgLayer1: cc.Vec2;
    private _prePosBgLayer2: cc.Vec2;

    private _distance: number = 0;
    private _targetDistance: number = 0;

    protected onLoad(): void {
        this._prePosLayer1 = this.layer1.node.getPosition();
        this._prePosLayer2 = this.layer2.node.getPosition();
        this._prePosBgLayer1 = this.bgLayer1.getPosition();
        this._prePosBgLayer2 = this.bgLayer2.getPosition();
    }

    init(targetDis: number) {
        this._targetDistance = targetDis;
        this.reset();


        setTimeout(this.moveBackground.bind(this, true), 5000);
    }

    reset(): void {
        this.layer1.node.setPosition(this._prePosLayer1);
        this.layer2.node.setPosition(this._prePosLayer2);
        this.bgLayer1.setPosition(this._prePosBgLayer1);
        this.bgLayer2.setPosition(this._prePosBgLayer2);

        this.layer1.spawnObject(PoolType.Vach, cc.v2(-400, -35), 41);

        this._distance = 0;
        this.moveBackground(false);

    }

    moveBackground(val: boolean): void {
        this.enableMove = val;
    }

    protected update(dt: number): void {
        if (!this.enableMove) return;

        this.layer1.node.x -= dt * Constants.moveSpeed;
        this.layer2.node.x -= dt * Constants.moveSpeed;
        this.bgLayer1.x -= dt * Constants.moveSpeed / 2;
        this.bgLayer2.x -= dt * Constants.moveSpeed / 2;

        this._distance += dt * Constants.moveSpeed;

        if (this.layer1.node.x <= -8192) {
            this.layer1.node.x += 8192 * 2;
        }

        if (this.layer2.node.x <= -8192) {
            this.layer2.node.x += 8192 * 2;
        }

        if (this.bgLayer1.x <= -8192) {
            this.bgLayer1.x += 8192 * 2;
        }

        if (this.bgLayer2.x <= -8192) {
            this.bgLayer2.x += 8192 * 2;
        }

        if (this._distance >= this._targetDistance) {
            this.enableMove = false;
        }
    }
}
