export type TrackingParamsForKey<U extends string>={
	[X in U]: string;
};
