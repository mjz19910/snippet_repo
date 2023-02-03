type DUA_SubscribeButton={
	subscribed: true;
	channelId: `UC${string}`;
};
type DA_AddChatItem={
	item: G_ChatItem;
	clientId?: string;
};
type DA_ReplayChatItem={
	actions: A_AddChatItem[];
	videoOffsetTimeMsec: `${number}`;
};
// cSpell:ignoreRegExp /r\d---sn-.+?"/
type D_VideoId=string;
type D_Probe_Domain=[
	"r1---sn-p5qlsny6",
	"r2---sn-hp57knds",
	"r4---sn-p5qs7nzr" 
];
type D_Youtube_Streaming_ProbeUrl=`https://${D_Probe_Domain[number]}.googlevideo.com/videogoodput?id=${string}&source=${string}&range=${string}&expire=${string}&ip=${string}&ms=${string}&mm=${string}&pl=${string}&nh=${string}&sparams=${string}&signature=${string}&key=${string}`;

type DD_Streaming={
	expiresInSeconds: `${number}`;
	adaptiveFormats: D_AdaptiveFormatItem[];
	formats: D_FormatItem[];
	probeUrl?: D_Youtube_Streaming_ProbeUrl;
};
type DE_MP_MenuStyle=T_EnumStr<"MULTI_PAGE_MENU_STYLE_TYPE",[
	"SWITCHER",
	"CREATION",
	"NOTIFICATIONS",
	"ACCOUNT"
][number]>;
type DMD_AdSlot={
	slotId: `${number}:${number}:${number}:${number}`;
	slotType: "SLOT_TYPE_IN_FEED";
	slotPhysicalPosition: 1;
}|{
	slotId: `${number}:${number}:${number}:${number}`;
	slotType: "SLOT_TYPE_IN_FEED";
	slotPhysicalPosition: 1;
	adSlotLoggingData: D_SerializedSlotAdServingDataEntry;
}|{
	slotId: `${number}:${number}:${number}:${number}`;
	slotType: "SLOT_TYPE_PAGE_TOP";
	slotPhysicalPosition: 0;
};
type DMD_Badge={
	style: "BADGE_STYLE_TYPE_SIMPLE";
	label: "New";
	trackingParams: string;
}|{
	icon: T_Icon<"CHECK_CIRCLE_THICK">;
	style: "BADGE_STYLE_TYPE_VERIFIED";
	tooltip: "Verified";
	trackingParams: string;
	accessibilityData: D_Label;
}|{
	icon: T_Icon<"LIVE">;
	style: "BADGE_STYLE_TYPE_LIVE_NOW";
	label: "LIVE";
	trackingParams: string;
}|{
	icon: T_Icon<"LIVE">;
	style: "BADGE_STYLE_TYPE_LIVE_NOW";
	label: "PREMIERE";
	trackingParams: string;
}|{
	style: "BADGE_STYLE_TYPE_COLLECTION";
	label: string;
	trackingParams: string;
}|{
	icon: T_Icon<"OFFICIAL_ARTIST_BADGE">;
	style: "BADGE_STYLE_TYPE_VERIFIED_ARTIST";
	tooltip: "Official Artist Channel";
	trackingParams: string;
	accessibilityData: TD_Label<"Official Artist Channel">;
}|{
	style: "BADGE_STYLE_TYPE_YPC";
	label: "Fundraiser";
	trackingParams: string;
};
type D_Playlist_MD={
	title: string;
	androidAppindexingLink: string;
	iosAppindexingLink: string;
};
type D_RichMetadata={
	style: "RICH_METADATA_RENDERER_STYLE_BOX_ART";
	thumbnail: D_Thumbnail;
	title: G_Text;
	subtitle: G_Text;
	callToAction: G_Text;
	callToActionIcon: T_Icon<"CHEVRON_RIGHT">;
	endpoint: GE_Browse;
	trackingParams: string;
}|{
	style: "RICH_METADATA_RENDERER_STYLE_TOPIC";
	thumbnail: D_Thumbnail;
	title: G_Text;
	callToAction: G_Text;
	callToActionIcon: T_Icon<"CHEVRON_RIGHT">;
	endpoint: GE_Browse;
	trackingParams: string;
};

type D_RichMetadataRow={
	contents: R_RichMetadata[];
	trackingParams: string;
};

type DMD_RowContainer={
	rows?: R_RichMetadataRow[];
	collapsedItemCount: number;
	trackingParams: string;
};
type DRC_Csi_SPs=RC_To_SPs<RC_CsiVarMap>|(RC_CsiServiceC|RC_CsiServiceCVer)[];
type DSS_Context={context: D_ContextTypeStr|null;};
type DT_MenuFlexibleItem={
	menuItem: R_MenuServiceItem;
	topLevelButton: R_Button;
};
type DUA_Description={description: G_Text;};
type D_RelatedChipCloud={content: R_ChipCloud;};
type D_LoggingDirectives_Gestures=T_Types<4>;
