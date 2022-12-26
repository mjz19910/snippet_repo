import {UrlEndpoint} from "./UrlEndpoint";
import {CommandMetadata} from "./CommandMetadata";
import {TrackClick} from "./TrackClick.js";


export interface ClickCommand extends TrackClick {
	commandMetadata: CommandMetadata;
	urlEndpoint: UrlEndpoint;
};
