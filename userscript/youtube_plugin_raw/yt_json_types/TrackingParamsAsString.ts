

export type TrackingParamsAsString<T,V extends string>=V extends "trackingParams"? string:T;
