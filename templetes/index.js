let image = require("./image");
let button = require("./button");
let radioButton = require("./radioButton");
let list = require("./list");

DlgTempl = {
	dialog: require("./dialog"),
    list: [
        list,
    	radioButton,
    	button,
    	image,
    ],
    dict: {
        "MList": list,
    	"MRadioButton": radioButton,
    	"cc.Button": button,
    	"cc.Sprite": image,
    }
}

module.exports = DlgTempl;