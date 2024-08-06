// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Game from "./Game";
import SoundManager from "./SoundManager";
import Timeline from "./TimeLine";
import UIManager from "./UIManager";

enum GAME_STATE {
    NONE = "none",
    GameHome = "game_home",
    GamePlay = "game_play",
    GameResult = "game_result",
}

enum GAME_EVENT {
    NONE = "none",
    APPLY_DATA_TO_GAME_PLAY_UI = "apply_data_to_game_play_ui",
    APPLY_DATA_TO_GAME_RESULT_UI = "apply_data_to_game_result_ui",
    START_COUNT_DOWN = "start_count_down",
    STOP_COUNT_DOWN = "stop_count_down",
    PLAY_PARTICLE = "play_particle",

    COUNT_DOWN_HOMESCREEN = "count_down_home_screen",
}

export class Constants {
    static game: Game;
    static soundManager: SoundManager;
    static uiManager: UIManager;
    static timeLine: Timeline;

    static GAME_STATE = GAME_STATE;
    static GAME_EVENT = GAME_EVENT;
    static currState: GAME_STATE = GAME_STATE.NONE;

    static enableSound: boolean = true;
    static enablePhysics: boolean = false;
    static enableCollision: boolean = true;
    static enableDebugPhysics: boolean = false;

    //=======================================

    static moveSpeed: number = 1000;
    static dataChar: String[] = ["H", "h"];
}

