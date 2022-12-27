import {GlobalAttachWindow} from "./support/make/make_Window.js";
import {GlobalAttach_yt} from "./support/make/make_yt.js";
import {GlobalAttach_ytcfg} from "./support/make/make_ytcfg.js";
import {__ia_excludeKeysS} from "./support/make/__ia_excludeKeysS";


export type Attachments=[
	GlobalAttach_yt,
	GlobalAttachWindow,
	GlobalAttach_ytcfg,
];

declare global {
	interface Window {
		Polymer: {
			Class?: <T>(x: {})=>T;
		};
	}
	var require: ()=>any;
}