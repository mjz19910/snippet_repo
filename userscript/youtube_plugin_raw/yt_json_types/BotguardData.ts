import {UrlWrappedValueT} from "./UrlWrappedValueT.js";
export type BotguardData={
	program: string;
	interpreterSafeUrl: UrlWrappedValueT<`//www.google.com/js/th/${string}.js`>;
	serverEnvironment: 1;
};