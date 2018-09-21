var ejs = require('ejs');
var utils = require("./../utils");
var path = require('path');

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
			type: "MImage",
	        name: node.name,
	        x: node.x, 
	        y: node.y,
	        width: node.width,
	        height: node.height,
	        alignType: 1,
	        touchable: false,
		}
		if (sprite.enabled == true && sprite.spriteFrame != null) {
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
	toNode: function(data) {
		// Editor.log("Image:", data)
		var node = new cc.Node();
		node.name = data.$.Name;
		if (data.$.x != null) {
			node.x = data.$.x;
		}
		if (data.$.y != null) {
			node.y = -data.$.y;
		}
		node.width = data.$.Width;
		node.height = data.$.Height;
		node.anchorX = 0;
		node.anchorY = 1;
		let sprite = node.addComponent(cc.Sprite);
		sprite.trim = false;
		var macros = cc.require('MMacros');
		for (let index in data.$$) {
			let item = data.$$[index];
			for (let subIndex in item.$$) {
				let subItem = item.$$[subIndex];
				Editor.log("sub:", subItem);
				let subName = subItem["#name"];
				if (subName == "FrameImage") {
					var mImage = node.addComponent("MImage");
					if (subItem.$.FrameMode != macros.FrameMode.SPRITE_1x1) {
						mImage.frameMode = subItem.$.FrameMode;
					} else {
						mImage.frameMode = macros.FrameMode.SPRITE_1x1;
					}
					Editor.Ipc.sendToMain("ui-editor-extend:getSurfacePath", subItem.$.FileName, (url) => {
						if (url != null) {
							let p = path.join("resources", subItem.$.FileName);
							Editor.log("cc.Sprite:", data.$.Name, p);
						}
					});
				}
			}
		}
		if (data.$.Touchable == "true") {
			var mTouchable = node.addComponent("MTouchable");
			mTouchable.touchable = true;
		}
		return node;
	}
}