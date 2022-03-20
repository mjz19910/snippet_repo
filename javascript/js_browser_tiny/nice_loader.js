const debug=true;
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
export async function resolve(specifier, context, defaultResolve) {
	if(debug)console.log('spec', specifier);
	if(debug)console.log('ctx', context);
	if(specifier.endsWith(".js")) {
		try{
			return defaultResolve(specifier, context, defaultResolve);
		}catch(err){
			console.log('module err', err);
			return {};
		}
	}
	try{
		return await defaultResolve(specifier + ".js", context, defaultResolve);
	} catch(err) {
		console.log('module err', err);
		try{
			return defaultResolve(specifier, context, defaultResolve);
		}catch(err){
			console.log('module err', err);
			return {};
		}
	}
}
