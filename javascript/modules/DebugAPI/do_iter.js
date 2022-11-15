/**
 * @param {(key:"apply"|"bind"|"call")=>void} bound_function
 * @param {("apply"|"bind"|"call"|symbol)[]} keys
 */
function do_iter(bound_function,keys) {
	for(let key of keys) {
		switch(key) {
			case 'apply': bound_function(key); break;
			case 'bind': bound_function(key); break;
			case 'call': bound_function(key); break;
			default: break;
		}
	}
}
