import {ReelWatchEndpoint} from "../../../../ReelWatchEndpoint";
import {ShortsCommandMetadata} from "./ShortsCommandMetadata";

export type ShortsEndpoint={
	clickTrackingParams: string;
	commandMetadata: ShortsCommandMetadata;
	reelWatchEndpoint: ReelWatchEndpoint;
};
