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

    @property(cc.Node) body: cc.Node = null;
    @property(cc.ParticleSystem) particle: cc.ParticleSystem = null;
    @property(cc.Node) frameListener: cc.Node = null;

    @property speed: number = 1000;
    private _speed: number = 1000;

    public enableMove: boolean = false;
    public row: number = 1;
    private _tmpRow: number = -1;
    private tweenMoveX: cc.Tween = null;

    protected onLoad(): void {
        this._speed = this.speed;
    }

    init(): void {
        this.enableMove = false;
        this.setAnimIdle();
    }

    private _isSpeedUp: boolean = false;
    private _tweenSpeedDown: cc.Tween = null;
    public speedUp(): void {
        this._speed = this.speed + 1000;
        if (!this._tweenSpeedDown) {
            this._tweenSpeedDown = cc.tween(this)
                .delay(2)
                .call(this.speedDown.bind(this))
        }

        this._tweenSpeedDown.stop();
        this._tweenSpeedDown.start();
    }

    speedDown(): void {
        this._speed = this.speed;
    }

    private _isJumping: boolean = false;
    private _tweenJump: cc.Tween = null;
    jump(): void {
        if (this._isJumping) return;
        this._isJumping = true;
        this.setAnimJump();
        if (!this._tweenJump) {
            this._tweenJump = cc.tween(this.body)
                .to(0.5, { y: 800 }, { easing: 'quadOut' })
                .to(0.5, { y: 265 }, { easing: 'quadIn' })
                .call(() => {
                    this._isJumping = false;
                    this.setAnimRun();
                })
        }

        this._tweenJump.start();
    }

    bindEvent(): void {
        this.frameListener.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.frameListener.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.frameListener.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }
    unbindEvent(): void {
        this.frameListener.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.frameListener.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.frameListener.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    private posStart: cc.Vec2 = cc.v2(0, 0);
    private touched: boolean = false;
    onTouchStart(event: cc.Event.EventTouch): void {
        if (this.touched) return;
        this.posStart = event.getLocation();
        this.touched = true;
    }
    onTouchEnd(event: cc.Event.EventTouch): void {
        if (!this.touched) return;
        this.touched = false;
        const posEnd = event.getLocation().sub(this.posStart);
        if (posEnd.y > 5) {
            this.changeRow(this.row + 1);
        }
        else if (posEnd.y < -5) {
            this.changeRow(this.row - 1);
        }
    }

    changeRow(row: number): void {
        if (row < 0 || row > 2) return;
        this.tweenMoveX && this.tweenMoveX.stop();
        var y = this.getYByRow(row);
        this._tmpRow = row;

        const distance = Math.abs(this.node.y - y);
        const time = distance / this.speed;
        this.tweenMoveX = cc.tween(this.node).to(time, { y: y })
            .call(this._changeRow.bind(this, row)).start();
    }

    private _changeRow(row: number): void {
        this.row = row;
    }

    getYByRow(row: number): number {
        switch (row) {
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

    setDeactiveMove(): void { }

    startMove(): void {
        this.enableMove = true;
        this.setAnimRun();
        this.bindEvent();
    }

    stopMove(): void {
        this.enableMove = false;
        this.setAnimIdle();
        this.unbindEvent();
    }

    setAnimIdle(): void {
        this.particle.node.active = false;
    }
    setAnimRun(): void {
        this.particle.node.active = true;
        this.particle.resetSystem();
    }
    setAnimEat(): void {
        this.particle.node.active = false;
    }
    setAnimJump(): void {
        this.particle.node.active = false;
    }
    setAnimCollider(): void {
        this.particle.node.active = false;
    }

    protected update(dt: number): void {
        if (this.enableMove) {
            this.node.x += this._speed * dt;

            if (this.node.x > Constants.game.bgCtrl.rangeSpawnItem.y + 3000) {
                this.stopMove();
            }
        }
    }

    private checkJump(): boolean {
        if (this.body.y > 300) return true;
        return false;
    }

    onCollisionStay(other: cc.Collider, self: cc.Collider): void {
        const otherComponent = other.getComponent(Barrier);
        if (!otherComponent) return;
        if (this.checkJump()) return;
        if (otherComponent.row === this.row || otherComponent.row === this._tmpRow) {
            otherComponent.actionCollider();
        }
    }
}
