import { FrameMode } from "./MMacros";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MImage extends cc.Component {

    @property({
        type: cc.Enum(FrameMode)
    }) frameMode: number = FrameMode.SPRITE_1x1;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
