import {LOGGING_LEVEL} from "../config/vars"

export function log_if_level(logging_level: number,logger_format: string,...logger_args: any[]) {
	if(logging_level>LOGGING_LEVEL) {
		console.log(logger_format,...logger_args)
	}
}
