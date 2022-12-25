import {SignalServiceEndpoints,PlaylistEditEndpointH,AddToPlaylistServiceEndpointH,FeedbackEndpointH,GetReportFormEndpointH} from "./__global";

export type ServiceEndpoint=
	SignalServiceEndpoints|
	PlaylistEditEndpointH|
	AddToPlaylistServiceEndpointH|
	FeedbackEndpointH|
	GetReportFormEndpointH;
