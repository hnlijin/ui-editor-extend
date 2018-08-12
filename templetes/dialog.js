var ejs = require('ejs');
var utils = require("./../utils");

var templ =
'<DIALOG Name="<%= dialog.name %>" Width="<%= dialog.width %>" Height="<%= dialog.height %>">\n\
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
			name: node.name,
	        width: node.width,
	        height: node.height,
		};
		if (sprite != null) {
			data.frame = {
                url: sprite.spriteFrame.getTexture().url,
                frameMode: '1',
            }
		}
		return data;
	},
	toXML: function(data) {
		let xml = ejs.render(templ, {dialog: data}, utils.ejs.opts);
		return xml;
	}
}
