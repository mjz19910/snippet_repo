type D_PlaylistInfoCardContent={
	playlistThumbnail: D_Thumbnail;
	playlistVideoCount: G_Text;
	playlistTitle: G_Text;
	channelName: G_Text;
	videoCountText: G_Text;
	action: E_Watch;
	trackingParams: string;
};

type R_PlaylistInfoCardContent={playlistInfoCardContentRenderer: D_PlaylistInfoCardContent;};

type D_Card={
	teaser: R_SimpleCardTeaser;
	content?: R_CollaboratorInfoCardContent|R_PlaylistInfoCardContent;
	cueRanges: D_CueRangeItem[];
	icon?: R_InfoCardIcon;
	trackingParams: string;
	cardId?: `${17580380632106033097n|bigint}`;
	feature?: "cards";
};
