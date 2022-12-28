import {AllResponseReceivedEndpoints} from "./a/AllResponseReceivedEndpoints";
import {GeneralContext} from "./GeneralContext";

export type YtApiNext={
	onResponseReceivedEndpoints: AllResponseReceivedEndpoints[];
	responseContext: GeneralContext;
	trackingParams: string;
};
