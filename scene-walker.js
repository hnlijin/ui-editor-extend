var DlgTempl = require("./templetes")
module.exports = {
	'exportXML': function (event) {
        let data = null;
        var scene = cc.director.getScene();
        var rootChildren = scene.getChildren();
        for (var k in rootChildren) {
            let child = rootChildren[k];
            if (child._prefab != null) {
                data = DlgTempl.dialog.toData(child);
                data.content = [];
                var children = child.getChildren();
                for (var i in children) {
                    let node = children[i];
                    let itemData = null;
                    for (var j in DlgTempl.list) {
                        let templ = DlgTempl.list[j];
                        if (templ != null) {
                            itemData = templ.toData(node);
                        }
                        if (itemData != null) {
                            data.content.push(itemData);
                            break;
                        }
                    }
                }
            }
        }
        if (event.reply) {
            event.reply(null, data);
        }
    },
    'importUI': function(event, data) {
        Editor.log("importUI:", data);
        var scene = cc.director.getScene();
        var canvas = scene.getChildByName("Canvas");
        if (canvas == null) {
            Editor.log("请打开assets/MainScene...");
            return;
        }
        let dialogNode = DlgTempl.dialog.toNode(data.DIALOG);
        for (let index in data.DIALOG.$$) {
            let item = data.DIALOG.$$[index];
            let k = item["#name"];
            Editor.log(k, item);
            if (k != "Resource") {
                let templ = DlgTempl.node[k];
                if (templ != null && templ.toNode instanceof Function) {
                    let node = templ.toNode(item)
                    if (node != null) {
                        dialogNode.addChild(node);
                    }
                } else {
                    Editor.log("不支持[" + k + "]导入！");
                }
            }
        }
        canvas.addChild(dialogNode);
    }
};