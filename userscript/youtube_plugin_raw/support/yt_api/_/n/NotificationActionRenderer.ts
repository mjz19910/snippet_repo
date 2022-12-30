import {SimpleText} from "../s/SimpleText";

export interface NotificationActionRenderer {
	responseText: SimpleText;
	trackingParams: string;
}
