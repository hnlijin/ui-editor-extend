let image = require("./image");
let button = require("./button");
let radioButton = require("./radioButton");

DlgTempl = {
	dialog: require("./dialog"),
    list: [
    	radioButton,
    	button,
    	image,
    ],
    dict: {
    	"RadioButton": radioButton,
    	"cc.Button": button,
    	"cc.Sprite": image,
    }
}

module.exports = DlgTempl;