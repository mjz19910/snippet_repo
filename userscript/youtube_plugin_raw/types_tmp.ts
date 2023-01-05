type FullChannelUrlFormat=`http://www.youtube.com/${`channel/UC${string}`|`user/${string}`}`;
type lua_strs=[
	...Split<"AUTO_CHAPTERS,HEATSEEKER,DESCRIPTION_CHAPTERS">
];