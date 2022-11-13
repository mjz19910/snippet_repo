import {YtPlayerApi} from "./YtPlayerApi";

export class YtdPlayerElement extends HTMLElement {
	active_nav=false;
	player_: YtPlayerApi|null=null;
	playerResolver_={
		promise: Promise.resolve()
	};
	init_nav=false;
	is_watch_page_active=false;
	pause() {}
	play() {}
}
