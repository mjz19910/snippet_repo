namespace test {
	type SM1="videoId,thumbnail,title,longBylineText,publishedTimeText,viewCountText,lengthText,navigationEndpoint,shortBylineText";
	type CT="channelThumbnail";
	type ED1="trackingParams,shortViewCountText,menu,thumbnailOverlays,accessibility,richThumbnail";
	type S1=`${SM1},${CT},ownerBadges,${ED1}`;
	type U1=Split<S1>[number];
	export type T1=CompactVideoData[U1];
	type BaseKeysStr=`${SM1},${CT},${ED1}`;
	type U2=Split<BaseKeysStr>[number];
	export type T2=CompactVideoData[U2];
	type S3=`${SM1},badges,${CT},${ED1}`;
	export type T3=CompactVideoData[Split<S3>[number]];
}
