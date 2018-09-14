var ejs = require('ejs');
var utils = require("./../utils");

var templ =
'<DIALOG Name="<%= dialog.name %>" Width="<%= dialog.width %>" Height="<%= dialog.height %>"\
<% if (dialog.staticRender) { %> StaticRender="<%= dialog.staticRender %>"<% } %>\
>\n\
<% if (dialog.frame) { %>\
	<Resource>\n\
		<FrameImage FileName="<%= dialog.frame.fileName %> " FrameMode="<%= dialog.frame.frameMode %>">\n\
	</Resource>\n\
<% } %>\
<% if (dialog.content) { %><%= dialog.content %><% } %>\n\
</DIALOG>';

module.exports = {
	templ: templ,
	toData: function(node) {
		let data = {
			fileName: node._prefab.asset._name,
			name: node.name,
	        width: node.width,
	        height: node.height,
		};
		let sprite = node.getComponent(cc.Sprite);
		if (sprite != null && sprite.enabled == true) {
			data.frame = {
                url: sprite.spriteFrame.getTexture().url,
                frameMode: 1,
            }
		}
		let mDialog = node.getComponent("MDialog");
		if (mDialog != null && mDialog.enabled == true) {
			data.staticRender = mDialog.staticRender;
			if (sprite != null && sprite.enabled == true) {
				data.frame.frameMode = mDialog.frameMode;
			}
		}
		return data;
	},
	toXML: function(data) {
		if (data.frame != null) {
			data.frame.fileName = utils.urlToResPath(data.frame.url);
		}
		let xml = ejs.render(templ, {dialog: data}, utils.ejs.opts);
		return xml;
	},
	toNode: function(data) {
		var node = new cc.Node();
		node.name = data.$.Name;
		node.width = data.$.Width;
		node.height = data.$.Height;
		return node;
	}
}
