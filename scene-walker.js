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
    }
};