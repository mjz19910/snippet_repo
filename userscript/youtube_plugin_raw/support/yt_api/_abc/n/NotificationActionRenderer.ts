import {SimpleText} from "../s/SimpleText";
import {TrackingParamsDef} from "../t/TrackingParams.js";

export interface NotificationActionRenderer extends TrackingParamsDef {
	responseText: SimpleText;
}
