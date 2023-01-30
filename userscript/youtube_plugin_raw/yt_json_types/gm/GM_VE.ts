type GM_VE3611_WC={
	url:
	|`/channel/UC${string}`
	|`/@${string}`
	|"/gaming"
	;
	webPageType: "WEB_PAGE_TYPE_CHANNEL";
	rootVe: 3611; apiUrl: "/youtubei/v1/browse";
};
type GM_VE3832_Watch_WC={
	url: `/watch?${string}`;
	webPageType: "WEB_PAGE_TYPE_WATCH";
	rootVe: 3832;
};
type GM_VE3854_WC={
	url: "/";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 3854; apiUrl: "/youtubei/v1/browse";
};
type GM_VE4724_WC={
	url: `/results?search_query=${string}`;
	webPageType: "WEB_PAGE_TYPE_SEARCH";
	rootVe: 4724;
};
type GM_VE5754_WC={
	url: `/playlist?list=${"WL"|"LL"|`PL${string}`}`;
	webPageType: "WEB_PAGE_TYPE_PLAYLIST";
	rootVe: 5754; apiUrl: "/youtubei/v1/browse";
};
type GM_VE6827_WC={
	url?: D_VE6827_PageUrl;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 6827; apiUrl: "/youtubei/v1/browse";
};
type GM_VE11487_WC={
	url: "/premium";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 11487; apiUrl: "/youtubei/v1/browse";
};
type GM_VE23462_WC={
	url: "/account"|"/account_notifications";
	webPageType: "WEB_PAGE_TYPE_SETTINGS";
	rootVe: 23462; apiUrl: "/youtubei/v1/browse";
};
type GM_VE37414_WC={
	url: "/shorts/";
	webPageType: "WEB_PAGE_TYPE_SHORTS";
	rootVe: 37414;
};
type GM_VE42352_WC={
	url: "/feed/downloads";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 42352; apiUrl: "/youtubei/v1/browse";
};
type GM_VE83769_WC={
	url: GU_VE83769_UrlStr|GU_VE83769_ExternalUrlStr;
	webPageType: "WEB_PAGE_TYPE_UNKNOWN";
	rootVe: 83769;
};
type GM_VE96368_WC_browse={
	url: "/feed/subscriptions";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 96368; apiUrl: "/youtubei/v1/browse";
};