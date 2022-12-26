import {CT} from "./ClickTrackingParams.js";
import {CommandMetadata} from "./CommandMetadata";


export interface TrackedServiceEndpointGeneral extends CT {
	trackingParams: string;
	commandMetadata: CommandMetadata;
};
