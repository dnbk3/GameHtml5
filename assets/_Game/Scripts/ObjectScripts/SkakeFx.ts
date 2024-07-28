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

    private enableShake: boolean = false;
    private elapsedTime: number = 0;
    private originalRotation: cc.Quat = new cc.Quat();
    private quatTmp: cc.Quat = new cc.Quat();

    private nodeObj: cc.Node = null;

    public shake(obj: cc.Node, shakeDuration: number = 1, shakeMagnitude: number = 20, shakeSpeed: number = 1) {

        console.log("shake");

        this.shakeDuration = shakeDuration;
        this.shakeMagnitude = shakeMagnitude;
        this.shakeSpeed = shakeSpeed;
        // StartCoroutine(ShakeObject(obj));

        obj.getRotation(this.originalRotation);
        this.elapsedTime = 0;
        this.enableShake = true;
        this.nodeObj = obj;
    }

    // private IEnumerator ShakeObject(GameObject obj) {
    //     Quaternion originalRotation = obj.transform.localRotation;
    //     float elapsedTime = 0f;

    //     while (elapsedTime < shakeDuration) {
    //         float angle = Mathf.Sin(elapsedTime * Mathf.PI * 4 * shakeSpeed) * shakeMagnitude;
    //         obj.transform.localRotation = originalRotation * Quaternion.Euler(0, 0, angle);

    //         elapsedTime += Time.deltaTime;
    //         yield return null;
    //     }

    //     obj.transform.localRotation = originalRotation;
    // }

    protected update(dt: number): void {
        if (!this.enableShake) return;
        var angle = Math.sin(this.elapsedTime * Math.PI * 4 * this.shakeSpeed) * this.shakeMagnitude;
        this.nodeObj.angle = angle;
        console.log("update");


        this.elapsedTime += dt;
        if (this.elapsedTime >= this.shakeDuration) {
            this.enableShake = false;
            this.nodeObj.angle = 0;
        }
    }
}
