import {ClickTrackingParams} from "../c/ClickTrackingParams.js";
import {PingingEndpoint} from "../p/PingingEndpoint.js";
import {LoggingUrl} from "../l/LoggingUrl";

export interface ImpressionEndpoint extends ClickTrackingParams {
	loggingUrls: LoggingUrl[];
	pingingEndpoint: PingingEndpoint;
}
