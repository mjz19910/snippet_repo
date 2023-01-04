type YtUrlFormat=
	"/"|
	`/watch?${YtWatchUrlParamsFormat}`|
	`/feed/${YtFeedSubSections}`|
	`/${SettingsEndpointPages}`|
	"/channel_switcher";

type YtWatchUrlParamsFormat=`v=${string}`|`v=${string}&list=${YtInfinitePlaylistFormat}`|`v=${string}&pp=${string}`;

type GoogleLoginExternalUrl={
  url: "https://accounts.google.com/AddSession?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den-GB%26next%3D%252F&hl=en-GB&passive=false&service=youtube&uilel=0"
}["url"];

type UrlParts=ParseUrlSearchParams<UrlParse<GoogleLoginExternalUrl>['search']>;
type G1=UrlParts['continue'];

type Replace<T extends string,S extends string,R extends string>=
T extends `${S}${infer N}`?`${R}${Replace<N,S,R>}`:
T extends `${infer B}${S}${infer N}`?`${B}${R}${Replace<N,S,R>}`:
T;

type V1=Replace<G1,"%3A",":">;
type V2=Replace<V1,"%2F","/">;
type V3=Replace<V2,"%3F","?">;
type V4=Replace<V3,"%3D","=">;
type V5=Replace<V4,"%26","&">;
type V6=Replace<V5,"%25","%">;