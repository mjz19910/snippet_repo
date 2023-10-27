// deno-lint-ignore-file
export type YtPlayerApi={
	getVideoData(): {
		video_id: string;
		eventId: undefined;
		title: any;
		author: any;
	};
	getPlayerState(): {};
};