import {DebuggableTypes} from "./DebuggableTypes.js";

export type ChromeDevToolsDebug=(fn_to_start_dbg: DebuggableTypes,breakpoint_stop_eval: string) => void;
