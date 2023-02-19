//#region HandleTypesEval
import {TypedefGenerator} from "./YTPlugin_Support_Service.user";

/** @arg {TemplateStringsArray} x */
function raw_template(x) {
	if(x.raw.length>1) {debugger;}
	return x.raw[0].replaceAll("\\`","`").replaceAll("\\${","${");
}
const handle_types_eval_code=raw_template`
class HandleTypesEval extends ServiceMethods {}
window.HandleTypesEval=HandleTypesEval;
//# sourceURL=plugin://extension/youtube_plugin_handle_types.js
`;
eval(handle_types_eval_code);
//#endregion
//#region Constants
/** @type {{value:TypedefGenerator|null}} */
const generate_typedef={value: null};
generate_typedef;
//#endregion
