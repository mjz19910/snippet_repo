import {YtPlayerApi} from "./YtPlayerApi";
import {YtPlayerApiResolver} from "./YtPlayerApiResolver";

export class YtdPlayerElement extends HTMLElement {
	active_nav=false;
	player_: YtPlayerApi|null=null;
	playerResolver_=new YtPlayerApiResolver;
	init_nav=false;
	is_watch_page_active=false;
	pause() {}
	play() {}
}
