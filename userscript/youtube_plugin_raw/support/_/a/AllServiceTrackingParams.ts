import {CsiServiceParams} from "../../yt_api/exact_data/CsiServiceParams.js";
import {ServiceParams} from "../../yt_api/exact_data/ServiceParams.js";

export type AllServiceTrackingParams=[
	CsiServiceParams,
	ServiceParams<"GFEEDBACK">,
	ServiceParams<"GUIDED_HELP">,
	ServiceParams<"ECATCHER">
];
