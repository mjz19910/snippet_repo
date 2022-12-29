import {CsiVarMap} from "./CsiVarMap";
import {ToServiceParamsList} from "./ToServiceParamsList.js";

export type CsiServiceParams={
	service: 'CSI',
	params: ToServiceParamsList<CsiVarMap>;
};
