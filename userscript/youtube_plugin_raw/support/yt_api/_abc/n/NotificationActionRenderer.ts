import {SimpleText} from "../s/SimpleText";
import {TrackingParams} from "../t/TrackingParams.js";

export interface NotificationActionRenderer extends TrackingParams {
	responseText: SimpleText;
}
