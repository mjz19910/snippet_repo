/** @arg {string[]} path @param {import("/dom/react_fiber").ReactForwardRef} forward_ref */
function on_react_forward_ref(path,forward_ref) {
	const {$$typeof,render,...y}=forward_ref; g(y);
	x: {
		if(react_render_set.has(render))
			break x;
		react_render_set.add(render);
		if($$typeof!==react_symbols.forward_ref) {
			unhandled("not_forward_ref",[forward_ref],path);
		}
		/** @type {{}[]} */
		const action_log=[];
		const known_ref_properties=[
			"absolute","children","className","component","flexItem",
			"light","orientation","role","textAlign","variant",
		];
		const base_ref={};
		const proxy_config={log_own_keys: false};
		/** @satisfies {ProxyHandler<typeof base_ref>} */
		const proxy_target={
			/** @arg {keyof typeof base_ref} k */
			get(obj,k) {
				let key=obj===base_ref? "base_ref":"unknown";
				action_log.push(["get",key,k]);
				if(k in obj)
					return obj[k];
				if(known_ref_properties.includes(k))
					return void 0;
				console.log("ref get",k);
				return void 0;
			},
			ownKeys(obj) {
				let key=obj===base_ref? "base_ref":"unknown";
				action_log.push(["ownKeys",key]);
				if(proxy_config.log_own_keys)
					console.log("ref ownKeys");
				return Reflect.ownKeys(obj);
			},
			getOwnPropertyDescriptor(target,p) {
				let key=target===base_ref? "base_ref":"unknown";
				action_log.push(["getOwnPropertyDescriptor",key,p]);
				if(p in target)
					return Reflect.getOwnPropertyDescriptor(target,p);
				console.log("ref getOwnPropertyDescriptor",p);
				return void 0;
			}
		};
		let ex_proxy=new Proxy(proxy_target,{
			/** @arg {keyof typeof proxy_target} k */
			get(obj,k) {
				if(k in obj)
					return obj[k];
				console.log("proxy get",k);
				return void 0;
			},
		});
		let is_debug=true;
		if(is_debug)
			ex_proxy=proxy_target;
		let owner_state=new Proxy(base_ref,ex_proxy);
		let prev_dispatcher=dispatcher_ref.current;
		/** @type {["error",unknown]|["result",{},{}[]]} */
		let ref_render;
		try {
			dispatcher_ref.current={
				/** @arg {ReactContext} context @arg {undefined} a1 */
				useContext(context,a1) {
					if(a1===void 0) {
						action_log.push(["useContext",1,context]);
					} else {
						action_log.push(["useContext",2,context,a1]);
					}
					return local_react_context.useContext(context,a1);
				}
			};
			let res=render(owner_state,null);
			ref_render=["result",res,action_log];
		} catch(e) {
			ref_render=["error",e];
		} finally {
			dispatcher_ref.current=prev_dispatcher;
		}
		if(ref_render[0]==="error") {
			ns.print("forward_ref.render.name: ",render.name," ",render.length);
		} else {
			console.log("forward_ref",ref_render[1],{log: ref_render[2]});
		}
	}
}
