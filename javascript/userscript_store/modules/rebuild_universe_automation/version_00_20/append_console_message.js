import {logging_levels} from "./const.js";

/**@arg {(typeof logging_levels)[number]} level_str @arg {string} format_str@arg {any[]} args */
export function append_console_message(level_str, format_str, ...args) {
	console.log("[%s] " + format_str, level_str, ...args);
}
