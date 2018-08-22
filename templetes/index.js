let image = require("./image");
let button = require("./button");
let radioButton = require("./radioButton");
let list = require("./list");
let label = require("./label");
let dragList = require("./dragList");
let clippingContainer = require("./clippingContainer");
let scrollBar = require("./scrollBar");
let progress2 = require("./progress2");

DlgTempl = {
	dialog: require("./dialog"),
    list: [
		progress2,
        scrollBar,
        clippingContainer,
        dragList,
        label,
        list,
    	radioButton,
    	button,
    	image,
    ],
    dict: {
		"MProgressBar2":progress2,
        "MScrollBar": scrollBar,
        "MClippingContainer": clippingContainer,
        "MDragList": dragList,
        "MLabel": label,
        "MList": list,
    	"MRadioButton": radioButton,
    	"MButton": button,
    	"MImage": image,
    }
}

module.exports = DlgTempl;