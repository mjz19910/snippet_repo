import {DebuggableTypes} from "./DebuggableTypes";

export type ChromeDevToolsDebug = (fn_to_start_dbg: DebuggableTypes, breakpoint_stop_eval: string) => void;
