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
		let sprite = node.getComponent(cc.Sprite);
		let data = {
			fileName: node._prefab.asset._name,
			name: node.name,
	        width: node.width,
	        height: node.height,
		};
		if (sprite != null) {
			data.frame = {
                url: sprite.spriteFrame.getTexture().url,
                frameMode: 1,
            }
		}
		let mDialog = node.getComponent("MDialog");
		if (mDialog != null) {
			data.staticRender = mDialog.staticRender;
			data.frame.frameMode = mDialog.frameMode;
		}
		return data;
	},
	toXML: function(data) {
		data.frame.fileName = utils.urlToResPath(data.frame.url);
		let xml = ejs.render(templ, {dialog: data}, utils.ejs.opts);
		return xml;
	}
}
