import {AllServiceTrackingParams} from "./AllServiceTrackingParams";


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
