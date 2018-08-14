var fs = require("fs");

let settings_text =
`{
	"client_res_path": "",
	"client_res_interface_path": ""
}`;

module.exports = {
	client_res_path: '',
  	client_res_interface_path: '',
	load() {
		let p = Editor.url('packages://ui-editor-extend/settings/ui-editor-extend.json', 'utf8');
		if (fs.existsSync(p) == false) {
			fs.writeFileSync(p, settings_text);
		}
		let json = fs.readFileSync(p);
	    let object = JSON.parse(json);
	    this.client_res_path = object.client_res_path;
	    this.client_res_interface_path = object.client_res_interface_path;
	    Editor.log("ClientRes Path: ", this.client_res_path);
	    Editor.log("ClientRes Interface Path: ", this.client_res_interface_path);
	},
	save() {
	},
}