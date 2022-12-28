import {YtPlayerApi} from "./YtPlayerApi";

export interface YtdPlayerElement extends HTMLElement {
	active_nav: boolean;
	player_: YtPlayerApi|null;
	playerResolver_: {
		promise: Promise<void>;
	};
	init_nav: boolean;
	is_watch_page_active: boolean;
	pause(): void;
	play(): void;
}
