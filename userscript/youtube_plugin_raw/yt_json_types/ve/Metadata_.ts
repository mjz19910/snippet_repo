type TMC_VE<T extends VEMap[keyof VEMap]['CommandMetadata']>=T;
type VEMap={
	3832: {CommandMetadata: M_VE3832;};
	3611: {CommandMetadata: M_VE3611;};
	3854: {CommandMetadata: M_VE3854;};
	4724: {CommandMetadata: M_VE4724;};
	5754: {CommandMetadata: M_VE5754};
	6827: {CommandMetadata: M_VE6827;};
	11487: {CommandMetadata: M_VE11487;};
	23462: {CommandMetadata: M_VE23462;};
	37414: {CommandMetadata: M_VE37414;};
	83769: {CommandMetadata: M_VE83769;};
	96368: {CommandMetadata: M_VE96368;};
};
type GM_VE3611={
	url: `/@${string}`;
	webPageType: "WEB_PAGE_TYPE_CHANNEL";
	rootVe: 3611;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE3854={
	url: "/";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 3854;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE6827={
	url?: D_VE6827_PageUrl;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 6827;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE11487={
	url: "/premium";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 11487;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE96368={
	url: "/feed/subscriptions";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 96368;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE37414={
	url: "/shorts/";
	webPageType: "WEB_PAGE_TYPE_SHORTS";
	rootVe: 37414;
};
type M_VE3611={webCommandMetadata: GM_VE3611_WC;};
type M_VE3832={webCommandMetadata: GM_VE3832_Watch_WC;};
type M_VE3854={webCommandMetadata: GM_VE3854;};
type M_VE4724={webCommandMetadata: GM_VE4724_WC;};
type M_VE5754={webCommandMetadata: GM_VE5754_WC;};
type M_VE6827={webCommandMetadata: GM_VE6827;};
type M_VE11487={webCommandMetadata: GM_VE11487;};
type M_VE23462={webCommandMetadata: GM_VE23462_WC;};
type M_VE37414={webCommandMetadata: GM_VE37414;};
type M_VE83769={webCommandMetadata: GM_VE83769_WC;};
type M_VE96368={webCommandMetadata: GM_VE96368;};
