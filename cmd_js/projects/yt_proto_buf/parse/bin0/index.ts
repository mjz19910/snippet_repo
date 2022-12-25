import {parse_types} from './parse_types.js';

function run() {
	parse_types().catch(e => {
			console.log("promise error",e);
		});
}
run();
