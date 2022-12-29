import {CsiVarMap} from "./CsiVarMap";
import {ToServiceParams} from "./ToServiceParams";

export type CsiServiceParams={
	service: 'CSI',
	params: ToServiceParams<CsiVarMap>[keyof CsiVarMap][];
};
