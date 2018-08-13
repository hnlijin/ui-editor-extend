const {ccclass, property} = cc._decorator;

enum ListType {
    List,
    DragList,
}

@ccclass
export default class MList extends cc.Component {

    @property({
        type: cc.Enum(ListType)
    }) type: ListType = ListType.List;

    @property lineSpace: number = -1;

    /**
     * Item间隔
     */
    @property itemInterval: number = -1;

    @property dragMode: number = -1;
    
    @property selectionMode: number = -1;

    @property notUsingClipNode: number = -1;

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
