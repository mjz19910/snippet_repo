import {WatchEndpointConfig} from "./WatchEndpointConfig";

export type WatchEndpoint={
	nofollow: boolean;
	videoId: string;
	params?: string;
	startTimeSeconds?: number;
	watchEndpointSupportedOnesieConfig: WatchEndpointConfig;
};
