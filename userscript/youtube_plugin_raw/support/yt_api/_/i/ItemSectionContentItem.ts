import {SettingsOptionRenderer} from "../s/SettingsOptionRenderer.js";
import {ShelfRenderer} from "../s/ShelfRenderer.js";
import {ConnectedAppRenderer} from "../c/ConnectedAppRenderer";
import {PageIntroductionRenderer} from "../p/PageIntroductionRenderer";
import {PlaylistVideoListRenderer} from "../p/PlaylistVideoListRenderer";


export type ItemSectionContentItem=
	PlaylistVideoListRenderer|
	PageIntroductionRenderer|
	SettingsOptionRenderer|
	ConnectedAppRenderer|
	ShelfRenderer;
