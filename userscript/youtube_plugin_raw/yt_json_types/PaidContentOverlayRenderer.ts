import {YtEndpoint} from "./YtEndpoint.js";
import {YtTextType} from "./YtTextType.js";
import {Icon} from "../_/i/Icon.js";

export type PaidContentOverlayRenderer={
	durationMs: `${number}`;
	icon: Icon<"MONEY_HAND">;
	navigationEndpoint: YtEndpoint;
	text: YtTextType;
	trackingParams: string;
};
