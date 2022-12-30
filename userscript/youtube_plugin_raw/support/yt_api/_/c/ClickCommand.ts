import {UrlEndpoint} from "../u/UrlEndpoint";
import {CommandMetadata} from "./CommandMetadata";
import {ClickTrackingParams} from "../c/ClickTrackingParams.js";


export interface ClickCommand {
	commandMetadata: CommandMetadata;
	urlEndpoint: UrlEndpoint<never>;
};
