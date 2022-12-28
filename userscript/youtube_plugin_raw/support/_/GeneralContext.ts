import {AllServiceTrackingParams} from "./a/AllServiceTrackingParams.js";

export type GeneralContext={
	mainAppWebResponseContext: {
		datasyncId: `${number}||${number}`;
		loggedOut: boolean;
	};
	serviceTrackingParams: AllServiceTrackingParams;
	webResponseContextExtensionData: {
		hasDecorated: false;
	};
};
