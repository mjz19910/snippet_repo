import {Icon} from "../i/Icon.js";

export type PaidContentOverlayRenderer={
	durationMs: `${number}`;
	icon: Icon<"MONEY_HAND">;
	navigationEndpoint: {
		clickTrackingParams: string;
		commandMetadata: {
			webCommandMetadata: {};
		};
		urlEndpoint: {
			url: string;
			grwOpenInOverride: "GRW_OPEN_IN_OVERRIDE_USE_PREFERRED_APP_NO_PROMPT";
		};
	};
};
