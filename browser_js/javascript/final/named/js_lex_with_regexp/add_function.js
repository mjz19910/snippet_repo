window.inject_api.saved_objects=[];

/**
 * @param {{ name: string; }} callable
 */
export function add_function(callable) {
	if(!window.inject_api.saved_objects) return;
	window.inject_api.saved_objects.push([callable.name,callable]);
}
