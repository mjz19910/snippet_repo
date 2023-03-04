type G_RawVideoInfo={
	type: "raw";
	tag: "video";
	type_parts: ["raw","video"];
	raw_id: D_VideoIdStr;
};
type G_RawBrowseId={
	type: "raw";
	tag: "browse_id";
	type_parts: ["raw","browse_id"];
	raw_id: D_BrowseIdStr;
}|{
	type: "raw";
	tag: "browse_id";
	type_parts: ["raw","browse_id","VL"];
	raw_id: GU_VE5754_BrowseId;
};
type G_RawChannelId={
	type: "raw";
	tag: "channel_id";
	type_parts: ["raw","channel_id"];
	raw_id: D_ChannelIdStr;
};
type G_RawVideoShortInfo={
	type: "raw";
	tag: "video";
	type_parts: ["raw","video","short"];
	raw_id: D_VideoIdStr;
};
type G_RawVideoNormalInfo={
	type: "raw";
	tag: "video";
	type_parts: ["raw","video","normal"];
	raw_id: D_VideoIdStr;
};
type G_RawVideoReferralInfo={
	type: "raw";
	tag: "video_referral";
	type_parts: ["raw","video_referral"];
	raw_id: D_VideoIdStr;
};
type G_RawPlaylistInfoBase={
	type: "raw";
	tag: "playlist_id";
	type_parts: ["raw","playlist_id"];
	raw_id: GU_PlaylistId;
};
type G_RawInfinitePlaylistInfo={
	type: "raw";
	tag: "playlist_id";
	type_parts: ["raw","playlist_id","RD"];
	raw_id: D_InfinitePlaylistIdStr;
};
type G_RawPlaylistUrlInfo=
	|G_RawPlaylistInfoBase
	|G_RawInfinitePlaylistInfo
	|{
		type: "raw";
		tag: "playlist_id";
		type_parts: ["raw","playlist_id","PL"];
		raw_id: G_PlaylistUrlInfo_PL["raw_id"];
	}
	|{
		type: "raw";
		tag: "playlist_id";
		type_parts: ["raw","playlist_id","UU"];
		raw_id: G_PlaylistUrlInfo_UU["raw_id"];
	}
	;
;
type G_RawGuideEntryId={
	type: "raw";
	tag: "guide_entry_id";
	type_parts: ["raw","guide_entry_id"];
	raw_id: D_GuideEntryData["guideEntryId"];
};
type G_RawUrlInfo=
	|G_RawBrowseId
	|G_RawChannelId
	|G_RawGuideEntryId
	|G_RawPlaylistUrlInfo
	|G_RawVideoInfo
	|G_RawVideoNormalInfo
	|G_RawVideoReferralInfo
	|G_RawVideoShortInfo
	;
;