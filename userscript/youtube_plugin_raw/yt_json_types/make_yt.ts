import {Type_yt} from "./Type_yt.js";

export type GlobalAttach_yt=1;

declare global {
	interface Window {
		yt?: Type_yt;
	}
}
