import {UrlWrappedValue} from "../UrlWrappedValue.js";
import {GeneralContext} from "../GeneralContext.js";

export type AttGetV={
	responseContext: GeneralContext;
	challenge: string;
	bgChallenge: {
		interpreterUrl: UrlWrappedValue<string>;
		interpreterHash: string;
		program: string;
		globalName: "trayride";
	};
};
