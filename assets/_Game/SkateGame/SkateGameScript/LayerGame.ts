// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html


const { ccclass, property } = cc._decorator;

@ccclass
export default class LayerGame extends cc.Component {

    private _posStart: cc.Vec2 = cc.v2(0, 0);

    private _stepDis: number = 0;

    protected onLoad(): void {
        this._posStart = this.node.getPosition();
    }

    reset(): void {
        this.node.setPosition(this._posStart);
    }

    getRange(): cc.Vec2 {
        return cc.v2(this.node.position.x - 2048, this.node.position.x + 2048);
    }

}
