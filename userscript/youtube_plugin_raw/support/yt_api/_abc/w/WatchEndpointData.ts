import {WatchEndpointConfig} from "./WatchEndpointConfig";

export type WatchEndpointData={
	videoId: string;
};

export interface WatchEndpointDataCx extends WatchEndpointData {
	nofollow: boolean;
	params: string;
	startTimeSeconds: number;
	watchEndpointSupportedOnesieConfig: WatchEndpointConfig;
}
