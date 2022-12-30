import {ConnectedAppRenderer} from "./ConnectedAppRenderer";
import {PageIntroductionRenderer} from "./PageIntroductionRenderer";
import {PlaylistVideoListRenderer} from "./PlaylistVideoListRenderer";
import {SettingsOptionRenderer} from "./SettingsOptionRenderer";
import {ShelfRenderer} from "./ShelfRenderer";

export type ItemSectionContentItem=
	PlaylistVideoListRenderer|
	PageIntroductionRenderer|
	SettingsOptionRenderer|
	ConnectedAppRenderer|
	ShelfRenderer;
