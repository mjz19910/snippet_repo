import {AllResponseReceivedEndpoints} from "../_/a/AllResponseReceivedEndpoints";
import {GeneralContext} from "../../yt_api/_abc/g/GeneralContext";

export type YtApiNext={
	onResponseReceivedEndpoints: AllResponseReceivedEndpoints[];
	responseContext: GeneralContext;
	trackingParams: string;
};
