var ejs = require('ejs');
var utils = require("./../utils");

var templ = 
'\
	<RADIOBUTTON Name="<%= button.name %>"\
<% if (button.x != null) { %> x="<%= button.x %>"<% } %>\
<% if (button.y != null) { %> y="<%= button.y %>"<% } %>\
<% if (button.width != null) { %> width="<%= button.width %>"<% } %>\
<% if (button.height != null) { %> height="<%= button.height %>"<% } %>\>\n\
		<Resource>\n\
			<NormalSprite \
FileName="<%= button.normalSprite.fileName %>"\
<% if (button.normalSprite.frameMode) { %> FrameMode="<%= button.normalSprite.frameMode %>"<% } %>/>\n\
			<PressedSprite \
FileName="<%= button.pressedSprite.fileName %>"\
<% if (button.pressedSprite.frameMode) { %> FrameMode="<%= button.pressedSprite.frameMode %>"<% } %>/>\n\
		</Resource>\n\
	</RADIOBUTTON>\
';
module.exports = {
	templ: templ,
	toData: function(node) {
		let radioButton = node.getComponent("RadioButton");
		if (radioButton == null) {
			return null;
		}
		let button = node.getComponent(cc.Button);
		if (button == null) {
			return null;
		}
		let data = {
			type: "RadioButton",
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
			}
		};
		return data;
	},
	toXML: function(data) {
		data.y = Math.abs(data.y);
		data.normalSprite.fileName = utils.urlToResPath(data.normalSprite.url);
		data.pressedSprite.fileName = utils.urlToResPath(data.pressedSprite.url);
		let xml = ejs.render(templ, {button: data}, utils.ejs.opts);
        return xml;
	}
}