import {Icon} from "../i/Icon.js";
import {SimpleTextFixmeValueNeeded} from "../s/SimpleText.js";
import {PaidContentEndpoint} from "./PaidContentEndpoint";

export type PaidContentOverlayRenderer={
	durationMs: `${number}`;
	icon: Icon<"MONEY_HAND">;
	navigationEndpoint: PaidContentEndpoint;
	text: SimpleTextFixmeValueNeeded;
	trackingParams: string;
};
