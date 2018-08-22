var ejs = require('ejs');
var utils = require("./../utils");

var templ =
'\
	<ATLASLABEL Name="<%= label.name %>"\
<% if (label.x) { %> x="<%= label.x %>"<% } %>\
<% if (label.y) { %> y="<%= label.y %>"<% } %>\
<% if (label.height) { %> Height="<%= label.height %>"<% } %>\
<% if (label.touchable != null) { %> Touchable="<%= label.touchable %>"<% } %>>\n\
		<Atlas FileName="<%= label.font %>" \
Width="<%= label.align %>" \
Height="<%= label.alignVert %>" \
StartChar="<%= label.startChar %>" \
/>\n\
	</ATLASLABEL>\
';

module.exports = {
	templ: templ,
	toData: function(node) {
		let label = node.getComponent(cc.Label);
		if (!label.font instanceof cc.BitmapFont) {
			return null;
		}
		let data = {
			type: "MAtlasLabel",
	        name: node.name,
	        x: node.x, 
	        y: node.y,
			width:node.width,
	        height: node.height,
			touchable: false,
			font:label.font.spriteFrame.getTexture().url,
		}
		let mTouchable = node.getComponent("MTouchable");
		if (mTouchable != null && mTouchable.enabled == true) {
			data.touchable = mTouchable.touchable;
		}
		return data;
	},
	toXML: function(data) {
		data.y = Math.abs(data.y);
		data.font = utils.urlToResPath(data.font.url);
        let xml = ejs.render(templ, {label: data}, utils.ejs.opts);
        return xml;
	},
}