// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Barrier from "./Barrier";
import SimplePool from "./Pool/SimplePool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChuCai extends Barrier {

    @property(cc.Label) label: cc.Label = null;
    @property(cc.String) letter: string = '';

    init(row: number): void {
        super.init(row);
        this.label.string = this.letter;
    }

    setLetter(letter: string): void {
        this.letter = letter;
        this.label.string = letter;
    }

    actionCollider(): boolean {
        SimplePool.despawn(this);
        return true;
    }

}
