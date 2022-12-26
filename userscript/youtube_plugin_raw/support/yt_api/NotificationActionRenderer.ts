import {SimpleText} from "./SimpleText";
import {TrackingParams} from "./TrackingParams.js";

export interface NotificationActionRenderer extends TrackingParams {
	responseText: SimpleText;
}
