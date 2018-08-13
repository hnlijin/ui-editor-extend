const {ccclass, property} = cc._decorator;

enum ColorID {
    ID_0, /**ffffffff*/
	ID_1, /**ffffffff*/
	ID_2, /**ff4ab31b*/
	ID_3, /**ff0680cd*/
	ID_4, /**ff913aaf*/
	ID_5, /**fff55802*/
	ID_6, /**ffcc0a01*/
	ID_7, /**ffffba00*/
	ID_8, /**fff9f3da*/
	ID_9, /**ffffcf73*/
	ID_10, /**fff0daab*/
	ID_11, /**fffff8d2*/
	ID_12, /**ffcb9060*/
	ID_13, /**ffdefffb*/
	ID_14, /**ff101315*/
	ID_15, /**ff6ae95a*/
	ID_16, /**ff635042*/
	ID_17, /**ffe9dcbc*/
	ID_18, /**ffcb9060*/


	ID_100 = 100, /**ff474747*/
	ID_101, /**ffffffff*/
	ID_102, /**ff6ae95a*/
	ID_103, /**ff167efb*/
	ID_104, /**ffef56f1*/
	ID_105, /**fff99d54*/
	ID_106, /**fff14944*/
	ID_107, /**fff7cc37*/
	ID_108, /**fff6e4b6*/
	ID_109, /**ffa9907a*/
	ID_110, /**ff2d9cb8*/
	ID_111, /**ff145b89*/
	ID_112, /**ffd6f073*/
	ID_113, /**ffdefffb*/
	ID_114, /**ff101315*/


	ID_200 = 200, /**fffffc21 --黄色--*/
	ID_201, /**ff1dfaed --青色--*/
	ID_202, /**ff66f426 --绿色--*/
	ID_203, /**ffffa81f --橙色--*/
	ID_204, /**ffffffff --白色--*/
	ID_205, /**fffde09a*/
	ID_206, /**ff6cb1ff*/
	ID_207, /**ff8b8fe5 --聊天男用--*/
	ID_208, /**ffffb6fc --聊天女用--*/
	ID_209, /**ffdc2323 --聊天系统消息或错误信息用--*/
	ID_210, /**fff65703 --红色-暗--*/
	ID_211, /**ffcc0c01 --红色-鲜--*/
    ID_212, /**ffffb901 --金色--*/
    
	ID_1000 = 1000, /**ffffffff --玩家名字颜色--*/ 
	ID_1001, /**ff00baff --NPC/中立/名字颜色--*/ 
	ID_1002, /**fff14944 --怪物/敌对/名字颜色--*/
	ID_1003, /**fff99d54 --主角名字颜色--*/    
	ID_1004, /**ff6ae95a --队友名字颜色--*/    
	ID_1010, /**ffc7e6cd --玩家称号颜色--*/    
	ID_1011, /**ffc7e6cd --NPC称号颜色--*/    
    ID_1012, /**ffc7e6cd --怪物称号颜色--*/    
    
	ID_2000 = 2000, /**fff1e0c5 --描述颜色--*/    
	ID_2001, /**ff92d2f5 --关键字颜色1青色--*/    
	ID_2002, /**ff87c24c --关键字颜色2绿色--*/    
	ID_2003, /**ffeb9a30 --标题颜色--*/    
	ID_2004, /**fffffc21 --数字颜色--*/    
	ID_2005, /**ffdc5d5d --不满足条件时数字颜色--*/    
	ID_2006, /**ff6fede6 --额外数字颜色 +999--*/    
	ID_2007, /**ff7eaebe --世界BOSS第三名--*/    
	ID_2008, /**ffffb901 --二级标题颜色--*/    
}

@ccclass
export default class MLabelConfig extends cc.Component {

    @property({
		type: cc.Enum(ColorID),
    }) colorID: ColorID  = ColorID.ID_0;

    @property fontAlias: string = "btn_a";

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
