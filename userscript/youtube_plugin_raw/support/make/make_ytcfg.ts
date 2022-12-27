import {Type_ytcfg} from "./yt_api/_abc/t/Type_ytcfg.js";

export type GlobalAttach_ytcfg=1;

declare global {
	interface Window {
		ytcfg?: Type_ytcfg;
	}
}
