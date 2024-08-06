// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraController extends cc.Component {

    @property(cc.Node) target: cc.Node = null;

    private posStart: cc.Vec3;

    protected onLoad(): void {
        this.posStart = this.node.getWorldPosition();
    }


    protected update(dt: number): void {
        if (this.target) {
            this.node.setWorldPosition(cc.v3(Math.max(this.target.getWorldPosition().x + 300, this.posStart.x), this.posStart.y, this.posStart.z));
        }
    }
}
