import {CommandMetadata} from "./CommandMetadata.js";
import {WatchEndpoint} from "./WatchEndpoint";

export type WatchEndpointH={
	watchEndpoint: WatchEndpoint;
};
export type ClickTrackedWatchEndpointH={
	clickTrackingParams: string;
	watchEndpoint: WatchEndpoint;
}
export type ClickTrackedAndCommandMetadataWatchEndpointH={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	watchEndpoint: WatchEndpoint;
}