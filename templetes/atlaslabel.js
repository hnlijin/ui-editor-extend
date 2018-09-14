var ejs = require('ejs');
var utils = require("./../utils");

var templ =
'\
	<ATLASLABEL Name="<%= label.name %>"\
<% if (label.x) { %> x="<%= label.x %>"<% } %>\
<% if (label.y) { %> y="<%= label.y %>"<% } %>\
<% if (label.height) { %> Height="<%= label.height %>"<% } %>\
<% if (label.touchable != null) { %> Touchable="<%= label.touchable %>"<% } %>\
>\n\
<% if (label.font != null) { %>\
		<Atlas FileName="<%= label.font.fileName %>" \
Width="<%= label.font.width %>" \
Height="<%= label.font.height %>" \
StartChar="<%= label.font.startChar %>" \
/>\n\
<% } %>\
	</ATLASLABEL>\
';

module.exports = {
	templ: templ,
	toData: function(node) {
		let mAtlasLabel = node.getComponent("MAtlasLabel");
		let label = node.getComponent(cc.Label);
		if (label == null || mAtlasLabel == null) {
			return null;
		}
		let data = {
			type: "MAtlasLabel",
	        name: node.name,
	        x: node.x, 
	        y: node.y,
			width: node.width,
	        height: node.height,
			touchable: false,
			font: {
				url: mAtlasLabel.fontSprite.getTexture().url,
				width: mAtlasLabel.fontWidth,
				height: mAtlasLabel.fontHeight,
				startChar: mAtlasLabel.startChar,
			} 
		}
		let mTouchable = node.getComponent("MTouchable");
		if (mTouchable != null && mTouchable.enabled == true) {
			data.touchable = mTouchable.touchable;
		}
		return data;
	},
	toXML: function(data) {
		data.y = Math.abs(data.y);
		if (data.font != null) {
			data.font.fileName = utils.urlToResPath(data.font.url);	
		}
        let xml = ejs.render(templ, {label: data}, utils.ejs.opts);
        return xml;
	},
	toNode: function(data) {
		return null;
	}
}