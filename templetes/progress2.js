var ejs = require('ejs');
var utils = require("./../utils");

var templ =
'\
	<PROGRESS2 Name="<%= progress.name %>"\
<% if (progress.x) { %> x="<%= progress.x %>"<% } %>\
<% if (progress.y) { %> y="<%= progress.y %>"<% } %>\
<% if (progress.width) { %> Width="<%= progress.width %>"<% } %>\
<% if (progress.height) { %> Height="<%= progress.height %>"<% } %>\
<% if (progress.mode != null) { %> Mode="<%= progress.mode %>"<% } %>\
>\n\
<% if (progress.barSprite != null) { %>\
		<Resource>\n\
			<FrameImage FileName="<%= progress.bgSprite.fileName %>"/>\n\
			<FillImage FileName="<%= progress.barSprite.fileName %>" \
x="<%= progress.barSprite.x %>" \
y="<%= progress.barSprite.y %>"/>\n\
<% if (progress.sparkSprite != null) { %>\
			<SparkImage FileName="<%= progress.sparkSprite.fileName %>" \
x="<%= progress.sparkSprite.x %>" \
y="<%= progress.sparkSprite.y %>"/>\n\
<% } %>\
<% } %>\
		</Resource>\n\
<% if (progress.label != null) { %>\
		<TextRect x="<%= progress.label.x %>" \
y="<%= progress.label.y %>" \
Width="<%= progress.label.width %>" \
Height="<%= progress.label.height %>"/>\n\
		<Text FontAlias="<%= progress.label.fontAlias %>" \
Align="<%= progress.label.align %>" \
AlignVert="<%= progress.label.alignVert %>" \
ColorID="<%= progress.label.colorID %>" \
String="<%= progress.label.string %>"/>\n\
<% } %>\
	</PROGRESS2>\
';

module.exports = {
	templ: templ,
	toData: function(node) {
		let progressBar = node.getComponent(cc.ProgressBar);
		if (progressBar == null || progressBar.enabled == false) {
			return null;
		}
		let data = {
			type: "MProgressBar2",
	        name: node.name,
	        x: node.x, 
	        y: node.y,
	        width: node.width,
	        height: node.height,
		}
		let bgSprite = node.getComponent(cc.Sprite);
		if (bgSprite != null) {
			data.bgSprite = {					
				url: bgSprite.spriteFrame.getTexture().url,
			}
		} else {
			Editor.log("export error: name = " + node.name + " 在节点上没有发现cc.Sprite组件！");
		}
		let mProgressBar = node.getComponent("MProgress2");
		if (mProgressBar != null) {
			data.mode = parseInt(mProgressBar.mode)
		}
		let barNode = node.getChildByName("bar");
		if (barNode != null && barNode.active == true) {
			let barSprite = barNode.getComponent(cc.Sprite);
			if (barSprite != null) {
				data.barSprite = {
					x: barNode.x,
					y: barNode.y,
					url: barSprite.spriteFrame.getTexture().url,
				}
			} else {
				Editor.log("export error: name = " + node.name + " 在节点的bar子节点上没有发现cc.Sprite组件！");
			}
		}
		let sparkNode = node.getChildByName("spark");
		if (sparkNode != null && sparkNode.active == true) {
			let sparkSprite = sparkNode.getComponent(cc.Sprite);
			if (sparkSprite != null) {
				data.sparkSprite = {
					x: sparkNode.x,
					y: sparkNode.y,
					url: sparkSprite.spriteFrame.getTexture().url,
				}
			} else {
				Editor.log("export error: name = " + node.name + " 在节点的spark子节点上没有发现cc.Sprite组件！");
			}
		}
		let textNode = node.getChildByName("text");
		if(textNode != null && textNode.active == true)
		{		
			let label = textNode.getComponent(cc.Label);
			let labelConfig = textNode.getComponent("MLabelConfig");
			if (label != null && labelConfig != null && label.enabled == true && labelConfig.enabled == true) {
				data.label = {
					x: textNode.x,
					y: textNode.y,
					width: textNode.width,
					height: textNode.height,
					fontAlias: labelConfig.fontAlias,
					colorID: parseInt(labelConfig.colorID),
					align: label.horizontalAlign,
					alignVert: label.verticalAlign,
					string: label.string,
				}
			}
		}
		return data;
	},
	toXML: function(data) {
		data.y = Math.abs(data.y);
		if (data.barSprite != null) {
			data.barSprite.fileName = utils.urlToResPath(data.barSprite.url);
			data.barSprite.y = Math.abs(data.barSprite.y);
		}
		if (data.bgSprite != null) {
			data.bgSprite.fileName = utils.urlToResPath(data.bgSprite.url);
			data.bgSprite.y = Math.abs(data.bgSprite.y);
		}
		if (data.sparkSprite != null) {
			data.sparkSprite.fileName = utils.urlToResPath(data.sparkSprite.url);
			data.sparkSprite.y = Math.abs(data.sparkSprite.y);
		}
        let xml = ejs.render(templ, {progress: data}, utils.ejs.opts);
        return xml;
	},
	toNode: function(data) {
		return null;
	}
}