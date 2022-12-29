import {AllResponseReceivedEndpoints} from "../_/a/AllResponseReceivedEndpoints";
import {GeneralContext} from "../_/g/GeneralContext";

export type YtApiNext={
	onResponseReceivedEndpoints: AllResponseReceivedEndpoints[];
	responseContext: GeneralContext;
	trackingParams: string;
};
