import {AllServiceTrackingParams} from "../a/AllServiceTrackingParams.js";
import {MainAppWebResponseContextData} from "./MainAppWebResponseContextData";
import {WebResponseContextExtensionData} from "./WebResponseContextExtensionData";

export type GeneralContext={
	mainAppWebResponseContext: MainAppWebResponseContextData;
	serviceTrackingParams: AllServiceTrackingParams[];
	webResponseContextExtensionData: WebResponseContextExtensionData;
	maxAgeSeconds?: number;
};
