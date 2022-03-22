import {REPLFakeBrowserPlugin} from "./REPLFakeBrowserPlugin";
/**
 * @arg {REPLFakeBrowserPlugin['obj']} st
 * @param {string} name
 */
export function get_from_store(st, name) {
	if(!st)
		return null;
	switch(st.type) {
		case 'keys':
			let nx = name;
			switch(nx) {
				case 'window': return st.value[nx];
			}
			console.log('case needed for', name);
		case 'no-keys':
	}
	return null;
}
