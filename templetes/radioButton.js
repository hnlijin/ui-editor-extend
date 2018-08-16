var ejs = require('ejs');
var utils = require("./../utils");

var templ = 
'\
	<RADIO Name="<%= button.name %>"\
<% if (button.x != null) { %> x="<%= button.x %>"<% } %>\
<% if (button.y != null) { %> y="<%= button.y %>"<% } %>\
<% if (button.width != null) { %> Width="<%= button.width %>"<% } %>\
<% if (button.height != null) { %> Height="<%= button.height %>"<% } %>\
<% if (button.pressSoundID > 0) { %> PressSoundID="<%= button.pressSoundID %>"<% } %>\
<% if (button.buttonID > -1) { %> ButtonID="<%= button.buttonID %>"<% } %>\
<% if (button.groupID > -1) { %> GroupID="<%= button.groupID %>"<% } %>\
>\n\
		<Resource>\n\
			<NormalImage \
FileName="<%= button.normalSprite.fileName %>"\
<% if (button.normalSprite.frameMode > 0) { %> FrameMode="<%= button.normalSprite.frameMode %>"<% } %>/>\n\
			<CheckedImage \
FileName="<%= button.checkedSprite.fileName %>"\
<% if (button.checkedSprite.frameMode > 0) { %> FrameMode="<%= button.checkedSprite.frameMode %>"<% } %>/>\n\
<% if (button.markSprite != null) { %>\
			<CornerMarkImage \
FileName="<%= button.markSprite.fileName %>"\
<% if (button.markSprite.frameMode) { %> FrameMode="<%= button.markSprite.frameMode %>"<% } %>\
<% if (button.markSprite.x) { %> x="<%= button.markSprite.x %>"<% } %>\
<% if (button.markSprite.y) { %> y="<%= button.markSprite.y %>"<% } %>\
<% if (button.markSprite.width) { %> Width="<%= button.markSprite.width %>"<% } %>\
<% if (button.markSprite.height) { %> Height="<%= button.markSprite.height %>"<% } %>\
/>\n\
<% } %>\
		</Resource>\n\
<% if (button.label != null) { %>\
		<Text FontAlias="<%= button.label.fontAlias %>" \
Align="<%= button.label.align %>" \
AlignVert="<%= button.label.alignVert %>" \
ColorID="<%= button.label.colorID %>" \
String="<%= button.label.string %>"/>\n\
<% } %>\
	</RADIO>\
';
module.exports = {
	templ: templ,
	toData: function(node) {
		let radio = node.getComponent("MRadioButton");
		if (radio == null || radio.enabled == false) {
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
				frameMode: radio.normalSpriteFrameMode,
			},
			checkedSprite: {
				url: button.pressedSprite.getTexture().url,
				frameMode: radio.pressedSpriteFrameMode,
			}
		};
		if (radio.buttonID > -1) {
			data.buttonID = radio.buttonID;
		}
		if (radio.groupID > -1) {
			data.groupID = radio.groupID;
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
		let markNode = node.getChildByName("Mark");
		if (markNode != null && markNode.active == true) {
			let markSprite = markNode.getComponent(cc.Sprite);
			let markImage = markNode.getComponent("MImage");
			if (markSprite != null && markImage != null) {
				data.markSprite = {
					x: markNode.x,
					y: markNode.y,
					width: markNode.width,
					height: markNode.height,
					url: markSprite.spriteFrame.getTexture().url,
					frameMode: markImage.frameMode,
				};
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
		data.normalSprite.fileName = utils.urlToResPath(data.normalSprite.url);
		data.checkedSprite.fileName = utils.urlToResPath(data.checkedSprite.url);
		if (data.markSprite != null) {
			data.markSprite.fileName = utils.urlToResPath(data.markSprite.url);
		}
		let xml = ejs.render(templ, {button: data}, utils.ejs.opts);
        return xml;
	}
}