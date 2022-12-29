import {CsiVarMap} from "./CsiVarMap";
import {ToServiceParamsList} from "../t/ToServiceParamsList.js";

export type CsiServiceParams={
	service: 'CSI',
	params: ToServiceParamsList<CsiVarMap>;
};
