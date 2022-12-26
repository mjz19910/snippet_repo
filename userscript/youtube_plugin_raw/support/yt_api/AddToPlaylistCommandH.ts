import {AddToPlaylistCommand} from "./AddToPlaylistCommand";

interface TrackClick {
	clickTrackingParams: string;
}

export interface AddToPlaylistCommandH extends TrackClick {
	addToPlaylistCommand: AddToPlaylistCommand;
}

