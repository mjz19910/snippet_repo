import {SettingsOptionRenderer} from "../support/yt_api/_/s/SettingsOptionRenderer.js";
import {ShelfRenderer} from "../support/yt_api/_/s/ShelfRenderer.js";
import {ConnectedAppRenderer} from "../support/yt_api/_/c/ConnectedAppRenderer";
import {PageIntroductionRenderer} from "../support/yt_api/_/p/PageIntroductionRenderer";
import {PlaylistVideoListRenderer} from "./PlaylistVideoListRenderer";


export type ItemSectionContentItem=
	PlaylistVideoListRenderer|
	PageIntroductionRenderer|
	SettingsOptionRenderer|
	ConnectedAppRenderer|
	ShelfRenderer;
