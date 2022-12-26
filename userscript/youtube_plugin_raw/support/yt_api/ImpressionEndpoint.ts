import {LoggingUrl} from "./LoggingUrl";
import {PingingEndpoint} from "./PingingEndpoint";
import {CT} from "./ClickTrackingParams.js";

export interface ImpressionEndpoint extends CT {
	loggingUrls: LoggingUrl[];
	pingingEndpoint: PingingEndpoint;
}
