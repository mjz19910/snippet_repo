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

type R_SimpleCardContent={
	simpleCardContentRenderer: {
		image: D_Thumbnail;
		title: G_Text;
		actionButton: R_SimpleCardButton;
		trackingParams: string;
		displayDomain: G_Text;
		showLinkIcon: true;
		callToAction: G_Text;
		command: E_VE83769_Url;
	};
};
type D_Card_Content=R_SimpleCardContent|R_CollaboratorInfoCardContent|R_PlaylistInfoCardContent;
type D_Card={
	teaser: R_SimpleCardTeaser;
	content?: D_Card_Content;
	cueRanges: D_CueRangeItem[];
	icon?: R_InfoCardIcon;
	trackingParams: string;
	cardId?: `${bigint}`;
	feature?: "cards";
};
