export class PropertyHandler<T> {
	static instances: PropertyHandler<any>[]=[];
	proxy_map: Map<()=>T,()=>T>=new Map;
	override_value: {value: (()=>T)|undefined;};
	on_target_apply_callback: <A extends () => T>(args: [A, null, Parameters<A>]) => T;
	constructor(on_target_apply_callback: PropertyHandler<T>['on_target_apply_callback'],value: (()=>T)|undefined) {
		this.override_value={value};
		this.on_target_apply_callback=on_target_apply_callback;
	}
	get(): (()=>T)|undefined {
		return this.override_value.value;
	}
	set(value: (()=>T)|undefined) {
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
				apply(...args: [() => T, null, []]) {
					return t.on_target_apply_callback(args);
				}
			});
			this.proxy_map.set(value,proxy_override);
			this.override_value.value=proxy_override;
		}
	}
}
