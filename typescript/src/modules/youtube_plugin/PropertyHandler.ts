import {Box} from "../../box/Box.js";
import {VoidBox} from "../../box/VoidBox.js";

export class PropertyHandler<
	U extends [target: any,thisArg: any,argArray: any[]],
	T extends (args: U) => any
> {
	static instances: PropertyHandler<[any,any,any[]], (args:any[])=>any>[]=[];
	proxy_map: Map<Box,Box>=new Map;
	override_value: {value: Box;}={value: new VoidBox};
	on_target_apply_callback: T;
	constructor(on_target_apply_callback: T) {
		this.on_target_apply_callback=on_target_apply_callback;
	}
	get(): Box {
		return this.override_value.value;
	}
	set(value: Box) {
		if(value===void 0||value===null) {
			this.override_value.value=value;
			return;
		}
		if(this.proxy_map.has(value)) {
			let proxy_override=this.proxy_map.get(value)!;
			this.override_value.value=proxy_override;
		} else {
			let t=this;
			let proxy_override=new Proxy(value,{
				apply(...arr: U) {
					return t.on_target_apply_callback(arr);
				}
			});
			this.proxy_map.set(value,proxy_override);
			this.override_value.value=proxy_override;
		}
	}
}
