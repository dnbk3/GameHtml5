// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Constants } from "./Constants";

const { ccclass, property, disallowMultiple } = cc._decorator;

export enum AudioType {

}


@ccclass
@disallowMultiple
export default class SoundManager extends cc.Component {

    @property([cc.AudioClip]) clips: cc.AudioClip[] = [];

    private audies: cc.AudioSource[] = [];

    __preload() {
        Constants.soundManager = this;
    }

    protected start(): void {
        for (let i = 0; i < this.clips.length; i++) {
            let node = new cc.Node().addComponent(cc.AudioSource);
            node.clip = this.clips[i];
            this.audies.push(node);
        }
        this.eventSound();
    }

    public playClip(type: AudioType, loop: boolean = false, volume: number = 1): void {
        if (!Constants.enableSound) return;

        this.audies[type].volume = volume;
        this.audies[type].loop = loop;
        this.audies[type].play();
    }

    public stopClip(type: AudioType): void {
        this.audies[type].stop();
    }

    public eventSound() {
        window.addEventListener("audioChanged", (e: CustomEvent) => {
            if (e.detail.mute) {
                this.muteAll();
            } else {
                this.unMuteAll();
            }
        });
    }

    public muteAll(): void {
        for (let i = 0; i < this.audies.length; i++) {
            this.audies[i].mute = true;
        }
    }

    public unMuteAll(): void {
        for (let i = 0; i < this.audies.length; i++) {
            this.audies[i].mute = false;
        }
    }
}
