import {GFeedbackVarMap} from "./GFeedbackVarMap.js";
import {ToServiceParamsList} from "./ToServiceParamsList.js";

export type GFeedbackServiceParams={
	service: "GFEEDBACK";
	params: ToServiceParamsList<GFeedbackVarMap>;
};

