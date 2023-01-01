import {SignalServiceEndpointData} from "../../../../yt_json_types/SignalServiceEndpoint";
import {ServiceEndpointGeneral} from "./ServiceEndpointGeneral";


export interface SignalServiceEndpoints extends ServiceEndpointGeneral {
	signalServiceEndpoint: SignalServiceEndpointData;
}
