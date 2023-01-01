import {GuidedHelpState} from "./GuidedHelpState.js";
import {ToServiceParamsList} from "./ToServiceParamsList.js";

export type GuidedHelpServiceParams={
	service: "GUIDED_HELP";
	params: ToServiceParamsList<GuidedHelpState>;
};
