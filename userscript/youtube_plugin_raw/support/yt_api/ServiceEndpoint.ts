import {GetReportFormEndpointH} from "./GetReportFormEndpointH";
import {FeedbackEndpointH} from "./FeedbackEndpointH";
import {AddToPlaylistServiceEndpointH} from "./AddToPlaylistServiceEndpointH";
import {PlaylistEditEndpointH} from "./PlaylistEditEndpointH";
import {SignalServiceEndpoints} from "./SignalServiceEndpoints";

export type ServiceEndpoint=
	SignalServiceEndpoints|
	PlaylistEditEndpointH|
	AddToPlaylistServiceEndpointH|
	FeedbackEndpointH|
	GetReportFormEndpointH;
