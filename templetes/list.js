var ejs = require('ejs');
var utils = require("./../utils");

var templ = 
'\
	<LIST Name="<%= list.name %>"\
<% if (list.x != null) { %> x="<%= list.x %>"<% } %>\
<% if (list.y != null) { %> y="<%= list.y %>"<% } %>\
<% if (list.width != null) { %> Width="<%= list.width %>"<% } %>\
<% if (list.height != null) { %> Height="<%= list.height %>"<% } %>\
<% if (list.lineSpace > 0) { %> LineSpace="<%= list.lineSpace %>"<% } %>\
<% if (list.itemInterval > 0) { %> ItemInterval="<%= list.itemInterval %>"<% } %>\
<% if (list.pressSoundID > 0) { %> PressSoundID="<%= list.pressSoundID %>"<% } %>\
<% if (list.dragMode > -1) { %> DragMode="<%= list.dragMode %>"<% } %>\
<% if (list.selectionMode > -1) { %> SelectionMode="<%= list.selectionMode %>"<% } %>\
<% if (list.notUsingClipNode > -1) { %> NotUsingClipNode="<%= list.notUsingClipNode %>"<% } %>\
>\
<% if (list.upSprite != null && list.downSprite != null) { %>\n\
		<Resource>\n\
			<UpImage \
FileName="<%= list.upSprite.fileName %>"\
<% if (list.upSprite.frameMode) { %> FrameMode="<%= list.upSprite.frameMode %>"<% } %>/>\n\
			<DownImage \
FileName="<%= list.downSprite.fileName %>"\
<% if (list.downSprite.frameMode) { %> FrameMode="<%= list.downSprite.frameMode %>"<% } %>/>\n\
		</Resource>\
<% } %>\n\
	</LIST>\
';
module.exports = {
	templ: templ,
	toData: function(node) {
		let list = node.getComponent("MList");
		if (list == null || list.enabled == false) {
			return null;
		}
		if (list.type != 0) {
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
		if (list.upSprite != null && list.downSprite != null) {
			data.upSprite = {
				url: list.upSprite.getTexture().url,
				frameMode: list.upSpriteFrameMode,
			};
			data.downSprite = {
				url: list.downSprite.getTexture().url,
				frameMode: list.downSpriteFrameMode,
			};
		}
		let soundID = node.getComponent("MSoundID");
		if (soundID != null && soundID.enabled == true) {
			data.pressSoundID = soundID.pressSoundID;
		}
		return data;
	},
	toXML: function(data) {
		data.y = Math.abs(data.y);
		if (data.upSprite && data.downSprite) {
			data.upSprite.fileName = utils.urlToResPath(data.upSprite.url);
			data.downSprite.fileName = utils.urlToResPath(data.downSprite.url);
		}
		let xml = ejs.render(templ, {list: data}, utils.ejs.opts);
        return xml;
	}
}