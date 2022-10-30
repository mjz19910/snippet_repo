import {logging_levels} from "./const.js";

export function append_console_message(level_str:(typeof logging_levels)[number], format_str:string, ...args:any[]) {
	console.log("[%s] " + format_str, level_str, ...args);
}
