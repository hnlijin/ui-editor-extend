import { FrameMode } from "./MMacros";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MRadioButton extends cc.Component {

    @property buttonID: number = -1;
    @property groupID: number = -1;

    @property({
        type: cc.Enum(FrameMode)
    }) normalSpriteFrameMode: number = FrameMode.SPRITE_1x1;

    @property({
        type: cc.Enum(FrameMode)
    }) pressedSpriteFrameMode: FrameMode = FrameMode.SPRITE_1x1;

    @property({
        type: cc.Enum(FrameMode)
    }) disabledSpriteFrameMode: FrameMode = FrameMode.SPRITE_1x1;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
    }

    // update (dt) {}
}
