const {ccclass, property} = cc._decorator;

@ccclass
export default class MRadioButton extends cc.Component {

    @property buttonID: number = -1;
    @property groupID: number = -1;
    @property pressSoundID: number = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
    }

    // update (dt) {}
}
