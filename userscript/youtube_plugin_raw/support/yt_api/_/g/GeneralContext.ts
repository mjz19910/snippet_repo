import {AllServiceTrackingParams} from "../a/AllServiceTrackingParams.js";
import {MainAppWebResponseContextData} from "./MainAppWebResponseContextData";
import {WebResponseContextExtensionData} from "./WebResponseContextExtensionData";

export type ResponseContext={
	mainAppWebResponseContext: MainAppWebResponseContextData;
	serviceTrackingParams: AllServiceTrackingParams[];
	webResponseContextExtensionData: WebResponseContextExtensionData;
	maxAgeSeconds?: number;
};
