import { FrameMode } from "./MMacros";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MDialog extends cc.Component {
    
    @property staticRender: boolean = false;
    @property({
        type: cc.Enum(FrameMode)
    }) frameMode: number = FrameMode.SPRITE_1x1;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
