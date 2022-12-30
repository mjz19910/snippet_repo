import {ReelWatchEndpoint} from "../r/ReelWatchEndpoint.js";
import {ShortsCommandMetadata} from "./ShortsCommandMetadata";

export type ShortsEndpoint={
	clickTrackingParams: string;
	commandMetadata: ShortsCommandMetadata;
	reelWatchEndpoint: ReelWatchEndpoint;
};
