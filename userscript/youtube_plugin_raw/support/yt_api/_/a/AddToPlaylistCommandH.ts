import {AddToPlaylistCommand} from "./AddToPlaylistCommand";
import {ClickTrackingParams} from "../../_abc/c/ClickTrackingParams";

export interface AddToPlaylistCommandH extends ClickTrackingParams {
	addToPlaylistCommand: AddToPlaylistCommand;
}

