import {UrlWrappedValue} from "./UrlWrappedValue";
import {GeneralContext} from "./GeneralContext";


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
