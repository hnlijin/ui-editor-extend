var ejs = require('ejs');
var utils = require("./../utils");

var templ = 
'\
	<STILLIMAGEBUTTON Name="<%= button.name %>"\
<% if (button.x != null) { %> x="<%= button.x %>"<% } %>\
<% if (button.y != null) { %> y="<%= button.y %>"<% } %>\
<% if (button.width != null) { %> Width="<%= button.width %>"<% } %>\
<% if (button.height != null) { %> Height="<%= button.height %>"<% } %>\
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
		if (button == null || button.enabled == false) {
			return null;
		}
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
		let mButton = node.getComponent("MButton");
		if (mButton != null && mButton.enabled == true) {
			data.upSprite.frameMode = mButton.upSpriteFrameMode;
			data.downSprite.frameMode = mButton.downSpriteFrameMode;
		}
		let label = node.getComponentInChildren(cc.Label);
		let labelConfig = node.getComponentInChildren("MLabelConfig");
		if (label != null && labelConfig != null && label.enabled == true && labelConfig.enabled == true) {
			data.label = {
				fontAlias: labelConfig.fontAlias,
				colorID: parseInt(labelConfig.colorID),
				align: label.horizontalAlign,
				alignVert: label.verticalAlign,
				string: label.string,
			}
		}
		let soundID = node.getComponent("MSoundID");
		if (soundID != null && soundID.enabled == true) {
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
	},
	toNode: function(data) {
		return null;
	}
}