import {UrlEndpoint} from "../u/UrlEndpoint";
import {CommandMetadata} from "./CommandMetadata";
import {ClickTrackingParams} from "./ClickTrackingParams.js";


export interface ClickCommand extends ClickTrackingParams {
	commandMetadata: CommandMetadata;
	urlEndpoint: UrlEndpoint<never>;
};
