import {ClickTrackingParams} from "./ClickTrackingParams.js";
import {CommandMetadata} from "./CommandMetadata";

export interface ServiceEndpointGeneral extends ClickTrackingParams {
	commandMetadata: CommandMetadata;
};
