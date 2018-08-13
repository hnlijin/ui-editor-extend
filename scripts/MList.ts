const {ccclass, property} = cc._decorator;

@ccclass
export default class MList extends cc.Component {

    @property lineSpace: number = -1;

    /**
     * Item间隔
     */
    @property ItemInterval: number = -1;

    /**
     * 音效ID
     */
    @property pressSoundID: number = 0;

    @property dragMode: number = -1;

    // SelectionMode="1" NotUsingClipNode="1"

    @property(cc.SpriteFrame) upSprite: cc.SpriteFrame = null;
    @property(cc.SpriteFrame) downSprite: cc.SpriteFrame = null;

    @property upSpriteFrameMode: number = 1;
    @property downSpriteFrameMode: number = 1;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
