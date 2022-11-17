const loader_debug=true;

const system_modules=[
	'repl',
	'http',
	'https',
	'path',
	'process',
	'vm',
];

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
export async function resolve(specifier,context,defaultResolve) {
	if(loader_debug) console.log('spec',specifier);
	if(loader_debug) console.log('ctx',context);
	if(specifier.endsWith(".js")) {
		try {
			return await defaultResolve(specifier,context,defaultResolve);
		} catch(err) {
			if(loader_debug) console.log('Failed to load import specifier: ',specifier);
			throw err;
		}
	}
	if(system_modules.includes(specifier)) {
		return defaultResolve(specifier,context,defaultResolve);
	}
	try {
		return await defaultResolve(specifier+".js",context,defaultResolve);
	} catch {}
	if(loader_debug) console.log('Failed to load import specifier: ',specifier);
	try {
		return await defaultResolve(specifier,context,defaultResolve);
	} catch(err) {
		if(loader_debug) console.log('Failed to load import specifier: ',specifier);
		throw err;
	}
}
