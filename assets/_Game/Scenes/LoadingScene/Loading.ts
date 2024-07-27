// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends cc.Component {

    @property(String) nameScene: string = 'GamePlay';
    @property time: number = 1;
    @property ratio: number = 0.8;

    @property(cc.Node) loadingBar: cc.Node = null;

    protected onLoad(): void {
        cc.director.preloadScene(this.nameScene);
        if (!this.loadingBar) {
            this.openScene();
            return;
        }
        cc.tween(this.loadingBar)
            .to(this.time * this.ratio, { width: 890 * this.ratio })
            .call(() => {
                this.openScene();

                cc.tween(this.loadingBar)
                    .to(this.time * (1 - this.ratio), { width: 890 })
                    .start();
            })
            .start();
    }

    openScene(): void {
        cc.director.loadScene(this.nameScene);
    }
}
