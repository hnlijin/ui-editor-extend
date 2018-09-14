let image = require("./image");
let button = require("./button");
let radioButton = require("./radioButton");
let list = require("./list");
let label = require("./label");
let dragList = require("./dragList");
let clippingContainer = require("./clippingContainer");
let scrollBar = require("./scrollBar");
let progress2 = require("./progress2");
let atlaslabel = require("./atlaslabel");
let dialog = require("./dialog");

DlgTempl = {
	dialog: dialog,
    list: [
        atlaslabel,
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
        "MAtlasLabel": atlaslabel,
		"MProgressBar2":progress2,
        "MScrollBar": scrollBar,
        "MClippingContainer": clippingContainer,
        "MDragList": dragList,
        "MLabel": label,
        "MList": list,
    	"MRadioButton": radioButton,
    	"MButton": button,
    	"MImage": image,
    },
    node: {
        "ATLASLABEL": atlaslabel, 
        "PROGRESS2": progress2,
        "SCROLLBAR": scrollBar,
        "CLIPPINGCONTAINER": clippingContainer,
        "DRAGLIST": dragList,
        "FREELABEL": label,        
        "LIST": list,
        "RADIO": radioButton,
        "STILLIMAGEBUTTON": button,
        "IMAGEPICTURE": image,
        "DIALOG": dialog,
    }
}

module.exports = DlgTempl;