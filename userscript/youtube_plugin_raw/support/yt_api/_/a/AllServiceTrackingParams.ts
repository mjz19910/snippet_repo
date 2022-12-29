import {CsiServiceParams} from "./CsiServiceParams.js";
import {ECatcherServiceParams} from "./ECatcherServiceParams";
import {GFeedbackServiceParams} from "./GFeedbackServiceParams";
import {GuidedHelpServiceParams} from "../../_abc/g/GuidedHelpServiceParams";
import {GOOGLE_HELP_service_params} from "./GOOGLE_HELP_service_params";

export type AllServiceTrackingParams=
	CsiServiceParams|
	ECatcherServiceParams|
	GFeedbackServiceParams|
	GOOGLE_HELP_service_params|
	GuidedHelpServiceParams;
