// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Constants } from "../../Scripts/Managers/Constants";
import Barrier from "./Barrier";
import LayerGame from "./LayerGame";
import PoolMember from "./Pool/PoolMember";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BackgroundCrl extends cc.Component {

    static countCharSpawn: number = 0;

    @property(cc.Node) parentItem: cc.Node = null;

    @property(LayerGame) layerGame1: LayerGame = null;
    @property(LayerGame) layerGame2: LayerGame = null;

    @property(cc.Vec2) rangeSpawnItem: cc.Vec2 = cc.v2(0, 0);
    @property(cc.Vec2) randomSpace: cc.Vec2 = cc.v2(0, 0);
    @property(cc.Node) finishLine: cc.Node = null;

    private _listItem: PoolMember[] = [];

    protected onLoad(): void {
        this.parentItem.children.forEach(item => {
            this._listItem.push(item.getComponent(PoolMember));
        });
    }

    private _checkLayer: boolean = false;
    public setCheckLayer(value: boolean) {
        this._checkLayer = value;
    }
    protected update(dt: number): void {
        if (!this._checkLayer) return;
        const posPlayer = Constants.game.player.node.getPosition();
        const range1 = this.layerGame1.getRange();
        if (posPlayer.x > range1.x && posPlayer.x < range1.y) {
            this.checkLayer(this.layerGame1, this.layerGame2);
            return;
        }

        const range2 = this.layerGame2.getRange();
        if (posPlayer.x > range2.x && posPlayer.x < range2.y) {
            this.checkLayer(this.layerGame2, this.layerGame1);
            return;
        }

    }

    private checkLayer(layerBefore: LayerGame, layerAfter: LayerGame) {
        const distance = layerAfter.node.position.x - layerBefore.node.position.x;
        if (Math.abs(distance - 8192) < 5) return;
        const posBefore = layerBefore.node.getPosition();
        layerAfter.node.setPosition(posBefore.x + 8192, posBefore.y);
    }

    init(): void {
        BackgroundCrl.countCharSpawn = 0;
        this.destroyAllItem();
        this.shuffleArray();
        this.spawnAllItem();
        this.finishLine.x = this.rangeSpawnItem.y + 2000;
        this.layerGame1.reset();
        this.layerGame2.reset();
    }

    destroyAllItem(): void {
        this._listItem.forEach(item => {
            item.node.active = false;
        });
    }

    shuffleArray(): void {
        for (let i = this._listItem.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this._listItem[i], this._listItem[j]] = [this._listItem[j], this._listItem[i]];
        }
    }

    spawnAllItem(): void {
        let i: number;
        let index: number = 0;
        for (i = this.rangeSpawnItem.x; i <= this.rangeSpawnItem.y;) {
            if (index >= this._listItem.length) break;
            this.spawnItem(i, index);
            i += this.randomDistance();
            index++;
        }
    }

    spawnItem(posX: number, index): void {
        let item = this._listItem[index];
        item.node.active = true;
        if (item.poolType === 5) {
            item.node.getComponent("ChuCai").setLetter(this.getRandomChar());
            BackgroundCrl.countCharSpawn++;
        }
        item.node.setPosition(posX, this.randomY(item));
        this._listItem.push(item);
    }

    getRandomChar(): String {
        return Constants.dataChar[Math.floor(Math.random() * Constants.dataChar.length)];
    }

    randomDistance(): number {
        return Math.random() * (this.randomSpace.y - this.randomSpace.x) + this.randomSpace.x;
    }

    randomY(poolMember: PoolMember): number {
        var i = Math.floor(Math.random() * 3);
        poolMember.init(i);
        switch (i) {
            case 0:
                return -250;
            case 1:
                return 0;
            case 2:
                return 250;
            default:
                return 0;
        }
    }

    randomType(): number {
        var i = Math.floor(Math.random() * 4 + 2);
        if (i >= 5) return 5;
        return i;
    }

    reset(): void {
        this._checkLayer = false;
        this.layerGame1.reset();
        this.layerGame2.reset();
    }

}
