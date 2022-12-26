import {PingingEndpoint} from "./PingingEndpoint";
import {ClickTrackingParams} from "./ClickTrackingParams.js";

type LoggingUrl={
	baseUrl: string;
};

export interface ImpressionEndpoint extends ClickTrackingParams {
	loggingUrls: LoggingUrl[];
	pingingEndpoint: PingingEndpoint;
}
