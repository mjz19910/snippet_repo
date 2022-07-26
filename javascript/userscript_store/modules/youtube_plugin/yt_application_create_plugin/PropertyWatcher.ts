import {active_property_watcher_paths} from "./active_property_watcher_paths"
import {ghost_symbol} from "./ghost_symbol"
import {watched_target_map} from "./watched_target_map"
import {object_property_watcher} from "./object_property_watcher"
import {watched_function_weak_set} from "./watched_function_weak_set"
import {walk_key_path} from "./walk_key_path"

export class PropertyWatcher {
	[ghost_symbol]=true
	property_key: PropertyKey
	target: object
	property_path: string
	constructor(value: {},target: object,property_key: PropertyKey,property_path: string,noisy: boolean) {
		this.value=value
		this.property_key=property_key
		this.target=target
		this.property_path=property_path
		this.noisy=noisy
	}
	define_target_property() {
		if(watched_target_map.has(this.target)&&watched_target_map.get(this.target).names.indexOf(this.property_key)>-1) {
			return this
		}
		Object.defineProperty(this.target,this.property_key,{
			configurable: true,
			enumerable: true,
			get() {
				return this.value
			},
			set(value) {
				this.on_property_set(value)
			}
		})
		if(watched_target_map.has(this.target)) {
			watched_target_map.get(this.target).names.push(this.property_key)
		} else {
			watched_target_map.set(this.target,{names: [this.property_key]})
		}
		return this
	}
	on_property_set(value: {[ghost_symbol]: any}) {
		if(watched_function_weak_set.has(value))
			this.value=value
		if(value[ghost_symbol]===undefined) {
			this.on_new_property_path(value)
		} else {
			this.value=value
		}
	}
	on_new_property_path(value: any) {
		let this_=this
		if(value instanceof Function) {
			this.function_value=value
			this.value=function(this: {},...args: any) {
				let ret
				let act_cb_obj={fired: false,ret: ret}
				object_property_watcher.dispatchEvent({type: 'new-window-property-path',data: {type: this_.value_tr,data: [this_.function_value,this,args,act_cb_obj]}})
				if(!act_cb_obj.fired&&this_.function_value)
					return this_.function_value.apply(this,args)
				return act_cb_obj.ret
			}
			watched_function_weak_set.add(this.value)
		} else {
			let ck_i=0
			let ck_str=active_property_watcher_paths[ck_i]
			let mc=walk_key_path(this,ck_str,value)
			for(;ck_i<active_property_watcher_paths.length;ck_i++) {
				ck_str=active_property_watcher_paths[ck_i]
				mc=walk_key_path(this,ck_str,value,mc)
			}
			this.value=value
		}
	}
	value={}
	value_tr=""
	/**@type {Function | null} */
	function_value: Function|null=null
	noisy=false
}
