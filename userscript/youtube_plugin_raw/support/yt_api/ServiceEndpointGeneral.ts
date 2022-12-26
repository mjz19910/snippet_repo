import {CT} from "./ClickTrackingParams.js";
import {CommandMetadata} from "./CommandMetadata";

export interface ServiceEndpointGeneral extends CT {
	commandMetadata: CommandMetadata;
};
