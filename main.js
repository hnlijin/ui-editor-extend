'use strict';

var ejs = require("ejs")
var os = require("os");
var fs = require("fs");
var path = require("path");
var xml2js = require('xml2js');
const { exec } = require('child_process');
var DlgTempl = require("./templetes");
var utils = require("./utils");
var settings = require("./settings");

module.exports = {
  load () {
    // 当 package 被正确加载的时候执行
    settings.load();
  },

  unload () {
    // 当 package 被正确卸载的时候执行
    settings.save();
  },

  messages: {
    'ui-editor-extend:openSetting': function() {
      Editor.Panel.open('ui-editor-extend');
    },
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
        fs.writeFileSync(settings.client_res_interface_path + "\\" + data.fileName + ".xml", dialog);
      });
    },
    'ui-editor-extend:importUI': function() {
      let res = Editor.Dialog.openFile({
        properties: ['openFile']
      });
      if (res && res[0]) {
        let xml = fs.readFileSync(res[0], {encoding: 'utf8'});
        xml2js.parseString(xml, {preserveChildrenOrder: true, explicitChildren: true}, (err, json) => {
          Editor.Scene.callSceneScript('ui-editor-extend', 'importUI', json, function (err, res) {
          });
        });
      }
    },
    'ui-editor-extend:updateEditor': function() {
      Editor.log("更新Editor。。。");
      let editorPath = path.join(os.homedir(), ".CocosCreator", "packages", "ui-editor-extend");
      exec("git stash & git checkout . & git pull", {cwd: editorPath}, function(err) {
        if (err != null) {
          Editor.log("更新Editor失败：", err);
        } else {
          Editor.log("更新Editor成功。");
        }
      });
    }
  },
};