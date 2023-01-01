import {GuidedHelpState} from "./GuidedHelpState.js";
import {ToServiceParams} from "./ToServiceParams.js";

export type GuidedHelpServiceParams={
	service: "GUIDED_HELP";
	params: ToServiceParams<GuidedHelpState>;
};
