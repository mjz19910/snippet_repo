import {REPLServer as REPLServerReal,REPLCommand as REPLCommandReal} from "repl"

export interface REPLServer extends REPLServerReal {}
export interface REPLCommand extends REPLCommandReal {}
