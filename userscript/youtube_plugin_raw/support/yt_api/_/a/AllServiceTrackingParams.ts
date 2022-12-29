import {CsiServiceParams} from "../c/CsiServiceParams.js";
import {ECatcherServiceParams} from "../e/ECatcherServiceParams.js";
import {GFeedbackServiceParams} from "../g/GFeedbackServiceParams.js";
import {GOOGLE_HELP_service_params} from "../g/GOOGLE_HELP_service_params.js";
import {GuidedHelpServiceParams} from "../g/GuidedHelpServiceParams.js";

export type AllServiceTrackingParams=
	CsiServiceParams|
	ECatcherServiceParams|
	GFeedbackServiceParams|
	GOOGLE_HELP_service_params|
	GuidedHelpServiceParams;
