import {AddToPlaylistCommand} from "./AddToPlaylistCommand";
import {TrackClick} from "./TrackClick";

export interface AddToPlaylistCommandH extends TrackClick {
	addToPlaylistCommand: AddToPlaylistCommand;
}

