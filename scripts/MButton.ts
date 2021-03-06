import { FrameMode } from "./MMacros";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MButton extends cc.Component {

    @property({
        type: cc.Enum(FrameMode)
    }) upSpriteFrameMode: number = FrameMode.SPRITE_1x1;

    @property({
        type: cc.Enum(FrameMode)
    }) downSpriteFrameMode: FrameMode = FrameMode.SPRITE_1x1;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
