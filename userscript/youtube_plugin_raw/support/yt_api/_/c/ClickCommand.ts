import {UrlEndpoint} from "../u/UrlEndpoint";
import {CommandMetadata} from "./CommandMetadata";
import {ClickTrackingParams} from "../c/ClickTrackingParams.js";


export interface ClickCommand extends ClickTrackingParams {
	commandMetadata: CommandMetadata;
	urlEndpoint: UrlEndpoint<never>;
};
