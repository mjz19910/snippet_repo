type PlaylistContent={
	title: string;
	contents: {}[];
	currentIndex: number;
	playlistId: PlaylistId;
	ownerName: {};
	isInfinite: boolean;
	playlistShareUrl: `http://www.youtube.com/watch?v=${string}&list=${string}`;
	shortBylineText: TextT;
	longBylineText: TextT;
};
