import {ReelWatchEndpoint} from "./ReelWatchEndpoint";
import {ShortsCommandMetadata} from "./ShortsCommandMetadata";

export type ShortsEndpoint<T>={
	clickTrackingParams: string;
	commandMetadata: ShortsCommandMetadata<T>;
	reelWatchEndpoint: ReelWatchEndpoint;
};
