import {GlobalApiObject} from "./GlobalApiObject";

export {}

declare global {
	interface Window {
		g_api?: GlobalApiObject|undefined;
		ytPageType?: string
		playlist_arr?: string[]
		ytd_page_manager?: HTMLElement|null
		ytd_watch_flexy?: HTMLElement|null
		ytd_app?: HTMLElement|null
		yt_playlist_manager?: HTMLElement|null
		ytd_player?: HTMLElement|null
		DebugAPI: {};
		page_type_changes?: string[],
	}
	interface WeakRef<T extends object> {
		readonly [Symbol.toStringTag]: "WeakRef"

		/**
		 * Returns the WeakRef instance's target object, or undefined if the target object has been
		 * reclaimed.
		 */
		deref(): T|undefined
	}

	interface WeakRefConstructor {
		readonly prototype: WeakRef<any>

		/**
		 * Creates a WeakRef instance for the given target object.
		 * @param target The target object for the WeakRef instance.
		 */
		new <T extends object>(target: T): WeakRef<T>
	}

	var WeakRef: WeakRefConstructor
}
