import {ClickTrackingParams} from "./c/ClickTrackingParams.js";
import {PingingEndpoint} from "./PingingEndpoint.js";
import {LoggingUrl} from "./l/LoggingUrl";

export interface ImpressionEndpoint extends ClickTrackingParams {
	loggingUrls: LoggingUrl[];
	pingingEndpoint: PingingEndpoint;
}
