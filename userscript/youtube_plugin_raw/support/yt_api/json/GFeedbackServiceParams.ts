import {GFeedbackVarMap} from "./GFeedbackVarMap.js";
import {ToServiceParams} from "./ToServiceParams.js";

export type GFeedbackServiceParams={
	service: "GFEEDBACK";
	params: ToServiceParams<GFeedbackVarMap>;
};

