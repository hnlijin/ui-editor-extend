var ejs = require('ejs');
var utils = require("./../utils");

var templ = 
'\
	<DRAGLIST Name="<%= list.name %>"\
<% if (list.x != null) { %> x="<%= list.x %>"<% } %>\
<% if (list.y != null) { %> y="<%= list.y %>"<% } %>\
<% if (list.width != null) { %> width="<%= list.width %>"<% } %>\
<% if (list.height != null) { %> height="<%= list.height %>"<% } %>\
<% if (list.lineSpace > 0) { %> LineSpace="<%= list.lineSpace %>"<% } %>\
<% if (list.itemInterval > 0) { %> ItemInterval="<%= list.itemInterval %>"<% } %>\
<% if (list.dragMode > -1) { %> DragMode="<%= list.dragMode %>"<% } %>\
<% if (list.selectionMode > -1) { %> SelectionMode="<%= list.selectionMode %>"<% } %>\
<% if (list.notUsingClipNode > -1) { %> NotUsingClipNode="<%= list.notUsingClipNode %>"<% } %>\
>\n\
	</DRAGLIST>\
';
module.exports = {
	templ: templ,
	toData: function(node) {
		let list = node.getComponent("MList");
		if (list == null) {
			return null;
		}
		if (list.type != 1) {
			return null;
		}
		let data = {
			type: "MList",
			name: node.name,
			x: node.x,
			y: node.y,
			width: node.width,
			height: node.height,
			lineSpace: list.lineSpace,
			itemInterval: list.itemInterval,
			dragMode: list.dragMode,
			selectionMode: list.selectionMode,
			notUsingClipNode: list.notUsingClipNode,
		};
		return data;
	},
	toXML: function(data) {
		data.y = Math.abs(data.y);
		let xml = ejs.render(templ, {list: data}, utils.ejs.opts);
        return xml;
	}
}