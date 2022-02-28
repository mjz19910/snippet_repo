import {EvalNullRes} from "./EvalNullRes";
import {NoVarRes} from "./NoVarRes";
import {VarRes} from "./VarRes";

export type DbgGetRes = EvalNullRes | VarRes | NoVarRes;
