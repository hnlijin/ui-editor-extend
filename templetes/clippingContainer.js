var ejs = require('ejs');
var utils = require("./../utils");

var templ =
'\
	<CLIPPINGCONTAINER Name="<%= container.name %>"\
<% if (container.x) { %> x="<%= container.x %>"<% } %>\
<% if (container.y) { %> y="<%= container.y %>"<% } %>\
<% if (container.width) { %> Width="<%= container.width %>"<% } %>\
<% if (container.height) { %> Height="<%= container.height %>"<% } %>\
<% if (container.touchable != null) { %> Touchable="<%= container.touchable %>"<% } %>/>\
';

module.exports = {
	templ: templ,
	toData: function(node) {
		let clippingContainer = node.getComponent("MClippingContainer");
		if (clippingContainer == null || clippingContainer.enabled == false) {
			return null;
		}
		let data = {
			type: "MClippingContainer",
	        name: node.name,
	        x: node.x, 
	        y: node.y,
	        width: node.width,
	        height: node.height,
			touchable: false,
		}
		let mTouchable = node.getComponent("MTouchable");
		if (mTouchable != null && mTouchable.enabled == true) {
			data.touchable = mTouchable.touchable;
		}
		return data;
	},
	toXML: function(data) {
		data.y = Math.abs(data.y);
        let xml = ejs.render(templ, {container: data}, utils.ejs.opts);
        return xml;
	},
}