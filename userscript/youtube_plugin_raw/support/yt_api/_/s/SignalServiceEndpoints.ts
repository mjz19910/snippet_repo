import {SignalServiceEndpointData} from "./SignalServiceEndpoint";
import {ServiceEndpointGeneral} from "./ServiceEndpointGeneral";


export interface SignalServiceEndpoints extends ServiceEndpointGeneral {
	signalServiceEndpoint: SignalServiceEndpointData;
}
