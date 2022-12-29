import {CsiServiceParams} from "./CsiServiceParams.js";
import {ECatcherServiceParams} from "./ECatcherServiceParams";
import {GFeedbackServiceParams} from "./GFeedbackServiceParams";
import {GuidedHelpServiceParams} from "../g/GuidedHelpServiceParams";
import {GOOGLE_HELP_service_params} from "./GOOGLE_HELP_service_params";

export type AllServiceTrackingParams=[
	CsiServiceParams,
	GFeedbackServiceParams,
	GuidedHelpServiceParams,
	ECatcherServiceParams,
	GOOGLE_HELP_service_params,
][number][];
