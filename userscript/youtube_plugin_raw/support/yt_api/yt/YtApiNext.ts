import {AllResponseReceivedEndpoints} from "../_/a/AllResponseReceivedEndpoints";
import {GeneralContext} from "../_/GeneralContext";

export type YtApiNext={
	onResponseReceivedEndpoints: AllResponseReceivedEndpoints[];
	responseContext: GeneralContext;
	trackingParams: string;
};
