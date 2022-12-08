window.inject_api.saved_objects=[];
window.inject_api.saved_object_arrays=[];

/**
 * @param {{ name: string; }} callable
 */
export function add_function(callable) {
	window.inject_api.saved_objects.push([callable.name,callable]);
}
