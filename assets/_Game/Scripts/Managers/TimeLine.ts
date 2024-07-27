// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Constants } from "./Constants";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Timeline extends cc.Component {

    private currTime: number = 0;
    private timeLine: Array<TimeValue> = new Array<TimeValue>();

    __preload() {
        Constants.timeLine = this;
    }

    pushTime(time: number, fun: Function) {
        this.timeLine.push(new TimeValue(time + this.currTime, fun));
        this.sort();
    }

    sort() {
        this.timeLine.sort((a, b) => a.getTime() - b.getTime());
    }

    protected update(dt: number): void {
        this.currTime += dt;
        this.checkFireEvent();
    }

    checkFireEvent() {
        if (!this.timeLine[0]) return;

        if (this.currTime >= this.timeLine[0].getTime()) {
            var rs = this.timeLine[0].fire();
            this.timeLine.shift();
            rs && this.checkFireEvent();
        }
    }
}

class TimeValue {
    private time: number = 0;
    private fun: Function = null;

    constructor(time: number, fun: Function) {
        this.time = time;
        this.fun = fun;
    }

    getTime(): number {
        return this.time;
    }

    getFunction(): Function {
        return this.fun;
    }

    fire(): Boolean {
        if (this.fun != null) {
            this.fun();
            return true;
        }
        return false;
    }
}
