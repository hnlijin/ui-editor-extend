let image = require("./image");
let button = require("./button");
let radioButton = require("./radioButton");
let list = require("./list");
let label = require("./label");
let dragList = require("./dragList");

DlgTempl = {
	dialog: require("./dialog"),
    list: [
        dragList,
        label,
        list,
    	radioButton,
    	button,
    	image,
    ],
    dict: {
        "MDragList": dragList,
        "MLabel": label,
        "MList": list,
    	"MRadioButton": radioButton,
    	"MButton": button,
    	"MImage": image,
    }
}

module.exports = DlgTempl;