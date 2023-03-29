import {parsejs} from "./_deparsejs.js";
// cspell:ignore parsejs deparsejs
declare global {
	interface Window {
		parser: parsejs;
	}
}

export {};
