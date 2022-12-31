import {Type_yt} from "../yt_api/_/t/Type_yt.js";

export type GlobalAttach_yt=1;

declare global {
	interface Window {
		yt?: Type_yt;
	}
}
