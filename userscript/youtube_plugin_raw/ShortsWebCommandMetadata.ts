
export type ShortsWebCommandMetadata<T>={
	url: T extends string? `/shorts/${T}`:never;
	webPageType: "WEB_PAGE_TYPE_SHORTS";
	rootVe: 37414;
};
