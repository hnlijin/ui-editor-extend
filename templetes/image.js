var ejs = require('ejs');
var utils = require("./../utils");

var templ =
'\
	<IMAGEPICTURE Name="<%= image.name %>"\
<% if (image.x) { %> x="<%= image.x %>"<% } %>\
<% if (image.y) { %> y="<%= image.y %>"<% } %>\
<% if (image.width) { %> Width="<%= image.width %>"<% } %>\
<% if (image.height) { %> Height="<%= image.height %>"<% } %>\
<% if (image.alignType) { %> ItemAlign="<%= image.alignType %>"<% } %>\
<% if (image.touchable != null) { %> Touchable="<%= image.touchable %>"<% } %>>\n\
<% if (image.frame) { %>\
		<Resource>\n\
			<FrameImage \
FileName="<%= image.frame.fileName %>"\
<% if (image.frame.frameMode) { %> FrameMode="<%= image.frame.frameMode %>"<% } %>\
/>\n\
		</Resource>\n\
<% } %>\
	</IMAGEPICTURE>\
';

module.exports = {
	templ: templ,
	toData: function(node) {
		let sprite = node.getComponent(cc.Sprite);
		if (sprite == null) {
			return null;
		}
		let data = {
			type: "cc.Sprite",
	        name: node.name,
	        x: node.x, 
	        y: node.y,
	        width: node.width,
	        height: node.height,
	        alignType: 1,
	        touchable: false,
	        frame: {
	            url: sprite.spriteFrame.getTexture().url,
	            frameMode: '1',
	        }
		}
		return data;
	},
	toXML: function(data) {
		data.y = Math.abs(data.y);
        data.frame.fileName = utils.urlToResPath(data.frame.url);
        let xml = ejs.render(templ, {image: data}, utils.ejs.opts);
        return xml;
	},
}