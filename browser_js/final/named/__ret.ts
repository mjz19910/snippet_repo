import {__RetType} from "./__RetType";
import {undebugI} from "./undebugI";

declare global {

	interface Window {
		__m: {_bad: true;}|null;
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
		root_new: {_bad: true;};
		inner_dom: {_bad: true;};
		refs: {_bad: true;}[];
		s_refs?: SRefBase[][];
	}
}
