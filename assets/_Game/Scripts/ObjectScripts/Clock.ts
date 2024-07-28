// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Constants } from "../Managers/Constants";
import PoolMember from "../Pool/PoolMember";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Clock extends PoolMember {

    @property(cc.Node) kg: cc.Node = null;
    @property(cc.Node) kp: cc.Node = null;

    private _currentTimeGio: number = 0;
    private _currentTimePhut: number = 0;

    public get currentTimeGio(): number {
        return this._currentTimeGio;
    }

    public get currentTimePhut(): number {
        return this._currentTimePhut;
    }

    protected start(): void {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    private onTouchEnd() {
        Constants.game.checkResult(this);
    }

    setGio(gio: number) {
        let goc = 360 / 12 * gio;
        this.kg.angle = -goc;

        this.kp.angle = 0;

        this._currentTimeGio = gio;
        this._currentTimePhut = 0;
    }

    setTime(gio: number, phut: number) {
        let goc = 360 / 12 * gio + 360 / 12 / 60 * phut;
        let poc = 360 / 60 * phut;
        this.kg.angle = -goc;
        this.kp.angle = -poc;

        this._currentTimeGio = gio;
        this._currentTimePhut = phut;
    }

    setTimeRandomIgnoreGio(gio: number) {
        let gioRandom = Math.floor(Math.random() * 12);
        while (gioRandom == gio) {
            gioRandom = Math.floor(Math.random() * 12);
        }

        this.setGio(gioRandom);
    }
}
