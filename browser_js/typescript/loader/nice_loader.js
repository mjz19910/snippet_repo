import {system_modules} from "./system_modules.js";

const debug=false;

class ContextType {
	/**@type {string[]}*/
	conditions=[];
	importAssertions={};
	parentURL="";
}

/** @arg {string} specifier @arg {ContextType} context @arg {import("./nice_loader_types.js").ResolveFn} defaultResolve */
export async function resolve(specifier,context,defaultResolve) {
	if(debug) console.log('spec',specifier);
	if(debug) console.log('ctx',context);
	if(specifier.endsWith(".js")) {
		try {
			return defaultResolve(specifier,context,defaultResolve);
		} catch(err) {
			if(debug) console.log('Failed to load import specifier: ',specifier);
			throw err;
		}
	}
	if(system_modules.includes(specifier)) {
		return defaultResolve(specifier,context,defaultResolve);
	}
	try {
		return await defaultResolve(specifier+".js",context,defaultResolve);
	} catch {}
	if(debug) console.log('Failed to load import specifier: ',specifier);
	try {
		return await defaultResolve(specifier,context,defaultResolve);
	} catch(err) {
		if(debug) console.log('Failed to load import specifier: ',specifier);
		throw err;
	}
}
