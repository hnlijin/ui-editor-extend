var ejs = require('ejs');
var utils = require("./../utils");

var templ = 
'\
	<STILLIMAGEBUTTON Name="<%= button.name %>"\
<% if (button.x != null) { %> x="<%= button.x %>"<% } %>\
<% if (button.y != null) { %> y="<%= button.y %>"<% } %>\
<% if (button.width != null) { %> width="<%= button.width %>"<% } %>\
<% if (button.height != null) { %> height="<%= button.height %>"<% } %>\
<% if (button.pressSoundID > 0) { %> PressSoundID="<%= button.pressSoundID %>"<% } %>\
>\n\
		<Resource>\n\
			<FrameUpImage \
FileName="<%= button.upSprite.fileName %>"\
<% if (button.upSprite.frameMode) { %> FrameMode="<%= button.upSprite.frameMode %>"<% } %>/>\n\
			<FrameDownImage \
FileName="<%= button.downSprite.fileName %>"\
<% if (button.downSprite.frameMode) { %> FrameMode="<%= button.downSprite.frameMode %>"<% } %>/>\n\
		</Resource>\n\
<% if (button.label != null) { %>\
		<Text FontAlias="<%= button.label.fontAlias %>" \
Align="<%= button.label.align %>" \
AlignVert="<%= button.label.alignVert %>" \
ColorID="<%= button.label.colorID %>" \
String="<%= button.label.string %>"/>\n\
<% } %>\
	</STILLIMAGEBUTTON>\
';
module.exports = {
	templ: templ,
	toData: function(node) {
		let button = node.getComponent(cc.Button);
		if (button == null) {
			return null;
		}
		let mButton = node.getComponent("MButton");
		let data = {
			type: "MButton",
			name: node.name,
			x: node.x,
			y: node.y,
			width: node.width,
			height: node.height,
			upSprite: {
				url: button.normalSprite.getTexture().url,
				frameMode: 1,
			},
			downSprite: {
				url: button.pressedSprite.getTexture().url,
				frameMode: 1,
			}
		};
		if (mButton != null) {
			data.upSprite.frameMode = mButton.upSpriteFrameMode;
			data.downSprite.frameMode = mButton.downSpriteFrameMode;
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
		let soundID = node.getComponent("MSoundID");
		if (soundID != null) {
			data.pressSoundID = soundID.pressSoundID;
		}
		return data;
	},
	toXML: function(data) {
		data.y = Math.abs(data.y);
		data.upSprite.fileName = utils.urlToResPath(data.upSprite.url);
		data.downSprite.fileName = utils.urlToResPath(data.downSprite.url);
		let xml = ejs.render(templ, {button: data}, utils.ejs.opts);
        return xml;
	}
}