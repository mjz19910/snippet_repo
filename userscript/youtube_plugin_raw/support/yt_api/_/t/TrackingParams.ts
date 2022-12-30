export const FindTrackingParamsRegexp=new RegExp("(?<!URLSearch|UrlSearch|/\*grep-skip\*/search|/\*grep-skip\*/"tracking|/\*grep-skip\*/"clickTracking|/\*grep-skip\*/tracking|"\./ClickTracking|/\*grep-skip\*/clickTracking|Tracking)Params");

export type TrackingParams={
	trackingParams: string;
};
