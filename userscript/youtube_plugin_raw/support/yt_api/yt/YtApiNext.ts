import {AllResponseReceivedEndpoints} from "../_/a/AllResponseReceivedEndpoints";
import {ResponseContext} from "../_/g/GeneralContext";

export type YtApiNext={
	onResponseReceivedEndpoints: AllResponseReceivedEndpoints[];
	responseContext: ResponseContext;
	trackingParams: string;
};
