import {AddToPlaylistCommand} from "./AddToPlaylistCommand";
import {CT} from "./ClickTrackingParams";

export interface AddToPlaylistCommandH extends CT {
	addToPlaylistCommand: AddToPlaylistCommand;
}

