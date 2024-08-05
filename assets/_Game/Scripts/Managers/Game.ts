// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import SkakeFxCompont from "../ObjectScripts/SkakeFx";
import BackgroundCrl from "../SkateGameScript/BackgroundCrl";
import { Constants } from "./Constants";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    __preload() {
        Constants.game = this;
    }

    @property(SkakeFxCompont) skakeFx: SkakeFxCompont = null;
    @property(BackgroundCrl) backgroundCtrl: BackgroundCrl = null;

    protected start(): void {
        this.startGame();
    }

    //----- start game

    startGame() {
        this.backgroundCtrl.init(20000);
    }
}
