import {REPLCommandsPlugin} from "./REPLCommandsPlugin.js";
import {REPLContextPlugin} from "./REPLContextPlugin.js";
import {REPLFakeBrowserPlugin} from "./REPLFakeBrowserPlugin.js";
import {REPLPlugin} from "./REPLPlugin.js";

/**@type {(typeof REPLPlugin)[]} */
export let plugins=[
	REPLCommandsPlugin,
	REPLContextPlugin,
	REPLFakeBrowserPlugin,
];
