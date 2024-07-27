import { Constants } from "./Constants";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdsManager extends cc.Component {

  @property(cc.Node) ads: cc.Node = null;

  __preload() {
    Constants.adsManager = this;
  }

  protected onLoad(): void {
    // this.enablePhysics();
  }
  protected start(): void {
    this.ads.active = false;
  }

  public enablePhysics(): void {
    cc.director.getPhysicsManager().enabled = Constants.enablePhysics;
    cc.director.getCollisionManager().enabled = Constants.enableCollision;

    if (Constants.enableDebugPhysics) {
      cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        cc.PhysicsManager.DrawBits.e_jointBit |
        cc.PhysicsManager.DrawBits.e_shapeBit;
    }
  }

  public enableEndCard(): void {
    console.log("enableEndCard");
    this.ads.active = true;
  }

  public isEnableAds(): boolean {
    return this.ads.active;
  }

  public playAds(): void {
    console.log("goToStore");
    window.openStore();
  }
}