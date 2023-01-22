import {TrackingParamsAsString} from "./TrackingParamsAsString";

export type MakeRenderer<T extends string,EA extends [any,any]>={
	[V in T]: EA extends [infer A extends string,infer B]? {
		[V in (A|"trackingParams")]: TrackingParamsAsString<B,V>;
	}:EA;
};
