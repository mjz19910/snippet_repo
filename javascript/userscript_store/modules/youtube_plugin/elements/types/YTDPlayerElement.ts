export class YTDPlayerElement extends HTMLElement {
	active_nav=false;
	player_: {getVideoData(): {video_id: string; eventId: undefined; title: any; author: any}; getPlayerState(): {}}|null=null;
	playerResolver_={
		promise: Promise.resolve()
	};
	init_nav=false;
	is_watch_page_active=false;
	pause() {}
	play() {}
}
