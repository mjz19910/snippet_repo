import {ClickTrackingParams} from "./ClickTrackingParams.js";
import {CommandMetadata} from "./CommandMetadata";

export interface TrackedCommandMetadataH extends ClickTrackingParams {
	commandMetadata: CommandMetadata;
};
