var path = require("path");

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
}