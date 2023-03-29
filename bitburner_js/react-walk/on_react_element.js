/** @param {import("/dom/react_fiber").ReactElement2} element @arg {string[]} path */
function on_react_element(element,path) {
	const react_element_sym=react_symbols.react_element;
	switch(element.$$typeof) {
		default: unhandled("react_element",[element],path);
		case react_element_sym: {
			const {$$typeof,type,key,ref,props,_owner,...y}=element; g(y);
			x: if(typeof type!=="function") {
				on_react_forward_ref(path,type);
			} else {
				/** @type {[number,string]} */
				let fn_string=[0,""];
				if(!fn_set.has(type)) {
					fn_set.add(type);
					fn_string[1]=type.toString();
					if(!fn_str_list.includes(fn_string[1]))
						fn_str_list.push(fn_string[1]);
					fn_string[0]=fn_str_list.indexOf(fn_string[1]);
					fn_str_map.set(type,fn_string);
				} else {
					let item=fn_str_map.get(type);
					if(!item)
						ns.exit();
					fn_string=item;
				}
				if(type.name==="p"&&fn_string[0]===0)
					break x;
				ns.print("react_element.type: ",type.name," idx:",fn_string[0]);
			}
			x: {
				if(key===null)
					break x;
				ns.print("react_element.key: ",key);
			}
		} return;
	}
}
