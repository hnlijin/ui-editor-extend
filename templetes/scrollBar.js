var ejs = require('ejs');
var utils = require("./../utils");

var templ =
'\
	<SCROLLBAR Name="<%= container.name %>"\
<% if (container.x) { %> x="<%= container.x %>"<% } %>\
<% if (container.y) { %> y="<%= container.y %>"<% } %>\
<% if (container.width) { %> Width="<%= container.width %>"<% } %>\
<% if (container.height) { %> Height="<%= container.height %>"<% } %>\
<% if (container.horizontal) { %> Horizontal="<%= container.horizontal %>"<% } %>\
>\n\
<% if (container.barSprite != null) { %>\
		<Resource>\n\
			<BarImage FileName="<%= container.barSprite.fileName %>"\
 FrameMode="<%= container.barSprite.frameMode %>"\
 x="<%= container.barSprite.x %>"\
 y="<%= container.barSprite.y %>"\
 Width="<%= container.barSprite.width %>"\
 Height="<%= container.barSprite.height %>"\
/>\n\
<% } %>\
		</Resource>\n\
	</SCROLLBAR>\
';

module.exports = {
	templ: templ,
	toData: function(node) {
		let scrollBar = node.getComponent(cc.Scrollbar);
		if (scrollBar == null || scrollBar.enabled == false) {
			return null;
		}
		let data = {
			type: "MScrollBar",
	        name: node.name,
	        x: node.x, 
	        y: node.y,
	        width: node.width,
	        height: node.height
		}
		if (scrollBar.direction == cc.Scrollbar.Direction.HORIZONTAL) {
			data.horizontal = true;
		}
		let barNode = node.getChildByName("bar");
		if (barNode != null && barNode.active == true) {
			let barSprite = barNode.getComponent(cc.Sprite);
			let barImage = barNode.getComponent("MImage");
			if (barSprite != null && barImage != null) {
				data.barSprite = {
					x: barNode.x,
					y: barNode.y,
					width: barNode.width,
					height: barNode.height,
					url: barSprite.spriteFrame.getTexture().url,
					frameMode: barImage.frameMode,
				}
			} else {
				Editor.log("export error: name = " + node.name + " 在节点的bar子节点上没有发现MImage、cc.Sprite组件！");
			}
		}
		return data;
	},
	toXML: function(data) {
		data.y = Math.abs(data.y);
		if (data.barSprite != null) {
			data.barSprite.fileName = utils.urlToResPath(data.barSprite.url);
		}
        let xml = ejs.render(templ, {container: data}, utils.ejs.opts);
        return xml;
	},
	toNode: function(data) {
		return null;
	}
}