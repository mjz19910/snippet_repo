import {AddToPlaylistCommand} from "./AddToPlaylistCommand";
import {ClickTrackingParams} from "../c/ClickTrackingParams";

export interface AddToPlaylistCommandH extends ClickTrackingParams {
	addToPlaylistCommand: AddToPlaylistCommand;
}

