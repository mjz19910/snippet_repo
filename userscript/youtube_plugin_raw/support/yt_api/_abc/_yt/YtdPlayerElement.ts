export interface YtdPlayerElement extends HTMLElement {
	active_nav: boolean;
	player_: {getVideoData(): {video_id: string; eventId: undefined; title: any; author: any;}; getPlayerState(): {};}|null;
	playerResolver_: {
		promise: Promise<void>;
	};
	init_nav: boolean;
	is_watch_page_active: boolean;
	pause(): void;
	play(): void;
}
