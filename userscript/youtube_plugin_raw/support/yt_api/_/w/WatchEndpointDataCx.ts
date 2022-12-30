import {WatchEndpointConfig} from "./WatchEndpointConfig";
import {WatchEndpointData} from "./WatchEndpointData";

export interface WatchEndpointDataCx extends WatchEndpointData {
	nofollow: boolean;
	params: string;
	startTimeSeconds: number;
	watchEndpointSupportedOnesieConfig: WatchEndpointConfig;
}
