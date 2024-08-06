// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Constants } from "../Managers/Constants";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HomeScreen extends cc.Component {

    @property(cc.Label) label: cc.Label = null;

    protected onLoad(): void {
        Constants.game.node.on(Constants.GAME_EVENT.COUNT_DOWN_HOMESCREEN, this.showCountDown, this);
    }

    protected start(): void {
    }

    showCountDown(timeDelay: number): void {
        console.log("showCountDown```");
        cc.tween(this.label.node)
            .delay(timeDelay)
            .call(() => {
                this.label.node.active = true;
                this.label.string = "3";
            })
            .to(0, { scale: 1.5 })
            .to(0.5, { scale: 1 })
            .delay(0.5)
            .call(() => {
                this.label.string = "2";
            })
            .to(0, { scale: 1.5 })
            .to(0.5, { scale: 1 })
            .delay(0.5)
            .call(() => {
                this.label.string = "1";
            })
            .to(0, { scale: 1.5 })
            .to(0.5, { scale: 1 })
            .delay(0.5)
            .call(() => {
                this.label.string = "Start!";
            })
            .to(0, { scale: 1.5 })
            .to(0.5, { scale: 1 })
            .delay(0.5)
            .call(() => {
                this.label.node.active = false;
            })
            .start();
    }
}
