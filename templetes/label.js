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
		Editor.log("label:", data)
		var node = new cc.Node();
		node.name = data.$.Name;
		node.x = data.$.x;
		node.y = data.$.y;
		node.width = data.$.Width;
		node.height = data.$.Height;
		var label = node.addComponent(cc.Label);
		if (data.Text && data.Text.$.String) {
			label.string = data.Text.$.String;
			label.horizontalAlign = data.Text.$.Align;
			label.verticalAlign = data.Text.$.AlignVert;
		}
		return node;
	}
}