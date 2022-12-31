import {Type_ytcfg} from "../yt_api/_/t/Type_ytcfg.js";

export type GlobalAttach_ytcfg=1;

declare global {
	interface Window {
		ytcfg?: Type_ytcfg;
	}
}