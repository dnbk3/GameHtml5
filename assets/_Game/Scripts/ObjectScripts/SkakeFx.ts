// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkakeFxCompont extends cc.Component {

    @property shakeDuration = 1;
    @property shakeMagnitude = 20; // Độ lắc lư
    @property shakeSpeed = 1; // Tốc độ lắc

    private elapsedTime: number = 0;

    private nodeObj: cc.Node = null;

    public shake(obj: cc.Node, shakeDuration: number = 1, shakeMagnitude: number = 20, shakeSpeed: number = 1) {

        if (this.nodeObj) {
            this.stopShake();
        }

        this.shakeDuration = shakeDuration;
        this.shakeMagnitude = shakeMagnitude;
        this.shakeSpeed = shakeSpeed;
        this.elapsedTime = 0;
        this.nodeObj = obj;
    }

    stopShake() {
        if (!this.nodeObj) return;
        this.nodeObj.angle = 0;
        this.nodeObj = null;
    }

    protected update(dt: number): void {
        if (!this.nodeObj) return;
        var angle = Math.sin(this.elapsedTime * Math.PI * 4 * this.shakeSpeed) * this.shakeMagnitude;
        this.nodeObj.angle = angle;
        this.elapsedTime += dt;
        if (this.elapsedTime >= this.shakeDuration) {
            this.stopShake();
        }
    }
}
