import {UrlEndpoint} from "./UrlEndpoint";
import {CommandMetadata} from "./CommandMetadata";
import {CT} from "./ClickTrackingParams.js";


export interface ClickCommand extends CT {
	commandMetadata: CommandMetadata;
	urlEndpoint: UrlEndpoint;
};
