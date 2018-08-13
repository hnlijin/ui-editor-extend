var ejs = require('ejs');
var utils = require("./../utils");

var templ = 
'\
	<RADIO Name="<%= button.name %>"\
<% if (button.x != null) { %> x="<%= button.x %>"<% } %>\
<% if (button.y != null) { %> y="<%= button.y %>"<% } %>\
<% if (button.width != null) { %> width="<%= button.width %>"<% } %>\
<% if (button.height != null) { %> height="<%= button.height %>"<% } %>\
<% if (button.pressSoundID > 0) { %> PressSoundID="<%= button.pressSoundID %>"<% } %>\
<% if (button.buttonID > -1) { %> ButtonID="<%= button.buttonID %>"<% } %>\
<% if (button.groupID > -1) { %> GroupID="<%= button.groupID %>"<% } %>\
>\n\
		<Resource>\n\
			<NormalImage \
FileName="<%= button.normalSprite.fileName %>"\
<% if (button.normalSprite.frameMode) { %> FrameMode="<%= button.normalSprite.frameMode %>"<% } %>/>\n\
			<CheckedImage \
FileName="<%= button.pressedSprite.fileName %>"\
<% if (button.pressedSprite.frameMode) { %> FrameMode="<%= button.pressedSprite.frameMode %>"<% } %>/>\n\
			<CornerMarkImage \
FileName="<%= button.markSprite.fileName %>"\
<% if (button.markSprite.frameMode) { %> FrameMode="<%= button.markSprite.frameMode %>"<% } %>/>\n\
		</Resource>\n\
<% if (button.label != null) { %>\
		<Text FontAlias="<%= button.label.fontAlias %>" \
Align="<%= button.label.align %>" \
AlignVert="<%= button.label.alignVert %>" \
ColorID="<%= button.label.colorID %>" \
String="<%= button.label.string %>"/>\
<% } %>\n\
	</RADIO>\
';
module.exports = {
	templ: templ,
	toData: function(node) {
		let radio = node.getComponent("MRadioButton");
		if (radio == null) {
			return null;
		}
		let button = node.getComponent(cc.Button);
		if (button == null) {
			return null;
		}
		let data = {
			type: "MRadioButton",
			name: node.name,
			x: node.x,
			y: node.y,
			width: node.width,
			height: node.height,
			normalSprite: {
				url: button.normalSprite.getTexture().url,
				frameMode: 1,
			},
			pressedSprite: {
				url: button.pressedSprite.getTexture().url,
				frameMode: 1,
			},
			markSprite: {
				url: button.pressedSprite.getTexture().url,
				frameMode: 1,
			}
		};
		if (radio.buttonID > -1) {
			data.buttonID = radio.buttonID;
		}
		if (radio.groupID > -1) {
			data.groupID = radio.groupID;
		}
		if (radio.pressSoundID > 0) {
			data.pressSoundID = radio.pressSoundID;
		}
		let label = node.getComponentInChildren(cc.Label);
		let labelConfig = node.getComponentInChildren("MLabelConfig");
		if (label != null && labelConfig != null) {
			data.label = {
				fontAlias: labelConfig.fontAlias,
				colorID: parseInt(labelConfig.colorID),
				align: label.horizontalAlign,
				alignVert: label.verticalAlign,
				string: label.string,
			}
		} 
		return data;
	},
	toXML: function(data) {
		data.y = Math.abs(data.y);
		data.normalSprite.fileName = utils.urlToResPath(data.normalSprite.url);
		data.pressedSprite.fileName = utils.urlToResPath(data.pressedSprite.url);
		data.markSprite.fileName = utils.urlToResPath(data.markSprite.url);
		let xml = ejs.render(templ, {button: data}, utils.ejs.opts);
        return xml;
	}
}