import {GetReportFormEndpointH} from "./GetReportFormEndpointH";
import {FeedbackEndpointH} from "../f/FeedbackEndpointH";
import {AddToPlaylistServiceEndpointH} from "./AddToPlaylistServiceEndpointH";
import {PlaylistEditEndpoint} from "../p/PlaylistEditEndpoint";
import {SignalServiceEndpoints} from "./SignalServiceEndpoints";

export type YtEndpoint=
	SignalServiceEndpoints|
	PlaylistEditEndpoint|
	AddToPlaylistServiceEndpointH|
	FeedbackEndpointH|
	GetReportFormEndpointH;
