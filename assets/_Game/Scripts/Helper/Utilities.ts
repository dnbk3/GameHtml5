
const { ccclass, property } = cc._decorator;

@ccclass
export default class Utilities {

  //chuyen vector 3 sang vector 2
  public static vec3ToVec2(v: cc.Vec3): cc.Vec2 {
    return cc.v2(v.x, v.y);
  }

  //chuyen vector 2 sang vector 3
  public static vec2ToVec3(v: cc.Vec2): cc.Vec3 {
    return cc.v3(v.x, v.y, 0);
  }

  public static formatTime(time: number): string {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    let minutesString = minutes < 10 ? '0' + minutes : minutes;
    let secondsString = seconds < 10 ? '0' + seconds : seconds;

    return minutesString + ':' + secondsString;
  }

  public static random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  public static vectorToAngle(v: cc.Vec2 | cc.Vec3): number {
    return Math.atan2(v.y, v.x) * 180 / Math.PI;
  }
}
