var path = require("path");
var fs = require("fs");
var os = require("os");
var settings = require("./settings");

function isIgnoreItem(url) {
	let uuid = urlTouuid(url);
	let p = uuidToPath(uuid);
	return p.indexOf("/demo/") >= 0;
}

function urlTouuid(url) {
	return path.basename(url, path.extname(url));
}

function uuidToPath(uuid) {
	return Editor.assetdb.uuidToUrl(uuid);
}

function urlToResPath(url) {
	let uuid = urlTouuid(url);
	let p = uuidToPath(uuid);
	if (p != null) {
		return p.replace("db://assets/resources/", "");
	}
	return "";
}

function getSurfacePath(fileName) {
	let surfacePaths = settings.surface_paths;
	for (let k in surfacePaths) {
		let p = path.join(settings.client_res_path, "resource", "assets", surfacePaths[k], fileName);
		if(fs.existsSync(p)) {
			return p;
		}
	}
	return null;
}

module.exports = {
	ejs: {
		opts: {
			escape: function(value) {
				return value;
			}
		},
	},
	uuidToPath: uuidToPath,
	urlToResPath: urlToResPath,
	isIgnoreItem: isIgnoreItem,
	getSurfacePath: getSurfacePath,
}