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

    @property(cc.Animation) body: cc.Animation = null;
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
        this.idle();
    }

    init(): void {
        this.enableMove = false;
        this.setAnimIdle();
    }

    private _tweenSpeedNor: cc.Tween = null;
    public speedUp(valUp: number): void {
        this._speed = this.speed + valUp;
        if (!this._tweenSpeedNor) {
            this._tweenSpeedNor = cc.tween(this)
                .delay(2)
                .call(this.speedNormal.bind(this))
        }

        this._tweenSpeedNor.stop();
        this._tweenSpeedNor.start();
    }

    speedNormal(): void {
        this._speed = this.speed;
    }

    private _isJumping: boolean = false;
    private _tweenJump: cc.Tween = null;
    jump(): void {
        if (this._isJumping) return;
        this._isJumping = true;
        this.setAnimJump();
        if (!this._tweenJump) {
            this._tweenJump = cc.tween(this.body.node)
                .to(0.5, { y: 600 }, { easing: 'quadOut' })
                .to(0.5, { y: 265 }, { easing: 'quadIn' })
                .call(() => {
                    this._isJumping = false;
                    this.setAnimRun();
                })
                .union()
        }
        this._tweenJump.start();
    }

    stopJump(): void {
        if (!this._isJumping) return;
        this._isJumping = false;
        this._tweenJump && this._tweenJump.stop();
        this.body.node.y = 265;
        this.setAnimRun();
    }

    private _tweenWaitChangeAnim: cc.Tween = null;
    run(): void {
        this.particle.node.active = true;
        this.particle.resetSystem();
        this._tweenWaitChangeAnim && this._tweenWaitChangeAnim.stop();
        this.setAnimRun();
    }

    eatChar(): void {
        this.setAnimEat();
        // this.stopJump();
        this._tweenWaitChangeAnim && this._tweenWaitChangeAnim.stop();
        this._tweenWaitChangeAnim = cc.tween(this.body.node)
            .delay(1)
            .call(this.setAnimRun.bind(this)).start();
    }

    collision(): void {
        this.setAnimCollider();
        // this.stopJump();
        this._tweenWaitChangeAnim && this._tweenWaitChangeAnim.stop();
        this._tweenWaitChangeAnim = cc.tween(this.body.node)
            .delay(1.5)
            .call(this.setAnimRun.bind(this)).start();
    }

    idle(): void {
        this.particle.node.active = false;
        this._tweenWaitChangeAnim && this._tweenWaitChangeAnim.stop();
        this.setAnimIdle();
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
        this.run();
        this.bindEvent();
    }

    stopMove(): void {
        this.enableMove = false;
        this.idle();
        Constants.uiManager.onClose(1);
        this.unbindEvent();
    }

    setAnimIdle(): void {
        this.body.play("Idle");
    }
    setAnimRun(): void {
        this.body.play("Run");
    }
    setAnimEat(): void {
        this.body.play("Eat");
    }
    setAnimJump(): void {
        this.body.play("Jump");
    }
    setAnimCollider(): void {
        this.body.play("Collision");
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
        if (this.body.node.y > 300) return true;
        return false;
    }

    onCollisionStay(other: cc.Collider, self: cc.Collider): void {
        const otherComponent = other.getComponent(Barrier);
        if (!otherComponent) return;
        if (this.checkJump()) return;
        if (otherComponent.row === this.row || otherComponent.row === this._tmpRow) {
            const check = otherComponent.actionCollider();
            if (check) {
                this.speedUp(1000);
                this.eatChar();
            }
            else {
                this.speedUp(-500);
                this.collision();
            }
        }
    }
}
