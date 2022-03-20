const debug=false;
class ContextType {
	/**@type {string[]}*/
	conditions=[];
	importAssertions={};
	parentURL="";
}
/**
 * @param {string} specifier
 * @param {ContextType} context
 * @param {import("./nice_loader_types.js").ResolveFn} defaultResolve
 */
export function resolve(specifier, context, defaultResolve) {
	if(debug)console.log('spec', specifier);
	if(debug)console.log('ctx', context);
	if(specifier.endsWith(".js")){
		return defaultResolve(specifier, context, defaultResolve);
	}
	try{
		return defaultResolve(specifier + ".js", context, defaultResolve);
	} catch(err) {
		return defaultResolve(specifier, context, defaultResolve);
	}
}
