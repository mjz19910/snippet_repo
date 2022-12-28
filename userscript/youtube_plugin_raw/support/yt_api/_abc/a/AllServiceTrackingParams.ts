import {CsiServiceParams} from "../../exact_data/CsiServiceParams.js";
import {ServiceParams} from "../../exact_data/ServiceParams.js";

export type AllServiceTrackingParams=[
	CsiServiceParams,
	ServiceParams<"GFEEDBACK">,
	ServiceParams<"GUIDED_HELP">,
	ServiceParams<"ECATCHER">
];
