type P_NotificationMenu_Popup=TR_MultiPageMenu<D_NotificationMenuPopupMenuItem>;
type D_CaseGen_CF=[
	"D_YtStudio_Url",
][number];

type D_SubscriptionNotificationToggleButton={
	states: [
		{
			stateId: 2;
			nextStateId: 2;
			state: R_Button;
		},
		{
			stateId: 3;
			nextStateId: 3;
			state: R_Button;
		},
		{
			stateId: 0;
			nextStateId: 0;
			state: R_Button;
		}
	];
	currentStateId: 2;
	trackingParams: string;
	command: C_Executor;
	targetId: "notification-bell";
	secondaryIcon: T_Icon<"EXPAND_MORE">;
};
type D_RadioShareUrl=
	|`https://www.youtube.com/watch?v=${string}&playnext=1&list=RDCMUC${string}`
	|`https://www.youtube.com/playlist?list=PL${string}`
	|`https://www.youtube.com/watch?v=${string}&playnext=1&list=PL${string}`
	;
;

type D_CompactRadio={
	playlistId: `RD${string}`|`RDGM${string}`;
	thumbnail: R_Thumbnail&R_SampledThumbnailColor;
	title: G_Text;
	navigationEndpoint: E_Watch;
	videoCountText: G_Text;
	secondaryNavigationEndpoint: E_Watch;
	longBylineText: G_Text;
	trackingParams: string;
	thumbnailText: G_Text;
	videoCountShortText: G_Text;
	shareUrl: D_RadioShareUrl;
	menu: R_Menu;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};
