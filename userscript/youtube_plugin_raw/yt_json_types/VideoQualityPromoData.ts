import {EndpointTemplate} from "./EndpointTemplate";
import {TextT} from "./TextT.js";
export type VideoQualityPromoData={
	triggerCriteria: TriggerCriteria;
	text: TextT;
	endpoint: EndpointTemplate<UrlEndpointPlugin>;
	trackingParams: string;
	snackbar: NotificationActionRenderer;
};