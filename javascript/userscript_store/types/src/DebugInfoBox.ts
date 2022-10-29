import {EvalLostBox as EvalLostBox} from "./EvalLostBox"
import {NoVarBox as NoVarBox} from "./NoVarBox"
import {VarBox as VarBox} from "./VarBox"
export type DebugInfoBox=EvalLostBox|VarBox|NoVarBox
