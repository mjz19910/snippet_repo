import {LOGGING_LEVEL} from "./youtube_plugin.user"

/**
 * @param {number} logging_level
 * @param {string} logger_format
 * @param {any[]} logger_args
 */
export function log_if_level(logging_level: number,logger_format: string,...logger_args: any[]) {
	if(logging_level>LOGGING_LEVEL) {
		console.log(logger_format,...logger_args)
	}
}
