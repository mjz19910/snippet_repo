namespace NS_DD_CompactVideoTest {
	type SM1="videoId,thumbnail,title,longBylineText,publishedTimeText,viewCountText,lengthText,navigationEndpoint,shortBylineText";
	type CT="channelThumbnail";
	type ED1="trackingParams,shortViewCountText,menu,thumbnailOverlays,accessibility,richThumbnail";
	type S1=`${SM1},${CT},ownerBadges,${ED1}`;
	type U1=T_Split<S1>[number];
	export type T1=D_CompactVideo[U1];
	type BaseKeysStr=`${SM1},${CT},${ED1}`;
	type U2=T_Split<BaseKeysStr>[number];
	export type T2=D_CompactVideo[U2];
	type S3=`${SM1},badges,${CT},${ED1}`;
	export type T3=D_CompactVideo[T_Split<S3>[number]];
}
