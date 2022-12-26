import {AddToPlaylistCommand} from "./AddToPlaylistCommand";
import {ClickTrackingParams} from "./ClickTrackingParams";

export interface AddToPlaylistCommandH extends ClickTrackingParams {
	addToPlaylistCommand: AddToPlaylistCommand;
}

