// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import AdsManager from "./AdsManager";
import Game from "./Game";
import SoundManager from "./SoundManager";
import Timeline from "./TimeLine";
import UIManager from "./UIManager";

enum GAME_STATE {
    NONE = "none",
}

enum GAME_EVENT {
    NONE = "none",
}

export class Constants {
    static game: Game;
    static adsManager: AdsManager;
    static soundManager: SoundManager;
    static uiManager: UIManager;
    static timeLine: Timeline;

    static GAME_STATE = GAME_STATE;
    static GAME_EVENT = GAME_EVENT;

    static enableSound: boolean = true;
    static enablePhysics: boolean = false;
    static enableCollision: boolean = false;
    static enableDebugPhysics: boolean = false;

    //=======================================


}

