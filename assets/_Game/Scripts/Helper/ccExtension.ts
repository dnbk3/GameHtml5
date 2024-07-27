// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// extension viết get set vịtrí world postion thay vì local postion
declare module cc {
  export interface Node {
    getWorldPosition(): cc.Vec3;
    getLocalPosition(pos: cc.Vec3): cc.Vec3;
    setWorldPosition(pos: cc.Vec3): void;
  }
}

cc.Node.prototype.getWorldPosition = function (): cc.Vec3 {
  const worldPos = this.convertToWorldSpaceAR(cc.v3(0, 0, 0));
  return worldPos;
};

cc.Node.prototype.setWorldPosition = function (worldPosition: cc.Vec3) {
  const localPos = this.parent?.convertToNodeSpaceAR(worldPosition);
  this.position = localPos;
};

cc.Node.prototype.getLocalPosition = function (worldPosition: cc.Vec3): cc.Vec3 {
  const localPosition = this.parent?.convertToNodeSpaceAR(worldPosition);
  return localPosition;
};
