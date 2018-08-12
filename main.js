'use strict';
var ejs = require("ejs")
var os = require("os");
var fs = require("fs");
var DlgTempl = require("./templetes");
var utils = require("./utils");

module.exports = {
  load () {
    // 当 package 被正确加载的时候执行
  },

  unload () {
    // 当 package 被正确卸载的时候执行
  },

  messages: {
    'ui-editor-extend:exportUI': function() {
      Editor.log('开始导出XML。。。');
      Editor.Scene.callSceneScript('ui-editor-extend', 'exportXML', function (err, data) {
        if (data == null) {
          Editor.error("ui-editor-extend: export xml fail: data is null!");
          return;
        }
        let content = '';
        for (var i = 0; i < data.content.length; i++) {
          let item = data.content[i];
          if (item.frame && item.frame.url && utils.isIgnoreItem(item.frame.url)) {
            continue;
          }
          let templ = DlgTempl.dict[item.type];
          if (templ != null) {
            let xml = templ.toXML(item);
            content += xml + "\n";
          }
        }
        data.content = content;
        let dialog = DlgTempl.dialog.toXML(data);
        Editor.log(dialog);
        fs.writeFileSync(os.homedir() + "\\.CocosCreator\\packages\\ui-editor-extend\\dialog.xml", dialog);
      });
    }
  },
};