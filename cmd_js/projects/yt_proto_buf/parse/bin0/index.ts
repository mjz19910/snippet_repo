import {load_imports} from './load_imports.js';
import {parse_types} from './parse_types.js';

function run() {
	import('protobufjs')
		.then(load_imports)
		.then(parse_types)
		.catch(e => {
			console.log("promise error",e);
		});
}
run();
