export {};
declare global {
	interface Window {
		MuiList_root: HTMLUListElement;
	}
	interface EventTarget {
		__arg_list_for_add_event_listeners: any[];
	}
	var __REACT_DEVTOOLS_GLOBAL_HOOK__: {
		hook_ref: {
			currentDispatcherRef: {
				current: {}|null;
			};
		};
	};
}