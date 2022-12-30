import {MediaListBox} from "./MediaListBox.js";
import {BoxTemplate} from "./BoxTemplate.js";

export class CSSStyleSheetInitBox extends BoxTemplate<"shape_box",CSSStyleSheetInit> {
	readonly type="shape_box";
	readonly shape="CSSStyleSheetInit";
	set_property(key: keyof CSSStyleSheetInit,value: string|boolean|MediaListBox|undefined) {
		if(key==="baseURL") {
			if(typeof value=="string") {
				this.value[key]=value;
			} else {
				throw new Error("Invalid value for key "+key);
			}
		} else if(key==="disabled") {
			if(typeof value==="boolean") {
				this.value[key]=value;
			} else {
				throw new Error("Invalid value for key "+key);
			}
		} else if(key==="media") {
			if(typeof value==="object"&&value.instance_type==="MediaList") {
				this.value[key]=value.value;
			} else if(typeof value==="string") {
				this.value[key]=value;
			} else {
				throw new Error("Invalid value for key "+key);
			}
		} else {
			throw new Error("Type shenanigans afoot (You passed a value that should be impossible at runtime)");
		}
	}
}
