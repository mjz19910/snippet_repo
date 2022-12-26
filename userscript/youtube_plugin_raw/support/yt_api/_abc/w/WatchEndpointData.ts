import {Split} from "../../../Split.js";
import {hidden_namespace} from "./hidden_namespace";
import {WatchEndpointConfig} from "./WatchEndpointConfig";

export type YtVideoIdStr<T>=T extends string? Split<T,"">['length'] extends 11? T:never:never;

export type WatchEndpointData<T>={
	videoId: YtVideoIdStr<T>;
};

export interface WatchEndpointDataCx<T> extends WatchEndpointData<T> {
	nofollow: boolean;
	params: string;
	startTimeSeconds: number;
	watchEndpointSupportedOnesieConfig: WatchEndpointConfig;
}
