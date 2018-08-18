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
		if (sprite == null || sprite.enabled == false) {
			return null;
		}
		let data = {
			type: "MImage",
	        name: node.name,
	        x: node.x, 
	        y: node.y,
	        width: node.width,
	        height: node.height,
	        alignType: 1,
	        touchable: false,
	        
		}
		if (sprite.spriteFrame != null) {
			data.frame = {
	            url: sprite.spriteFrame.getTexture().url,
	            frameMode: 1,
	        }
		}
		let mImage = node.getComponent("MImage");
		if (mImage != null && mImage.enabled == true && data.frame != null) {
			data.frame.frameMode = mImage.frameMode;
		}
		let mTouchable = node.getComponent("MTouchable");
		if (mTouchable != null && mTouchable.enabled == true) {
			data.touchable = mTouchable.touchable;
		}
		return data;
	},
	toXML: function(data) {
		data.y = Math.abs(data.y);
		if (data.frame != null && data.frame.url != null) {
			data.frame.fileName = utils.urlToResPath(data.frame.url);	
		} 
        let xml = ejs.render(templ, {image: data}, utils.ejs.opts);
        return xml;
	},
}