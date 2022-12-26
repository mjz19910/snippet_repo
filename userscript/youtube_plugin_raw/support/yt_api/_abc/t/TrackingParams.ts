export const FindTrackingParamsRegexp=new RegExp('(?<!URLSearch|UrlSearch|/\*grep-skip\*/search|/\*grep-skip\*/"tracking|/\*grep-skip\*/"clickTracking|/\*grep-skip\*/tracking|"\./ClickTracking|/\*grep-skip\*/clickTracking|Tracking)Params');
export type TrackingParams<U extends string>={
	/*grep-skip*/[X in U]: string;
};
export type TrackingParamsDef=TrackingParams<"trackingParams">;