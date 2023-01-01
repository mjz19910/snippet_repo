import {ServiceEndpointAction} from "./ServiceEndpointAction";

export type SignalServiceEndpointData={
	signal: "CLIENT_SIGNAL";
	actions: ServiceEndpointAction[];
};
