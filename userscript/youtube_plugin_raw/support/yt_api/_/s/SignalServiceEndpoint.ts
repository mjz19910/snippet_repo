import {ServiceEndpointAction} from "./ServiceEndpointAction";

export type SignalServiceEndpoint={
	signal: "CLIENT_SIGNAL";
	actions: ServiceEndpointAction[];
};
