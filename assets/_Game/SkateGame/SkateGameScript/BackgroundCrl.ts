// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Constants } from "../../Scripts/Managers/Constants";
import LayerGame from "./LayerGame";
import PoolMember from "./Pool/PoolMember";
import { PoolType } from "./Pool/PoolType";
import SimplePool from "./Pool/SimplePool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BackgroundCrl extends cc.Component {

    static countCharSpawn: number = 0;

    @property(LayerGame) layerGame1: LayerGame = null;
    @property(LayerGame) layerGame2: LayerGame = null;

    @property(cc.Vec2) rangeSpawnItem: cc.Vec2 = cc.v2(0, 0);
    @property(cc.Vec2) randomSpace: cc.Vec2 = cc.v2(0, 0);
    @property(cc.Node) finishLine: cc.Node = null;

    private _listItem: PoolMember[] = [];

    private _checkLayer: boolean = false;
    public setCheckLayer(value: boolean) {
        this._checkLayer = value;
    }
    protected lateUpdate(dt: number): void {
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
        this.spawnAllItem();
        this.finishLine.x = this.rangeSpawnItem.y + 2000;
        this.layerGame1.reset();
        this.layerGame2.reset();
    }

    destroyAllItem(): void {
        this._listItem.forEach(item => {
            SimplePool.despawn(item);
        });
    }

    spawnAllItem(): void {
        let i: number;
        for (i = this.rangeSpawnItem.x; i <= this.rangeSpawnItem.y;) {
            this.spawnItem(i);
            i += this.randomDistance();
        }
    }

    spawnItem(posX: number): void {

        let item: PoolMember = SimplePool.spawn(this.randomType(), cc.Vec3.ZERO, 0);
        if (item.poolType == PoolType.ChuCai) {
            item.node.getComponent("ChuCai").setLetter(this.getRandomChar());
            BackgroundCrl.countCharSpawn++;
        }
        item.node.x = posX;
        item.node.y = this.randomY(item);
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

    randomType(): PoolType {
        var i = Math.floor(Math.random() * 4 + 2);
        if (i >= 5) return PoolType.ChuCai;
        return i as PoolType;
    }

    reset(): void {
        this._checkLayer = false;
        this.layerGame1.reset();
        this.layerGame2.reset();
    }

}
