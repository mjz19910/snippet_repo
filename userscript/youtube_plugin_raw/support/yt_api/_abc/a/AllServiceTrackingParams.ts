import {CsiServiceParams} from "./CsiServiceParams.js";
import {ECatcherServiceParams} from "./ECatcherServiceParams";
import {GFeedbackServiceParams} from "./GFeedbackServiceParams";
import {GuidedHelpServiceParams} from "../g/GuidedHelpServiceParams";

export type AllServiceTrackingParams=[
	CsiServiceParams,
	GFeedbackServiceParams,
	GuidedHelpServiceParams,
	ECatcherServiceParams
];
