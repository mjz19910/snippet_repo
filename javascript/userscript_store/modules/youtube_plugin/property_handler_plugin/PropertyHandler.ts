import {create_proxy} from "./create_proxy"

export class PropertyHandler {
	static proxy_map: Map<{},{}>=new Map
	static override_map: Map<string,{}>=new Map
	key: string
	on_target_apply_callback: (args: any) => any
	constructor(key: string,on_target_apply_callback: (args: any) => any) {
		this.key=key
		this.on_target_apply_callback=on_target_apply_callback
	}
	get() {
		return PropertyHandler.override_map.get(this.key)
	}
	set(value: any) {
		if(value===void 0) {
			PropertyHandler.override_map.delete(this.key)
			return
		} else if(value===null) {
			PropertyHandler.override_map.set(this.key,value)
			return
		}
		if(PropertyHandler.proxy_map.has(value)) {
			let nv=PropertyHandler.proxy_map.get(value)
			if(!nv)
				return
			PropertyHandler.override_map.set(this.key,nv)
			return
		}
		let proxy_override=create_proxy(value,this.on_target_apply_callback)
		PropertyHandler.proxy_map.set(value,proxy_override)
		PropertyHandler.override_map.set(this.key,proxy_override)
	}
}
