import {PageResponseBrowse} from "./support/yt_api/_abc/p/PageResponseBrowse.js";
import {PageResponseWatch} from "./youtube_plugin.user.js";

export type InitialDataType=PageResponseWatch<string>|PageResponseBrowse;

