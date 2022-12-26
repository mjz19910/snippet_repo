import {CT} from "./ClickTrackingParams.js";
import {CommandMetadata} from "./CommandMetadata";

export interface TrackedCommandMetadataH extends CT {
	commandMetadata: CommandMetadata;
};
