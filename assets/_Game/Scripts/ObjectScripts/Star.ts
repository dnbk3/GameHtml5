// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Constants } from "../Managers/Constants";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Stars extends cc.Component {

    @property([cc.Node]) stars: cc.Node[] = [];

    protected onLoad(): void {
        this.hideAllStar();
    }

    setStar(index: number, delay: number = 0) {
        this.hideAllStar();
        this.stars.forEach((star, i) => {
            if (i < index) {
                this.showStar(i, delay + 0.3 * i);
            }
        });

        setTimeout(() => {
            Constants.soundManager.playClip(12);
        }, delay * 1000 + index * 300 + 200);
    }

    showStar(index: number, delay: number = 0) {
        const element = this.stars[index].children[0];
        element.active = true;
        element.setScale(0);
        cc.tween(element)
            .delay(delay)
            .call(() => {
                Constants.soundManager.playClip(13);
            })
            .to(0.8, { scale: 1 }, { easing: 'backOut' })
            .start();
    }

    hideAllStar() {
        this.stars.forEach(star => {
            star.children[0].active = false;
        });
    }
}
