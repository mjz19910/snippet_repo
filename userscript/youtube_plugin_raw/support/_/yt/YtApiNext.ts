import {AllResponseReceivedEndpoints} from "../../yt_api/_abc/a/AllResponseReceivedEndpoints";
import {GeneralContext} from "../../yt_api/_abc/g/GeneralContext";

export type YtApiNext={
	onResponseReceivedEndpoints: AllResponseReceivedEndpoints[];
	responseContext: GeneralContext;
	trackingParams: string;
};
