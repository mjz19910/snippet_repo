import {Box} from "../../../box/Box.js";
import {ObjectBox} from "../../../box/ObjectBox.js";
import {VoidBox} from "../../../box/VoidBox.js";
import {create_proxy} from "./create_proxy.js"

type CallbackType = [target: any, thisArg: any, argArray: any[]];

export class PropertyHandler {
	static instances:PropertyHandler[]=[];
	proxy_map: Map<Box,Box>=new Map;
	override_value:{value: Box}={value:new VoidBox};
	on_target_apply_callback: (args: CallbackType) => any
	constructor(on_target_apply_callback: (args: CallbackType) => any) {
		this.on_target_apply_callback=on_target_apply_callback;
	}
	get():Box {
		return this.override_value.value;
	}
	set(value: Box) {
		if(value===void 0 || value===null) {
			this.override_value.value=value;
			return;
		}
		let proxy_override: Box;
		if(this.proxy_map.has(value)) {
			let proxy_override=this.proxy_map.get(value);
			if(!proxy_override) return;
			this.override_value.value=proxy_override;
		} else {
			proxy_override=create_proxy(value,this.on_target_apply_callback);
			this.proxy_map.set(value,proxy_override);
			this.override_value.value=proxy_override;
		}
	}
}
