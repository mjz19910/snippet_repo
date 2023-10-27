// deno-lint-ignore-file
import {active_property_watcher_paths} from "./active_property_watcher_paths.ts";
import {ghost_symbol} from "./ghost_symbol.ts";
import {watched_target_map} from "./watched_target_map.ts";
import {object_property_watcher} from "../object_property_watcher.ts";
import {watched_function_weak_set} from "./watched_function_weak_set.ts";
import {init_property_watcher_for_target} from "./init_property_watcher_for_target.ts";

export class PropertyWatcher {
	[ghost_symbol]=true;
	property_key: PropertyKey;
	target: object;
	property_path: string;
	constructor(value: {},target: object,property_key: PropertyKey,property_path: string,noisy: boolean) {
		this.value=value;
		this.property_key=property_key;
		this.target=target;
		this.property_path=property_path;
		this.noisy=noisy;
	}
	define_target_property() {
		let this_=this;
		if(watched_target_map.has(this.target)&&watched_target_map.get(this.target).names.indexOf(this.property_key)>-1) {
			return this;
		}
		Object.defineProperty(this.target,this.property_key,{
			configurable: true,
			enumerable: true,
			get() {
				return this_.value;
			},
			set(value) {
				this_.on_property_set(value);
			}
		});
		if(watched_target_map.has(this.target)) {
			watched_target_map.get(this.target).names.push(this.property_key);
		} else {
			watched_target_map.set(this.target,{names: [this.property_key]});
		}
		return this;
	}
	on_property_set(value: {[ghost_symbol]: any;}) {
		if(watched_function_weak_set.has(value))
			this.value=value;
		if(value[ghost_symbol]===undefined) {
			this.on_new_property_path(value);
		} else {
			this.value=value;
		}
	}
	on_new_property_path(value: any) {
		let this_=this;
		if(value instanceof Function) {
			this.function_value=value;
			this.value=function(this: {},...args: any) {
				let ret;
				let act_cb_obj={fired: false,ret: ret};
				object_property_watcher.dispatchEvent({type: 'new-window-property-path',data: {type: this_.value_tr,data: [this_.function_value,this,args,act_cb_obj]}});
				if(!act_cb_obj.fired&&this_.function_value)
					return this_.function_value.apply(this,args);
				return act_cb_obj.ret;
			};
			watched_function_weak_set.add(this.value);
		} else {
			let cur_property_path=this.walk_key_path(active_property_watcher_paths[0],value);
			for(let i=0;i<active_property_watcher_paths.length;i++) {
				cur_property_path=this.walk_key_path(active_property_watcher_paths[i],value,cur_property_path);
			}
			this.value=value;
		}
	}
	walk_key_path(property_key_path: string,value: {},prev_walk_key_path?: string) {
		let match_parts_1;
		let value_tr_match_res=property_key_path.match(this.value_tr);
		if(value_tr_match_res!==null) {
			match_parts_1=value_tr_match_res[0];
		} else {
			return prev_walk_key_path;
		}
		let arg_1_slice=property_key_path.slice(match_parts_1.length+1);
		let index=arg_1_slice.indexOf('.');
		let property_name;
		if(index>-1) {
			property_name=arg_1_slice.slice(0,index);
		} else {
			property_name=arg_1_slice;
		}
		if(property_name.length>0) {
			if((this.value_tr+'.'+property_name)==prev_walk_key_path) {
				return this.value_tr+'.'+property_name;
			}
			init_property_watcher_for_target(value,property_name,this.value_tr+'.'+property_name,this.noisy);
			return this.value_tr+'.'+property_name;
		}
		return "";
	}
	value={};
	value_tr="";
	function_value: Function|null=null;
	noisy: boolean;
}
