var ejs = require('ejs');
var utils = require("./../utils");

var templ =
'\
	<FREELABEL Name="<%= label.name %>"\
<% if (label.x) { %> x="<%= label.x %>"<% } %>\
<% if (label.y) { %> y="<%= label.y %>"<% } %>\
<% if (label.width) { %> Width="<%= label.width %>"<% } %>\
<% if (label.height) { %> Height="<%= label.height %>"<% } %>\
<% if (label.touchable != null) { %> Touchable="<%= label.touchable %>"<% } %>>\n\
		<Text FontAlias="<%= label.fontAlias %>" \
Align="<%= label.align %>" \
AlignVert="<%= label.alignVert %>" \
ColorID="<%= label.colorID %>" \
<% if (label.string != "") { %>\
String="<%= label.string %>"\
<% } %>\
/>\n\
	</FREELABEL>\
';

module.exports = {
	templ: templ,
	toData: function(node) {
		let label = node.getComponent(cc.Label);
		if (label == null || label.enabled == false) {
			return null;
		}
		let data = {
			type: "MLabel",
	        name: node.name,
	        x: node.x, 
	        y: node.y,
	        width: node.width,
	        height: node.height,
	        align: label.horizontalAlign,
			alignVert: label.verticalAlign,
			string: label.string,
			touchable: false,
		}
		let labelConfig = node.getComponent("MLabelConfig");
		if (labelConfig != null && labelConfig.enabled == true) {
			data.fontAlias = labelConfig.fontAlias;
			data.colorID = parseInt(labelConfig.colorID);
		} 
		let mTouchable = node.getComponent("MTouchable");
		if (mTouchable != null && mTouchable.enabled == true) {
			data.touchable = mTouchable.touchable;
		}
		return data;
	},
	toXML: function(data) {
		data.y = Math.abs(data.y);
        let xml = ejs.render(templ, {label: data}, utils.ejs.opts);
        return xml;
	},
	toNode: function(data) {
		Editor.log("Label:", data)
		var node = new cc.Node();
		node.name = data.$.Name;
		node.x = data.$.x;
		node.y = -data.$.y;
		node.width = data.$.Width;
		node.height = data.$.Height;
		node.anchorX = 0;
		node.anchorY = 1;
		for (let index in data.$$) {
			let item = data.$$[index];
			let k = item["#name"];
			Editor.log(k, ":", item);
			if (k == "Text") {
				var label = node.addComponent(cc.Label);
				label.overflow = cc.Label.Overflow.CLAMP;
				if (item.$.String != null) {
					label.string = item.$.String;
				}
				if (item.$.Align == cc.Label.HorizontalAlign.LEFT) {
					label.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
				} else if (item.$.Align == cc.Label.HorizontalAlign.CENTER) {
					label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
				} else if (item.$.Align == cc.Label.HorizontalAlign.RIGHT) {
					label.horizontalAlign = cc.Label.HorizontalAlign.RIGHT;
				}
				if (item.$.AlignVert == cc.Label.VerticalAlign.TOP) {
					label.verticalAlign = cc.Label.VerticalAlign.TOP;
				} else if (item.$.AlignVert == cc.Label.VerticalAlign.CENTER) {
					label.verticalAlign = cc.Label.VerticalAlign.CENTER;
				} else if (item.$.AlignVert == cc.Label.VerticalAlign.BOTTOM) {
					label.verticalAlign = cc.Label.VerticalAlign.BOTTOM;
				}
				let mLabelConfig = node.addComponent("MLabelConfig");
				if (item.$.FontAlias != null) {
					mLabelConfig.fontAlias = item.$.FontAlias;
				}
				if (item.$.ColorID != null) {
					mLabelConfig.colorID = item.$.ColorID;
				}
			}
		}
		let mTouchable = node.addComponent("MTouchable");
		if (data.$.Touchable != null) {
			mTouchable.touchable = data.$.Touchable;
		} else {
			mTouchable.touchable = false;
		}
		return node;
	}
}