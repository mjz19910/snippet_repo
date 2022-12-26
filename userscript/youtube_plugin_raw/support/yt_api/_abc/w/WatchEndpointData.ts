import {WatchEndpointConfig} from "./WatchEndpointConfig";

export type WatchEndpointData={
	nofollow: boolean;
	videoId: string;
	params?: string;
	startTimeSeconds?: number;
	watchEndpointSupportedOnesieConfig: WatchEndpointConfig;
};
