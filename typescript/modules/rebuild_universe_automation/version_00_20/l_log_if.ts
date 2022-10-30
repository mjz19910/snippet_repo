import {LOG_LEVEL_ERROR, LOG_LEVEL_INFO, LOG_LEVEL_TRACE, LOG_LEVEL_WARN} from "../../../constants.js";
import {local_logging_level} from "../../../vars.js"
import {append_console_message} from "./append_console_message";
import {LOG_LEVEL_CRIT, LOG_LEVEL_DEBUG, LOG_LEVEL_NOTICE} from "./const.js";

/** @param {number} level @arg {string} format_str @arg {any[]} args */
export function l_log_if(level: number, format_str: string, ...args: any[]) {
	if(level > local_logging_level)
		return;
	switch(level) {
		case LOG_LEVEL_CRIT: append_console_message('crit', format_str, ...args); break;
		case LOG_LEVEL_ERROR: append_console_message('error', format_str, ...args); break;
		case LOG_LEVEL_WARN: append_console_message('warn', format_str, ...args); break;
		case LOG_LEVEL_NOTICE: append_console_message('notice', format_str, ...args); break;
		case LOG_LEVEL_INFO: append_console_message('info', format_str, ...args); break;
		case LOG_LEVEL_DEBUG: append_console_message('debug', format_str, ...args); break;
		case LOG_LEVEL_TRACE: append_console_message('trace', format_str, ...args); break;
	}
}
