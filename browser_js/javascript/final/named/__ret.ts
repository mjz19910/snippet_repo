import {__RetType} from "./__RetType";
import {undebugI} from "./undebugI";

declare global {

	interface Window {
		__m: {}|null;
		// __ret
		__ret: __RetType;
		// kongregate_yet-another-merge-game.js
		__cint?: ReturnType<typeof window.setTimeout>|number;
		citv?: ReturnType<typeof window.setInterval>|number;
		// makiki99 prestige-frame
		HTMLIFrameExt: typeof HTMLIFrameElement;
		// youtube.com_lazyPrepareCriticalPages
		debug?: debugI|undefined;
		undebug?: undebugI|undefined;
		// reddit_continueThread.js
		react_ii: string;
		root_new: never;
		inner_dom: never;
		refs: never[];
		s_refs?: SRefBase[][];
	}
}
