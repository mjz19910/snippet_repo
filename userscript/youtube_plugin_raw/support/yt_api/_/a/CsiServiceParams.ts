import {CsiVarMap} from "./CsiVarMap";
import {ToServiceParamsList} from "../../_abc/t/ToServiceParamsList.js";

export type CsiServiceParams={
	service: 'CSI',
	params: ToServiceParamsList<CsiVarMap>;
};
