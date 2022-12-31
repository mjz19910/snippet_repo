import {SettingsOptionRenderer} from "../s/SettingsOptionRenderer.js";
import {ShelfRenderer} from "../s/ShelfRenderer.js";
import {ConnectedAppRenderer} from "./ConnectedAppRenderer";
import {PageIntroductionRenderer} from "./PageIntroductionRenderer";
import {PlaylistVideoListRenderer} from "./PlaylistVideoListRenderer";


export type ItemSectionContentItem=
	PlaylistVideoListRenderer|
	PageIntroductionRenderer|
	SettingsOptionRenderer|
	ConnectedAppRenderer|
	ShelfRenderer;
