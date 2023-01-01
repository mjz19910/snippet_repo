import {CsiServiceParams} from "./CsiServiceParams.js";
import {ECatcherServiceParams} from "./ECatcherServiceParams.js";
import {GFeedbackServiceParams} from "./GFeedbackServiceParams.js";
import {GoogleHelpServiceParams} from "./GoogleHelpServiceParams.js";
import {GuidedHelpServiceParams} from "./GuidedHelpServiceParams.js";

export type AllServiceTrackingParams=
	CsiServiceParams|
	ECatcherServiceParams|
	GFeedbackServiceParams|
	GoogleHelpServiceParams|
	GuidedHelpServiceParams;
