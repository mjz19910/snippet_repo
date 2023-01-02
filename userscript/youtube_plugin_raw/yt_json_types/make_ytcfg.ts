import {Type_ytcfg} from "./Type_ytcfg.js";

export type GlobalAttach_ytcfg=1;

declare global {
	interface Window {
		ytcfg?: Type_ytcfg;
	}
}