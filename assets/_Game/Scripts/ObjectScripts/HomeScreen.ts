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

    @property(cc.Node) btnStartGame: cc.Node = null;

    protected start(): void {
        this.btnStartGame.active = false;
        setTimeout(this.enableButton.bind(this), 3000);
    }

    enableButton() {
        this.btnStartGame.active = true
    }

    onClickStartGame() {
        Constants.soundManager.playClip(18);
        Constants.uiManager.onClose(0);
        Constants.game.playGame();
    }
}
